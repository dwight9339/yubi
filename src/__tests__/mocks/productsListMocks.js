import { QUERY_PAGE_SIZE } from "../../constants"
import { FETCH_PRODUCTS } from "../../graphql/queries/fetchProducts"
import { FETCH_PRODUCT } from "../../graphql/queries/fetchProduct"
import { FETCH_VARIANT } from "../../graphql/queries/fetchVariant"
import { FETCH_VARIANTS_BY_PRODUCT } from "../../graphql/queries/fetchVariantsByProduct"

export const PRODUCTS = {
  NO_PRODUCTS: {
    mock: {
      request: {
        query: FETCH_PRODUCTS,
        variables: {
          first: QUERY_PAGE_SIZE.products
        }
      },
      result: {
        "data": {
          "products": {
            "edges": [],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": null,
              "endCursor": null,
            },
          }
        }
      }
    }
  },
  SOME_PRODUCTS: {
    mock: {
      request: {
        query: FETCH_PRODUCTS,
        variables: {
          first: QUERY_PAGE_SIZE.products
        }
      },
      result: {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "gid://shopify/Product/7738299875579",
                  "title": "Neutra Star",
                  "featuredImage": {
                    "url": "https://source.unsplash.com/random/500x500",
                    "altText": "Image of Neutra Star",
                  },
                  "totalVariants": 4,
                  "hasOnlyDefaultVariant": false,
                  "variants": {
                    "edges": [
                      {
                        "node": {
                          "id": "gid://shopify/ProductVariant/43160658510075",
                          "title": "Kombucha Postmodern Utopia",
                          "image": {
                            "url": "https://source.unsplash.com/random/500x500",
                            "altText": "Image of Kombucha Postmodern Utopia",
                          },
                        },
                      },
                      {
                        "node": {
                          "id": "gid://shopify/ProductVariant/43160671584507",
                          "title": "Blacktop Town",
                          "image": {
                            "url": "https://source.unsplash.com/random/500x500",
                            "altText": "Image of Blacktop Town",
                          },
                        },
                      },
                      {
                        "node": {
                          "id": "gid://shopify/ProductVariant/43160671846651",
                          "title": "Postmodern Pickled Look",
                          "image": {
                            "url": "https://source.unsplash.com/random/500x500",
                            "altText": "Image of Postmodern Pickled Look",
                          },
                        },
                      }
                    ],
                  },
                },
              },
              {
                "node": {
                  "id": "gid://shopify/Product/7738300006651",
                  "title": "The Been",
                  "featuredImage": {
                    "url": "https://source.unsplash.com/random/500x500",
                    "altText": "Image of The Been",
                  },
                  "totalVariants": 2,
                  "hasOnlyDefaultVariant": false,
                  "variants": {
                    "edges": [
                      {
                        "node": {
                          "id": "gid://shopify/ProductVariant/43160659067131",
                          "title": "Veranda Kogi Coffee",
                          "image": {
                            "url": "https://source.unsplash.com/random/500x500",
                            "altText": "Image of Veranda Kogi Coffee",
                          },
                        },
                      },
                      {
                        "node": {
                          "id": "gid://shopify/ProductVariant/43160673845499",
                          "title": "Taxidermy Seattle Select",
                          "image": {
                            "url": "https://source.unsplash.com/random/500x500",
                            "altText": "Image of Taxidermy Seattle Select",
                          },
                        },
                      }
                    ],
                  },
                },
              },
              {
                "node": {
                  "id": "gid://shopify/Product/7738299613435",
                  "title": "Good-morning Look",
                  "featuredImage": {
                    "url": "https://source.unsplash.com/random/500x500",
                    "altText": "Image of Good-morning Look",
                  },
                  "totalVariants": 3,
                  "hasOnlyDefaultVariant": false,
                  "variants": {
                    "edges": [
                      {
                        "node": {
                          "id": "gid://shopify/ProductVariant/43160656052475",
                          "title": "American Listicle",
                          "image": {
                            "url": "https://source.unsplash.com/random/500x500",
                            "altText": "Image of American Listicle ",
                          },
                        },
                      },
                      {
                        "node": {
                          "id": "gid://shopify/ProductVariant/43160675254523",
                          "title": "Pitchfork Reg's Symphony",
                          "image": {
                            "url": "https://source.unsplash.com/random/500x500",
                            "altText": "Image of Pitchfork Reg's Symphony",
                          },
                        },
                      },
                      {
                        "node": {
                          "id": "gid://shopify/ProductVariant/43160675975419",
                          "title": "Artisan Captain's Cake",
                          "image": {
                            "url": "https://source.unsplash.com/random/500x500",
                            "altText": "Image of Artisan Captain's Cake",
                          },
                        },
                      }
                    ],
                  },
                },
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "eyJsYXN0X2lkIjo3NzM4Mjk5ODc1NTc5LCJsYXN0X3ZhbHVlIjoxNjU1MzA0OTU0MDAwfQ==",
              "endCursor": "eyJsYXN0X2lkIjo3NzM4Mjk5NjEzNDM1LCJsYXN0X3ZhbHVlIjoxNjU1MzA1MDIyMDAwfQ==",
            },
          }
        }
      }
    }
  }
}

export const PRODUCT = {
  PRODUCT_1: {
    mock: {
      request: {
        query: FETCH_PRODUCT,
        variables: {
          id: "gid://shopify/Product/7738299875579"
        }
      }, 
      result: {
        "data": {
          "product": {
            "id": "gid://shopify/Product/7738299875579",
            "title": "Neutra Star",
            "description": "Pork pancetta shank, beef shankle short ribs ham short loin picanha cow chuck tongue. Turducken brisket biltong rump porchetta. Spare ribs short ribs frankfurter, cow buffalo andouille biltong bacon corned beef jowl filet mignon ham pork. Picanha boudin kevin chuck corned beef fatback.",
            "featuredImage": {
              "id": "gid://shopify/ProductImage/37607951859963",
              "url": "https://source.unsplash.com/random/500x500",
              "altText": "Image of Neutra Star",
            },
            "productType": "",
            "tags": [
              "unique variants"
            ],
            "hasOnlyDefaultVariant": false,
            "options": [
              {
                "name": "Title",
              }
            ],
            "templateSuffix": "unique-variants",
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "gid://shopify/ProductVariant/43160658510075",
                  },
                }
              ],
            },
          }
        }
      }
    }
  }
}

export const VARIANTS_BY_PRODUCT = {
  PRODUCT_1_VARIANTS: {
    mock: {
      request: {
        query: FETCH_VARIANTS_BY_PRODUCT("7738299875579"),
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
                  "id": "gid://shopify/ProductVariant/43160658510075",
                  "title": "Kombucha Postmodern Utopia",
                  "image": {
                    "id": "gid://shopify/ProductImage/37607988855035",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_b670ccaf-5acc-431f-a9f8-9213bd1fecad.jpg?v=1655304930",
                    "altText": "Image of Kombucha Postmodern Utopia",
                  },
                  "price": "94.16",
                  "product": {
                    "id": "gid://shopify/Product/7738299875579",
                  },
                },
              },
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43160671584507",
                  "title": "Blacktop Town",
                  "image": {
                    "id": "gid://shopify/ProductImage/37607989444859",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_2dc6ffbe-3cc0-4e77-ada8-f43cea757a23.jpg?v=1655304936",
                    "altText": "Image of Blacktop Town",
                  },
                  "price": "76.71",
                  "product": {
                    "id": "gid://shopify/Product/7738299875579",
                  },
                },
              },
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43160671846651",
                  "title": "Postmodern Pickled Look",
                  "image": {
                    "id": "gid://shopify/ProductImage/37607990001915",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_772f0fed-5e75-4216-a57b-9f6d545896aa.jpg?v=1655304943",
                    "altText": "Image of Postmodern Pickled Look",
                  },
                  "price": "36.02",
                  "product": {
                    "id": "gid://shopify/Product/7738299875579",
                  },
                },
              },
              {
                "node": {
                  "id": "gid://shopify/ProductVariant/43160672370939",
                  "title": "YOLO Cake",
                  "image": {
                    "id": "gid://shopify/ProductImage/37607990984955",
                    "url": "https://cdn.shopify.com/s/files/1/0626/9586/6619/products/random_57afa848-c61e-46d9-96ff-78aedd67030d.jpg?v=1655304952",
                    "altText": "Image of YOLO Cake",
                  },
                  "price": "1.58",
                  "product": {
                    "id": "gid://shopify/Product/7738299875579",
                  },
                },
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "eyJsYXN0X2lkIjo0MzE2MDY1ODUxMDA3NSwibGFzdF92YWx1ZSI6IjQzMTYwNjU4NTEwMDc1In0=",
              "endCursor": "eyJsYXN0X2lkIjo0MzE2MDY3MjM3MDkzOSwibGFzdF92YWx1ZSI6IjQzMTYwNjcyMzcwOTM5In0=",
            },
          }
        }
      }
    }
  }
}