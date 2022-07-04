import { Shopify } from "@shopify/shopify-api";
import { createHmac } from "crypto";

const verifyWebhookRequest = (req, res, next) => {
  try {
    const generatedHash = createHmac("SHA256", process.env.SHOPIFY_API_SECRET)
      .update(JSON.stringify(req.body), "utf8")
      .digest("base64");
    S;
    const hmac = req.get("X-Shopify-Hmac-Sha256");
    const verifiedRequest = Shopify.Utils.safeCompare(generatedHash, hmac);

    if (!verifiedRequest) {
      console.log("webhook request hmac mismatch");
      return res
        .status(401)
        .json({ succeeded: false, message: "Not Authorized" })
        .send();
    }

    next();
  } catch (err) {
    console.error(`webhook verification error - ${err}`);
    return res
      .status(401)
      .json({ succeeded: false, message: "Not Authorized" })
      .send();
  }
};

export default function mandatoryWebhookHandlers(app) {
  app.post("/customers/data", verifyWebhookRequest, async (req, res) => {
    res.status(200).send();
  });

  app.post("/customers/redact", verifyWebhookRequest, async (req, res) => {
    res.status(200).send();
  });

  app.post("/shop/redact", verifyWebhookRequest, async (req, res) => {
    res.status(200).send();
  });
}
