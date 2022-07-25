/**
 * @vitest-environment node
 */

import { describe, test, expect, beforeEach, afterEach } from "vitest";
import axios from "axios";
import "dotenv/config";
import {
  getUser,
  putNewUser,
  deleteUserData,
  getActiveUsers,
} from "../../helpers/userDBHelper";

describe("userDBHelper Functions", () => {
  const {
    USER_DB_API_ENDPOINT: endpoint,
    USER_DB_API_KEY: apiKey,
    USER_DB_NAME: database,
    USER_DB_COLLECTION_NAME: collection,
    USER_DB_DATA_SOURCE: dataSource,
  } = process.env;
  const testShopName = "test-shop.myshopify.com";
  const testOfflineToken = "offline-token";

  beforeEach(async () => {
    await axios
      .post(
        `${endpoint}/action/updateOne`,
        {
          dataSource,
          database,
          collection,
          filter: { shopName: testShopName },
          update: {
            shopName: testShopName,
            offlineAccessToken: testOfflineToken,
          },
          upsert: true,
        },
        {
          headers: {
            "Access-Control-Request-Headers": "*",
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      )
      .catch((err) => {
        throw err.message;
      });
  });

  afterEach(async () => {
    const deleteResult = await axios
      .post(
        `${endpoint}/action/deleteMany`,
        {
          dataSource,
          database,
          collection,
          filter: {},
        },
        {
          headers: {
            "Access-Control-Request-Headers": "*",
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      )
      .catch((err) => {
        throw err.message;
      });
  });

  describe("getUser", () => {
    test("Returns user data when user exists", async () => {
      const user = await getUser(testShopName);
      expect(user).toMatchObject({
        _id: expect.anything(),
        shopName: testShopName,
        offlineAccessToken: testOfflineToken,
      });
    });

    test("Returns null if user not found", async () => {
      const user = await getUser("nonexistent_user_44554.myshopify.test");
      expect(user).toBe(null);
    });
  });

  describe("putNewUser", () => {
    test("Inserts new user if no document with same shop name", async () => {
      const putResult = await putNewUser("rando_test_user.myshopify.test");

      expect(putResult).toMatchObject({
        matchedCount: 0,
        modifiedCount: 0,
      });
    });

    test("Updates user if document with provided shop name is present", async () => {
      const putResult = await putNewUser(testShopName);

      expect(putResult).toMatchObject({
        matchedCount: 1,
        modifiedCount: 1,
      });
    });
  });

  describe("deleteUserData", () => {
    test("Deletes user if matching rec found", async () => {
      const deleteResult = await deleteUserData(testShopName);

      expect(deleteResult).toMatchObject({ deletedCount: 1 });
    });

    test("Deletes nothing if no matching rec found", async () => {
      const deleteResult = await deleteUserData(
        "boogieboogieboo.myshopify.test"
      );

      expect(deleteResult).toMatchObject({ deletedCount: 0 });
    });
  });
});
