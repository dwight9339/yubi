import {
  Card,
  Spinner,
  Stack,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { fetchVariant } from "../../utils/fetchVariant";
import { useParams } from "react-router-dom";
import { generateVariantGid, getIdFromGid } from "../../utils/gidHelper";
import { serializeFormQuery } from "../../utils/queryStringHelper";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { deleteVariant } from "../../utils/deleteVariant";
import { useNavigate } from "react-router-dom";
import { useIsMounted } from "../../utils/hooks/useIsMounted";

import { VariantView } from "./VariantView";
import { VariantEdit } from "./VariantEdit";

export const VariantPage = () => {
  const { variantId } = useParams();
  const id = generateVariantGid(variantId);
  const { variant, loading, error, refetch } = fetchVariant(id);
  const deleteVariantHook = deleteVariant();
  const navigate = useNavigate();
  const isMounted = useIsMounted();

  const [editPageOpen, setEditPageOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isMounted && searchParams.get("edit")) {
      setEditPageOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    searchParams.delete("edit");
    setSearchParams(serializeFormQuery(searchParams));
    setEditPageOpen(false);
  }

  const handleEdit = () => {
    setEditPageOpen(true);
  }

  const handleDelete = () => {
    if (variant) {
      const productId = getIdFromGid(variant.product.id);
      deleteVariantHook(variant);
      navigate(`/product/${productId}`, {replace: true});
    }
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
              handleClose();
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
            loading,
            onAction: handleClose,  
            
          }
        ]
        : [
          {
            content: "Edit",
            onAction: handleEdit,
            loading
          },
          {
            content: "Delete",
            loading,
            onAction: handleDelete
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