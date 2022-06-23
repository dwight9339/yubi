import { 
  Card,
  Layout,
  Heading,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { ProductPhoto } from "../common/ProductPhoto";

export const ResourceInfo = ({ resource, deleteRedirect }) => {
  const image = resource.image || resource.featuredImage;
  const description = resource.description || resource.description.value;

  return (
    <Card
      title={resource.title}
      actions={[
        {
          content: "Edit",
          onAction: () => navigate("edit")
        },
        {
          content: "Delete",
          onAction: () => {
            showConfirmDeleteModal(resource, deleteRedirect);
          }
        }
      ]}
    >
      <Card.Section secondary>
        <ProductPhoto 
          url={image.url}
          altText={image.altText}
        />
      </Card.Section>
      <Card.Section>
        <TextContainer>
          <Heading>Description</Heading>
          <TextStyle>{description}</TextStyle>
        </TextContainer>
      </Card.Section>
    </Card>
  );
}