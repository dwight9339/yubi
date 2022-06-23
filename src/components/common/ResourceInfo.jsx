import { 
  Card,
  Stack,
  Heading,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { ProductPhoto } from "../common/ProductPhoto";
import { 
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useNavigate } from "react-router-dom";

export const ResourceInfo = ({ resource, deleteRedirect }) => {
  const image = resource.image || resource.featuredImage;
  const description = resource.description || resource.description.value;
  const ref = useRef(null);
  const navigate = useNavigate();

  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    setCardWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div
      ref={ref}
    >
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
        <Stack distribution="center">
          <ProductPhoto 
            url={image.url}
            altText={image.altText}
            cardWidth={cardWidth}
          />
        </Stack>
      </Card.Section>
      <Card.Section>
        <TextContainer>
          <Heading>Description</Heading>
          <TextStyle>{description}</TextStyle>
        </TextContainer>
      </Card.Section>
    </Card>
    </div>
  );
}