import { 
  Layout,
  Heading,
  TextContainer,
  TextStyle,
  List
} from "@shopify/polaris";
import { ProductPhoto } from "../../common/ProductPhoto";

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
        <ProductPhoto 
          url={product?.featuredImage?.url}
          altText={product?.featuredImage?.altText}
        />
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