// metafields namespaces used for graphql queries to store/retrieve data by those namespaces
export const METAFIELD_NAMESPACE = {
  general: "uvapp",
  variants: "uvapp-variants",
  products: "uvapp-products",
  installed: "uvapp-installed"
};

// graphql queries will add/delete/update data under these keys in the
// METAFIELD_NAMESPACE.general namespace
export const METAFIELD_KEY = {
  variantName: "variant_name",
  variantDescription: "variant_description",
  isUniqueVariantsProduct: "is_unique_variants_product",
  appInstalled: "app_installed"
};

export const ROUTES = {
  products: "/products",
};

export const QUERY_PAGE_SIZE = {
  products: 5,
  variants: 5,
  variantsPreview: 3
};

export const UV_TAG = "unique variants";
export const UV_TEMPLATE_SUFFIX = "unique-variants";
