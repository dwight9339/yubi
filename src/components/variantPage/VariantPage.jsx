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
import { serializeFormQuery } from "../../utils/queryStringHelper";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { VariantView } from "./VariantView";
import { VariantEdit } from "./VariantEdit";

export const VariantPage = () => {
  const { variantId } = useParams();
  const id = generateVariantGid(variantId);
  const { variant, loading, error, refetch } = fetchVariant(id);

  const [editPageOpen, setEditPageOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("edit")) {
      setEditPageOpen(true);
    }
  }, [searchParams]);

  const closeEditPage = () => {
    searchParams.delete("edit");
    setSearchParams(serializeFormQuery(searchParams));
    setEditPageOpen(false);
  }

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
              closeEditPage();
              refetch();
            }}
          /> 
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
            onAction: () => {
              closeEditPage();
            },  
            
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