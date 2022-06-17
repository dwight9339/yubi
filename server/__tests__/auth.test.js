/**
 * @vitest-environment node
 */

import request from "supertest";
import { Shopify } from "@shopify/shopify-api";``
import { describe, expect, test, vi } from "vitest";
import axios from "axios";

import { serve } from "./serve.js";
import { deactivateUser, putNewUser, defaultUserSettings } from "../helpers/userDBHelper.js";

describe("Callback redirects to correct home page", async () => {
  const { 
    USER_DB_API_ENDPOINT: endpoint,
    USER_DB_API_KEY: apiKey,
    USER_DB_NAME: database,
    USER_DB_COLLECTION_NAME: collection,
    USER_DB_DATA_SOURCE: dataSource
  } = process.env;
  const testShopName = "test-shop";
  
  const { app } = await serve(process.cwd(), false);
  
  afterEach(async () => {
    const deleteResult = await axios.post(`${endpoint}/action/deleteMany`, {
      dataSource,
      database,
      collection,
      filter: {}
    }, {
      headers: {
        "Access-Control-Request-Headers": "*",
        "Content-Type": "application/json",
        "api-key": apiKey
      }
    }).catch((err) => {
      throw err.message;
    });
  });
  
  test("Redirects to new user home page if user rec not found", async () => {
    const validateAuthCallback = vi
      .spyOn(Shopify.Auth, "validateAuthCallback")
      .mockImplementationOnce(() => ({
        shop: "test-shop",
        scope: "write_products",
        isOnline: true
      }));

    const response = await request(app).get(
      "/auth/callback?host=test-shop-host&shop=test-shop"
    );

    expect(validateAuthCallback).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      {
        host: "test-shop-host",
        shop: "test-shop",
      }
    );

    expect(app.get("active-shopify-shops")).toEqual({
      "test-shop": defaultUserSettings,
    });

    expect(response.status).toEqual(302);
    expect(Object.fromEntries(
      new URL(`https://idk.com${response.headers.location}`).searchParams.entries()
    )).toMatchObject(
      {
        host: "test-shop-host",
        shop: "test-shop",
        newUser: "true"
      }
    );
  });

  test("Redirects to welcome back home page if user rec exists and is inactive", async () => {
    const putResult = await putNewUser(testShopName);

    expect(putResult).toMatchObject({
      matchedCount: 0,
      modifiedCount: 0
    });

    const deactivateResult = await deactivateUser(testShopName);

    expect(deactivateResult).toMatchObject({
      matchedCount: 1,
      modifiedCount: 1
    });

    const validateAuthCallback = vi
      .spyOn(Shopify.Auth, "validateAuthCallback")
      .mockImplementationOnce(() => ({
        shop: "test-shop",
        scope: "write_products",
        isOnline: true
      }));

    const response = await request(app).get(
      "/auth/callback?host=test-shop-host&shop=test-shop"
    );

    expect(validateAuthCallback).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      {
        host: "test-shop-host",
        shop: "test-shop",
      }
    );

    expect(app.get("active-shopify-shops")).toEqual({
      "test-shop": defaultUserSettings,
    });

    expect(response.status).toEqual(302);
    expect(Object.fromEntries(
      new URL(`https://idk.com${response.headers.location}`).searchParams.entries()
    )).toMatchObject(
      {
        host: "test-shop-host",
        shop: "test-shop",
        returningUser: "true"
      }
    );
  });
});
