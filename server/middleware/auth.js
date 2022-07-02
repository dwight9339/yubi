import { Shopify } from "@shopify/shopify-api";
import {
  getUser,
  putNewUser,
  reactivateUser,
  defaultUserSettings,
} from "../helpers/userDBHelper.js";

import topLevelAuthRedirect from "../helpers/top-level-auth-redirect.js";

export default function applyAuthMiddleware(app) {
  app.get("/auth", async (req, res) => {
    if (!req.signedCookies[app.get("top-level-oauth-cookie")]) {
      return res.redirect(
        `/auth/toplevel?${new URLSearchParams(req.query).toString()}`
      );
    }

    const redirectUrl = await Shopify.Auth.beginAuth(
      req,
      res,
      req.query.shop,
      "/auth/callback",
      Boolean(req.query.secondRound)
    );

    res.redirect(redirectUrl);
  });

  app.get("/auth/toplevel", (req, res) => {
    res.cookie(app.get("top-level-oauth-cookie"), "1", {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    });

    res.set("Content-Type", "text/html");

    res.send(
      topLevelAuthRedirect({
        apiKey: Shopify.Context.API_KEY,
        hostName: Shopify.Context.HOST_NAME,
        host: req.query.host,
        query: req.query,
      })
    );
  });

  app.get("/auth/callback", async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );

      if (!session.isOnline) {
        // Do second round of auth to get online token
        res.redirect(`/auth/?shop=${session.shop}&secondRound=true`);
      } else {
        const host = req.query.host;
        const offlineSesh = await Shopify.Utils.loadOfflineSession(
          session.shop
        );

        // Register webhooks
        const response = await Shopify.Webhooks.Registry.registerAll({
          accessToken: offlineSesh.accessToken,
          shop: session.shop,
        });

        Object.keys(response).forEach((key) => {
          if (!response[key].success) {
            console.error(
              `shop: ${session.shop} - Auth callback - Unable to register webhook for topic ${key}`
            );
          }
        });

        // Update user document from DB
        const user = await getUser(session.shop);
        const userSettings = user?.settings || defaultUserSettings;
        const redirectParams = new URLSearchParams({
          shop: session.shop,
          host,
        });

        if (!user) {
          const client = new Shopify.Clients.Graphql(
            session.shop,
            session.accessToken
          );
          const createBillingResult = await client.query({
            data: `
              mutation {
                appPurchaseOneTimeCreate(
                  name: "Unique Variants Manager One-Time Installation Fee",
                  price: {amount: 14.99, currencyCode: USD},
                  returnUrl: "${
                    process.env.HOST
                  }/payment-success?${redirectParams.toString()}",
                  test: ${
                    process.env.NODE_ENV === "development" ||
                    process.env.PAYMENT_EXEMPTION_LIST.includes(session.shop)
                  }
                ) {
                  userErrors {
                    field
                    message
                  }
                  confirmationUrl
                }
              }
            `,
          });
          console.log(
            `createBillingResult: ${JSON.stringify(createBillingResult)}`
          );
          const {
            body: {
              data: { appPurchaseOneTimeCreate },
            },
          } = createBillingResult;
          const { userErrors, confirmationUrl } = appPurchaseOneTimeCreate;

          if (userErrors.length) {
            throw `${userErrors.map((error) => error.message)}`;
          }
          res.redirect(confirmationUrl);
        } else {
          app.set(
            "active-shopify-shops",
            Object.assign(app.get("active-shopify-shops"), {
              [session.shop]: userSettings,
            })
          );

          res.redirect(`/?${redirectParams.toString()}`);
        }
      }
    } catch (e) {
      switch (true) {
        case e instanceof Shopify.Errors.InvalidOAuthError:
          res.status(400);
          res.send(e.message);
          break;
        case e instanceof Shopify.Errors.CookieNotFound:
        case e instanceof Shopify.Errors.SessionNotFound:
          // This is likely because the OAuth session cookie expired before the merchant approved the request
          res.redirect(`/auth?shop=${req.query.shop}`);
          break;
        default:
          res.status(500);
          res.send(e.message);
          break;
      }
    }
  });

  app.get("/payment-success", async (req, res) => {
    try {
      const { shop, host } = req.query;
      const redirectParams = new URLSearchParams({
        shop,
        host,
        newUser: true,
      });

      await putNewUser(shop);

      app.set(
        "active-shopify-shops",
        Object.assign(app.get("active-shopify-shops"), {
          [shop]: defaultUserSettings,
        })
      );

      res.redirect(`/?${redirectParams.toString()}`);
    } catch (err) {
      console.error(`payment success route error - ${err}`);
    }
  });
}
