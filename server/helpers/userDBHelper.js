import axios from "axios";
import "dotenv/config";

const {
  USER_DB_API_ENDPOINT: endpoint,
  USER_DB_API_KEY: apiKey,
  USER_DB_NAME: database,
  USER_DB_COLLECTION_NAME: collection,
  USER_DB_DATA_SOURCE: dataSource,
} = process.env;

export const getUser = async (shopName) => {
  const userRec = await axios
    .post(
      `${endpoint}/action/findOne`,
      {
        dataSource,
        database,
        collection,
        filter: { shopName },
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
      throw new Error(`user db access error - getUser - ${err.message}`);
    });

  return userRec.data?.document || null;
};

export const putNewUser = async (shopName, offlineAccessToken) => {
  const putResult = await axios
    .post(
      `${endpoint}/action/updateOne`,
      {
        dataSource,
        database,
        collection,
        filter: { shopName },
        update: {
          shopName,
          offlineAccessToken,
          settings: {},
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
      throw new Error(`user db access error - putNewUser - ${err.message}`);
    });

  return putResult.data;
};

export const deleteUserData = async (shopName) => {
  const deleteResult = await axios
    .post(
      `${endpoint}/action/deleteOne`,
      {
        dataSource,
        database,
        collection,
        filter: { shopName },
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
      throw new Error(`user db access error - deleteUserData - ${err.message}`);
    });

  return deleteResult.data;
};

export const getActiveUsers = async () => {
  const users = await axios
    .post(
      `${endpoint}/action/find`,
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
      throw new Error(`user db access error - getActiveUsers - ${err.message}`);
    });

  return users.data?.documents;
};
