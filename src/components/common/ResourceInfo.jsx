import { 
  Card,
  Stack,
  Heading,
  TextContainer,
  Tag
} from "@shopify/polaris";
import { ProductPhoto } from "../common/ProductPhoto";
import { 
  useLayoutEffect,
  useRef,
  useState,
  useContext
} from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../app/AppFrame";

export const ResourceInfo = ({ resource, details, deleteRedirect }) => {
  const image = resource.image || resource.featuredImage;
  const ref = useRef(null);
  const navigate = useNavigate();

  const { showConfirmDeleteModal } = useContext(ModalContext);

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
            image={image}
            cardWidth={cardWidth}
          />
        </Stack>
      </Card.Section>
      {Object.entries(details).map(([key, value], i) => {
        return (
          <Card.Section key={i}>
            <TextContainer>
              <Heading>{key}</Heading>
              <div
                style={{
                }}
              >
                {
                  Array.isArray(value) 
                    ? value.map((item, i) => {
                      return (
                        <div
                          style={{
                            margin: "2px"
                          }}
                        >
                          <Tag key={i}>{item}</Tag>
                        </div> 
                      )
                    })
                    : value
                }
              </div>
            </TextContainer>
          </Card.Section>
        )
      })}
    </Card>
    </div>
  );
}