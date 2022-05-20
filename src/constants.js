// metafields namespaces used for graphql queries to store/retrieve data by those namespaces
export const METAFIELD_NAMESPACE = {
  general: "uvapp",
  variants: "uvapp-variants",
  installed: "uvapp-installed"
};

// graphql queries will add/delete/update data under these keys in the
// METAFIELD_NAMESPACE.general namespace
export const METAFIELD_KEY = {
  variantName: "variant_name",
  variantDescription: "variant_description",
  appInstalled: "app_installed"
};

export const ROUTES = {
  products: "/products",
};

export const QUERY_PAGE_SIZE = {
  products: 2,
  variants: 5,
};
