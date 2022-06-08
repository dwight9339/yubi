import { UV_TAG, UV_TEMPLATE_SUFFIX } from "../constants";

export const productRequirementsAudit = (product) => {
  const onlyTitleAsOption = product.hasOnlyDefaultVariant || product.options.length === 1;
  const hasUvTag = product.tags.includes(UV_TAG);
  const hasUvTemplate = product.templateSuffix === UV_TEMPLATE_SUFFIX;

  console.log(`onlyTitleAsOption: ${onlyTitleAsOption}`);
  console.log(`hasUvTag: ${hasUvTag}`);
  console.log(`hasUvTemplate: ${hasUvTemplate}`);
  
  return onlyTitleAsOption && hasUvTag && hasUvTemplate;
}