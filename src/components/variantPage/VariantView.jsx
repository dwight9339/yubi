import { 
  Layout,
  Heading,
  Subheading,
  TextContainer,
  TextStyle
} from "@shopify/polaris"

export const VariantView = ({ variant }) => {
  return (
    <Layout>
      <Layout.Section secondary>
        <div
          style={{
            width: "90%"
          }}
        >
          <Heading>
            {variant.title}
          </Heading>
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
              {variant.description.value}
            </TextStyle>
          </TextContainer>
        </div>
      </Layout.Section>
    </Layout>
  )
}