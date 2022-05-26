import { Outlet } from "react-router-dom";
import { Page, Stack} from "@shopify/polaris"
import { useLocation } from "react-router-dom";
import { useRoutePropagation } from "@shopify/app-bridge-react";
import useWindowDimensions from "../utils/hooks/useWindowDimensions";

export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  const location = useLocation();

  useRoutePropagation(location);
  
  return (
    <Page 
      fullWidth
    >
      <Stack 
        distribution="center"
      >
        <div
          style={{
            width: windowWidth * 0.8
          }}
        >
          <Outlet />
        </div>
      </Stack>
    </Page>
  );
};
