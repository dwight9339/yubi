import axios from "axios";
import "dotenv/config";

const { 
  USER_DB_API_ENDPOINT: endpoint,
  USER_DB_API_KEY: apiKey,
  USER_DB_NAME: database,
  USER_DB_COLLECTION_NAME: collection,
  USER_DB_DATA_SOURCE: dataSource
} = process.env;
const defaultUserSettings = {
  deleteUvOnPurchase: false,
  darkModeOn: false
}

export const getUser = async (shopName) => {
  const userRec = await axios.post(`${endpoint}/action/findOne`, {
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
    console.error(`DB access failure: ${err.message}`);
    return null;
  });
  console.log(userRec.data.document);
  return userRec.data.document;
}

getUser("test-shop.myshopify.com");


export const putNewUser = async (shopName) => {
  const putResult = await axios.post(`${endpoint}/action/updateOne`, {
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
    console.error(`DB access failure: ${err.message}`);
    return null;
  });

  return putResult.data;
}

export const deactivateUser = async (shopName) => {
  const deactivateResult = await axios.post(`${endpoint}/action/updateOne`, {
    dataSource,
    database,
    collection,
    filter: {shopName},
    update: {
      active: false
    }
  }, {
    headers: {
      "Access-Control-Request-Headers": "*",
      "Content-Type": "application/json",
      "api-key": apiKey
    }
  }).catch((err) => {
    console.error(`DB access failure: ${err.message}`);
    return null;
  });

  return deactivateResult.data;
}

export const reactivateUser = async (shopName) => {
  const reactivateResult = await axios.post(`${endpoint}/action/updateOne`, {
    dataSource,
    database,
    collection,
    filter: {shopName},
    update: {
      active: true
    }
  }, {
    headers: {
      "Access-Control-Request-Headers": "*",
      "Content-Type": "application/json",
      "api-key": apiKey
    }
  }).catch((err) => {
    console.error(`DB access failure: ${err.message}`);
    return null;
  });

  return reactivateResult.data;
}

export const deleteUserData = async (shopName) => {
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
    console.error(`DB access failure: ${err.message}`);
    return null;
  });

  return reactivateResult.data;
}