import { Title } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import Login from "../components/molecules/Login";
import { resetAuthenticationStatus } from "../store/Features/User/slice";
import store from "../store/store";
export const openLoginModal = () => {
  if (!store.getState().auth.isAuthenticated)
    openModal({
      title: (
        <Title variant="gradient" order={3}>
          Login
        </Title>
      ),
      centered: true,
      size: "lg",
      children: <Login isModal onSuccess={() => closeAllModals()} />,
      onClose() {
        store.dispatch(resetAuthenticationStatus());
      },
    });
  else
    showNotification({
      title: "User Authentication",
      message: "User is already logged in to the application ",
    });
};
