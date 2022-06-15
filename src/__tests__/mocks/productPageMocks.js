import { QUERY_PAGE_SIZE } from "../../constants";
import { DELETE_PRODUCT } from "../../graphql/mutations/deleteProduct";
import { FETCH_PRODUCT } from "../../graphql/queries/fetchProduct";
import { FETCH_VARIANT } from "../../graphql/queries/fetchVariant";
import { FETCH_VARIANTS_BY_PRODUCT } from "../../graphql/queries/fetchVariantsByProduct";

export const PRODUCT = {
  VALID_W_VARIANTS: {
    id: "111111",
    gid: "gid://shopify/Product/111111",
    mock: {
      request: {
        query: FETCH_PRODUCT,
        variables: {
          id: "gid://shopify/Product/111111"
        }
      },
      result: {
        "data": {
          "product": {
            "id": "gid://shopify/Product/111111",
            "title": "Regular Product",
            "description": "I have some variants",
            "featuredImage": {
              "id": "gid://shopify/ProductImage/1111111",
              "url": "https://source.unsplash.com/random/500x500",
              "altText": "Image of Regular Product"
            },
            "productType": "",
            "tags": [
              "unique variants"
            ],
            "hasOnlyDefaultVariant": false,
            "options": [
              {
                "name": "Title"
              }
            ],
            "templateSuffix": "unique-variants",
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "gid://shopify/ProductVariant/111111"
                  }
                }
              ]
            }
          }
        }
      }
    }
  },
  VALID_NO_VARIANTS: {
    id: "111112",
    gid: `gid://shopify/Product/111112`,
    mock: {
      request: {
        query: FETCH_PRODUCT,
        variables: {
          id: "gid://shopify/Product/111112"
        }
      },
      result: {
        "data": {
          "product": {
            "id": "gid://shopify/Product/111112",
            "title": "Regular Product",
            "description": "I have no variants",
            "featuredImage": {
              "id": "gid://shopify/ProductImage/111112",
              "url": "https://source.unsplash.com/random/500x500",
              "altText": "Image of Regular Product"
            },
            "productType": "",
            "tags": [
              "unique variants"
            ],
            "hasOnlyDefaultVariant": true,
            "options": [
              {
                "name": "Title"
              }
            ],
            "templateSuffix": "unique-variants",
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "gid://shopify/ProductVariant/111112"
                  }
                }
              ]
            }
          }
        }
      }
    }
  },
  INVALID_NO_VARIANTS: {
    id: "7737857573115",
    gid: "gid://shopify/Product/7737857573115",
    mock: {
      request: {
        query: FETCH_PRODUCT,
        variables: {
          id: "gid://shopify/Product/7737857573115"
        }
      },
      result: {
        "data": {
          "product": {
            "id": "gid://shopify/Product/7737857573115",
            "title": "Invalid, No Variants",
            "description": "Tu es un puerca",
            "featuredImage": null,
            "productType": "",
            "tags": [],
            "hasOnlyDefaultVariant": true,
            "options": [
              {
                "name": "Title",
              }
            ],
            "templateSuffix": "",
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "gid://shopify/ProductVariant/43157801926907",
                  },
                }
              ],
            },
          }
        }
      }
    }
  },
  DELETE_SUCCESS: {
    mock: (productId) => ({
      request: {
        query: DELETE_PRODUCT,
        variables: {
          id: `gid://shopify/Product/${productId}`
        }
      },
      result: {
        "data": {
          "productDelete": {
            "deletedProductId": `gid://shopify/Product/${productId}`,
            "userErrors": []
          }
        }
      }
    })
  },
  CONVERT_SUCCESS: {
    mock: (productId) => {

    }
  }
}



export const VARIANTS_BY_PRODUCT = {
  NO_VARIANTS: {
    mock: (productId) => ({
      request: {
        query: FETCH_VARIANTS_BY_PRODUCT(productId),
        variables: {
          first: QUERY_PAGE_SIZE.variants
        }
      },
      result: {
        "data": {
          "productVariants": {
            "edges": [
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43157801926907",
                  "title": "Default Title",
                  "image": {
                    "id": "gid://shopify/ProductImage/111112",
                    "url": "https://source.unsplash.com/random/500x500",
                    "altText": "Image of Regular Product"
                  },
                  "price": "0.00",
                  "product": {
                    "id": `gid://shopify/Product/${productId}`,
                  },
                },
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "eyJsYXN0X2lkIjo0MzE1NzgwMTkyNjkwNywibGFzdF92YWx1ZSI6IjQzMTU3ODAxOTI2OTA3In0=",
              "endCursor": "eyJsYXN0X2lkIjo0MzE1NzgwMTkyNjkwNywibGFzdF92YWx1ZSI6IjQzMTU3ODAxOTI2OTA3In0=",
            }
          }
        }
      }
    })
  },
  PRODUCT_1_VARIANTS: {
    mock: (productId) => ({
      request: {
        query: FETCH_VARIANTS_BY_PRODUCT(productId),
        variables: {
          first: QUERY_PAGE_SIZE.variants
        }
      },
      result: {
        "data": {
          "productVariants": {
            "edges": [
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43138933883131",
                  "title": "Test Variant",
                  "image": {
                    "id": "gid://shopify/ProductImage/37588571455739",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_photo_8f60d4cb-0d80-4ebb-8305-76996e742920.jpg?v=1654968670",
                    "altText": "Image of Test Variant"
                  },
                  "price": "0.00",
                  "product": {
                    "id": `gid://shopify/Product/${productId}`
                  }
                }
              },
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43138945777915",
                  "title": "Bluebery Lumbersexual Cup",
                  "image": {
                    "id": "gid://shopify/ProductImage/37588575781115",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_fc3388dd-52cf-4047-a866-80e9a622bace.jpg?v=1654968927",
                    "altText": "Image of Bluebery Lumbersexual Cup"
                  },
                  "price": "23.38",
                  "product": {
                    "id": `gid://shopify/Product/${productId}`
                  }
                }
              },
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43138946400507",
                  "title": "Paleo Bean",
                  "image": {
                    "id": "gid://shopify/ProductImage/37588575912187",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_9bbf4662-0f81-4746-9163-1831582f94f9.jpg?v=1654968938",
                    "altText": "Image of Paleo Been"
                  },
                  "price": "23.80",
                  "product": {
                    "id": `gid://shopify/Product/${productId}`
                  }
                }
              },
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43138946760955",
                  "title": "Captain's Select",
                  "image": {
                    "id": "gid://shopify/ProductImage/37588576141563",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_b8f32b7e-18da-48f7-846e-7f84159c14b7.jpg?v=1654968950",
                    "altText": "Image of Captain's Select"
                  },
                  "price": "15.37",
                  "product": {
                    "id": `gid://shopify/Product/${productId}`
                  }
                }
              },
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43139037790459",
                  "title": "Chartreuse Forrester",
                  "image": {
                    "id": "gid://shopify/ProductImage/37588657209595",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_8edef814-af56-4c51-95c5-e3e17f0af7ba.jpg?v=1654975983",
                    "altText": "Image of Chartreuse Forrester"
                  },
                  "price": "0.46",
                  "product": {
                    "id": `gid://shopify/Product/${productId}`
                  }
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "eyJsYXN0X2lkIjo0MzEzODkzMzg4MzEzMSwibGFzdF92YWx1ZSI6IjQzMTM4OTMzODgzMTMxIn0=",
              "endCursor": "eyJsYXN0X2lkIjo0MzEzOTAzNzc5MDQ1OSwibGFzdF92YWx1ZSI6IjQzMTM5MDM3NzkwNDU5In0="
            }
          }
        }
      }
    })
  }
}

export const VARIANT = {
  PRODUCT_1_FIRST_IN_LIST: {
    gid: "gid://shopify/ProductVariant/43138933883131",
    title: "Test Variant",
    id: "43138933883131",
    mock: (productId) => ({
      request: {
        query: FETCH_VARIANT,
        variables: {
          id: "gid://shopify/ProductVariant/43138933883131"
        }
      },
      result: {
        "data": {
          "productVariant": {
            "id": "gid://shopify/ProductVariant/43138933883131",
            "title": "Test Variant",
            "image": {
              "id": "gid://shopify/ProductImage/37588571455739",
              "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_photo_8f60d4cb-0d80-4ebb-8305-76996e742920.jpg?v=1654968670",
              "altText": "Image of Test Variant"
            },
            "description": {
              "id": "gid://shopify/Metafield/22771304530171",
              "value": "Helvetica hashtag muggle magic mixtape selvage whatever pabst.",
            },
            "isUv": {
              "id": "gid://shopify/Metafield/22771304562939",
              "value": "true",
            },
            "price": "28.14",
            "product": {
              "id": `gid://shopify/Product/${productId}`,
            },
          }
        }
      }
    })
  }
}