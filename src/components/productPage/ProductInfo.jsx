import { 
  Layout,
  Heading,
  TextContainer,
  TextStyle,
  Subheading,
  Thumbnail
} from "@shopify/polaris";

export const ProductInfo = ({ product }) => {
  return (
    <Layout>
      <Layout.Section secondary>
        <div
          style={{
            width: "90%"
          }}
        >
          <Heading>
            {product.title}
          </Heading>
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            style={{
              width: "100%",
              overflow: "hidden"
            }}
          />
        </div>
      </Layout.Section>
      <Layout.Section>
        <div
          style={{
            width: "90%"
          }}
        >
          <Subheading>
            Description
          </Subheading>
          <TextContainer>
            <TextStyle>
              {product.description}
            </TextStyle>
          </TextContainer>
        </div>
      </Layout.Section>
    </Layout>
  );
}