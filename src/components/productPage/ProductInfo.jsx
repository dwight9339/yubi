import { 
  Layout,
  Heading,
  TextContainer,
  TextStyle,
  List
} from "@shopify/polaris";

export const ProductInfo = ({ product }) => {
  return (
  <div
    style={{
      maxWidth: "90%",
      margin: "auto",
      paddingBottom: "20px"
    }}
  >
    <Layout>
      <Layout.Section oneThird>
        <TextContainer>
          <img
            src={product?.featuredImage?.url}
            alt={product?.featuredImage?.altText}
            style={{
              width: "100%",
              overflow: "hidden"
            }}
          />
        </TextContainer>
      </Layout.Section>
      <Layout.Section oneThird>
          <TextContainer>
            <Heading>Description</Heading>
            <TextStyle>{product.description}</TextStyle>
          </TextContainer>
      </Layout.Section>
      <Layout.Section oneThird>
        <TextContainer>
            <Heading>Tags</Heading>
            <List>
              {product.tags.map((tag, i) => {
                return <List.Item key={i}>{tag}</List.Item>
              })}
            </List>
          </TextContainer>
      </Layout.Section>
    </Layout>
  </div>
  );
}