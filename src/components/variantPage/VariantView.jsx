import { 
  Layout,
  Heading,
  Subheading,
  TextContainer,
  TextStyle,
  Card
} from "@shopify/polaris";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router";
import { deleteVariant } from "../../utils/apiHooks/deleteVariant";
import { getIdFromGid } from "../../utils/gidHelper";

export const VariantView = () => {
  const deleteVariantHook = deleteVariant();
  const navigate = useNavigate();
  const { variant } = useOutletContext();
  const handleDelete = async () => {
      const productId = getIdFromGid(variant.product.id);
      await deleteVariantHook(variant);
      navigate(`/product/${productId}`, { state: { reload: true }});
  }

  return (
    <Card
      title={variant.title}
      actions={[
        {
          content: "Edit", 
          onAction: () => navigate("edit")
        },
        {
          content: "Delete",
          onAction: handleDelete
        }
      ]}
    >
      <Layout>
        <Layout.Section secondary>
          <div
            style={{
              width: "90%"
            }}
          >
            <img
              src={variant.image?.url}
              alt={variant.image?.altText}
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
              Price
            </Subheading>
            <TextContainer>
              <TextStyle>
                ${variant.price}
              </TextStyle>
            </TextContainer>
            <Subheading>
              Description
            </Subheading>
            <TextContainer>
              <TextStyle>
                {variant.description?.value}
              </TextStyle>
            </TextContainer>
          </div>
        </Layout.Section>
      </Layout>
    </Card>
  )
}