import {
  Card,
  Stack,
  Pagination
} from "@shopify/polaris";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ProductInfo } from "./ProductInfo";
import { VariantsList } from "./VariantsList";
import { QUERY_PAGE_SIZE } from "../../constants";
import { useContext } from "react";
import { ModalContext } from "../../app/AppFrame";
import { upsertVariant } from "../../utils/apiHooks/upsertVariant";
import { stageImageUpload } from "../../utils/apiHooks/stageImageUpload";
import { getIdFromGid } from "../../utils/gidHelper";
import {
  getRandomImageFile,
  getRandomName,
  generateRandomPrice,
  getVariantDescription
} from "../../utils/test/randomDataHelper";

export const ProductView = () => {
  const navigate = useNavigate();
  const createVariantHook = upsertVariant();
  const uploadImageHook = stageImageUpload();
  const { showConfirmDeleteModal} = useContext(ModalContext);
 

  const { 
    product, 
    variants, 
    pageInfo,  
    fetchMoreVariants
  } = useOutletContext();

  const getNextPage = () => {
    fetchMoreVariants({
      variables: {
        first: QUERY_PAGE_SIZE.variants,
        last: null,
        after: pageInfo.endCursor,
        before: null
      }
    });
  };

  const getPrevPage = () => {
    fetchMoreVariants({
      variables: {
        first: null,
        last: QUERY_PAGE_SIZE.variants,
        after: null,
        before: pageInfo.startCursor
      }
    })
  }

  const variantCardActions = [
    {
      content: "New variant",
      onAction: () => navigate("new-variant")
    }
  ];

  // Add random variant action in dev
  const createRandomVariant = async () => {
    const imageFile = await getRandomImageFile();
    const name = await getRandomName(); 
    const description = await getVariantDescription();

    const imageUploadResult = await uploadImageHook(imageFile);
    const variantData = {
      variantName: name,
      variantDescription: description,
      variantPrice: generateRandomPrice(),
      imageData: {
        src: imageUploadResult.src,
        altText: `Image of ${name}`
      },
      product
    }

    const productCreateResult = await createVariantHook(variantData);
  }

  if (process.env.NODE_ENV !== "production") {
    variantCardActions.splice(0, 0, {
      content: "Random variant",
      onAction: async () => {
        await createRandomVariant();
        navigate(`/product/${getIdFromGid(product.id)}`,
        {state: {reload: true}});
      }
    });
  }

  return (
    <Stack
      distribution="fill"
    >
      <Card
        title="Product Info"
        actions={[
          {
            content: "Edit",
            onAction: () => navigate("edit")
          },
          {
            content: "Delete",
            onAction: () => {
              showConfirmDeleteModal(product, "/");
            }
          }
        ]}
      >
        <Stack>
          <ProductInfo product={product} />
        </Stack>
      </Card>
      <div
        style={{
          maxWidth: "500px"
        }}
      >
      <Card
        title="Variants"
        actions={variantCardActions}
      >
        <Card.Section>
          <Stack distribution="fill">
            <VariantsList 
              variants={
                product.hasOnlyDefaultVariant 
                  ? []
                  : variants.filter((variant) => variant.title !== "Default Title")
              } 
            />
          </Stack>
        </Card.Section>
        <Card.Section>
          <Pagination
            hasNext={pageInfo.hasNextPage}
            hasPrevious={pageInfo.hasPreviousPage}
            onNext={getNextPage}
            onPrevious={getPrevPage}
          />
        </Card.Section>
      </Card>
      </div>
    </Stack>
  );
}