import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { logout } from "../store/Features/User/slice";
import store from "../store/store";

export const openLogoutModalConfirmation = () => {
  if (store.getState().auth.isAuthenticated) {
    openConfirmModal({
      title: "Logout Confirmation",
      centered: true,
      size: "lg",
      children: <Text>Are you sure you want to logout from your profile</Text>,
      labels: {
        confirm: "Yes, Logout",
        cancel: "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm() {
        store.dispatch(logout());
      },
    });
  }
};
