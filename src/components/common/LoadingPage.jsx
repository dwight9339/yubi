import {
  Stack,
  Spinner
} from "@shopify/polaris";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

export const LoadingPage = () => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <div
      style={{
        paddingTop: "100px"
      }}
    >
      <Stack
        distribution="center"
        alignment="center"
      >
        
        <Spinner />
      </Stack>
    </div>
  );
}