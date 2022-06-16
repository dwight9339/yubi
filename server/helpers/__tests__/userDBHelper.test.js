/**
 * @vitest-environment node
 */

import { describe, test, expect, beforeEach, afterEach } from "vitest";
import axios from "axios";  
import "dotenv/config";
import {
  getUser,
  putNewUser,
  deactivateUser,
  reactivateUser,
  deleteUserData
} from "../userDBHelper";

describe("userDBHelper Functions", () => {
  const { 
    USER_DB_API_ENDPOINT: endpoint,
    USER_DB_API_KEY: apiKey,
    USER_DB_NAME: database,
    USER_DB_COLLECTION_NAME: collection,
    USER_DB_DATA_SOURCE: dataSource
  } = process.env;
  const shopName = "test-shop.myshopify.com";
  const defaultUserSettings = {
    deleteUvOnPurchase: false,
    darkModeOn: false
  }

  beforeEach(async () => {
    await axios.post(`${endpoint}/action/updateOne`, {
      dataSource,
      database,
      collection,
      filter: {shopName},
      update: {
        shopName,
        active: true,
        settings: defaultUserSettings
      },
      upsert: true
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

  afterAll(async () => {
    const deleteResult = await axios.post(`${endpoint}/action/deleteOne`, {
      dataSource,
      database,
      collection,
      filter: {shopName}
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

  describe("getUser", () => {
    test("Returns user data when user exists", async () => {
      const user = await getUser(shopName);
      expect(user).toMatchObject(
        {
          _id: expect.anything(),
          shopName,
          active: true,
          settings: defaultUserSettings
        }
      );
    });
  });
});