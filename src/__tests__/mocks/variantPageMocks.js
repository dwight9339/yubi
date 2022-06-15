import { FETCH_VARIANT } from "../../graphql/queries/fetchVariant";

export const VARIANT = {
  TEST_VARIANT: {
    mock: {
      request: {
        query: FETCH_VARIANT,
        variables: {
          id: "gid://shopify/ProductVariant/43160656052475"
        }
      },
      result: {
        "data": {
          "productVariant": {
            "id": "gid://shopify/ProductVariant/43160656052475",
            "title": "American Listicle",
            "image": {
              "id": "gid://shopify/ProductImage/37607995506939",
              "url": "https://source.unsplash.com/random/500x500",
              "altText": "Image of American Listicle ",
            },
            "description": {
              "id": "gid://shopify/Metafield/22771481608443",
              "value": "Cronut austin flannel knausgaard williamsburg yr goth ugh.",
            },
            "isUv": {
              "id": "gid://shopify/Metafield/22771481641211",
              "value": "true",
            },
            "price": "30.93",
            "product": {
              "id": "gid://shopify/Product/7738299613435",
            },
          }
        }
      }
    }
  },
  INVALID_VARIANT_ID: {
    mock: {
      request: {
        query: FETCH_VARIANT,
        variables: {
          id: "gid://shopify/ProductVariant/222222"
        }
      },
      result: {
        "data": {
          "productVariant": null
        }
      }
    }
  }
}