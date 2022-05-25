import {
  Card,
  Spinner,
  Stack,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { fetchVariant } from "../../utils/fetchVariant";
import { useParams } from "react-router-dom";
import { generateVariantGid } from "../../utils/gidHelper";
import { useMemo, useState } from "react";

import { VariantView } from "./VariantView";
import { VariantEdit } from "./VariantEdit";
import { TestForm } from "./TestForm";

export const VariantPage = () => {
  const { variantId } = useParams();
  const id = generateVariantGid(variantId);
  const { variant, loading, error, refetch } = fetchVariant(id);

  const [editPageOpen, setEditPageOpen] = useState(false);

  const pageContent = useMemo(() => {
    if (loading) return <Spinner />;
    if (error) return (
      <TextContainer>
        <TextStyle>
          Unable to load variant: {error.message}
        </TextStyle>
      </TextContainer>
    )

    if (variant) {
      return (
        editPageOpen 
        ? <VariantEdit 
            variant={variant} 
            editComplete={() => {
              setEditPageOpen(false);
              refetch();
            }}
          /> 
        // ? <TestForm />
        : <VariantView variant={variant} />
      );
    } 

    return null;
  }, [variant, loading, error, editPageOpen]);

  return (
    <Card 
      actions={
        editPageOpen
        ? [
          {
            content: "Cancel",
            onAction: () => setEditPageOpen(false),
            
          }
        ]
        : [
          {
            content: "Edit",
            onAction: () => setEditPageOpen(true),
            loading
          },
          {
            content: "Delete",
            loading
            /* To do - onAction: deleteVariant(id) */
          }
        ]
      }
    >
        <Stack
          distribution="fill"
        >
          {pageContent}
        </Stack>
    </Card>
  );
};