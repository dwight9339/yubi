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
  isUniqueVariant: "is_uv",
  deleteAfterPurchase: "delete_after_purchase"
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
export const IMAGE_SIZE_LIMIT = 20.971e6; // In bytes
export const SUPPORTED_IMAGE_TYPES = ["jpeg", "png", "gif"]
export const GENERIC_ERROR_TEXT = "We've encountered an error. Please try again. If the problem persists, please file a support ticket."


// EmailJS
export const EMAILJS_SERVICE_ID = <INSERT SERVICE ID>
export const EMAILJS_TEMPLATE_ID = <INSERT TEMPLATE ID>
export const EMAILJS_USER_ID = <INSERT API PUBLIC KEY>
