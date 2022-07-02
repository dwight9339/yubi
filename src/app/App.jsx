import { Outlet, useLocation } from "react-router-dom";
import { Stack } from "@shopify/polaris";
import { useRoutePropagation } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import { AppFrame } from "./AppFrame";
import { NewUserModal } from "../components/modals/NewUserModal";

export const App = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [showNewUserModal, setShowNewUserModal] = useState(false);

  useEffect(() => {
    const newUser = urlParams.get("newUser");

    if (newUser) {
      setShowNewUserModal(true);
    }
  }, []);

  useRoutePropagation(location);

  return (
    <Stack distribution="center">
      <div
        style={{
          width: "100%",
        }}
      >
        <AppFrame>
          <NewUserModal
            show={showNewUserModal}
            onClose={() => setShowNewUserModal(false)}
          />
          <Outlet />
        </AppFrame>
      </div>
    </Stack>
  );
};
