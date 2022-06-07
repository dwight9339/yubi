import { Outlet } from "react-router-dom";
import { Page, Stack} from "@shopify/polaris"
import { useLocation } from "react-router-dom";
import { useRoutePropagation } from "@shopify/app-bridge-react";
import { AppFrame } from "./AppFrame";
import useWindowDimensions from "../utils/hooks/useWindowDimensions";

export const App = () => {
  const { width: windowWidth } = useWindowDimensions();
  const location = useLocation();

  useRoutePropagation(location);
  
  return (
    <Stack 
      distribution="center"
    >
      <div
        style={{
          width: windowWidth * 0.8
        }}
      >
        <AppFrame>
          <Outlet />
        </AppFrame>
      </div>
    </Stack>
  );
};
