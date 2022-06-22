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
import { getIdFromGid } from "../../utils/gidHelper";
import { useContext } from "react";
import { ModalContext } from "../../app/AppFrame";
import { useCurrencyFormatter } from "../../utils/hooks/useCurrencyFormatter";

export const VariantView = () => {
  const navigate = useNavigate();
  const formatCurrency = useCurrencyFormatter();
  const { variant } = useOutletContext();
  const { showConfirmDeleteModal } = useContext(ModalContext);
  const productId = getIdFromGid(variant.product.id);

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
          onAction: () => {
            showConfirmDeleteModal(variant, `/product/${productId}`);
          }
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
                {formatCurrency(variant.price)}
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