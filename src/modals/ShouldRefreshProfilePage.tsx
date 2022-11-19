import { Text, Title } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { refreshProfile } from "../store/Features/ViewProfile/slice";
import store from "../store/store";

export {};

export const shouldRefreshProfilePage = () => {
  openConfirmModal({
    title: (
      <Title variant="gradient" order={3}>
        Should Refresh Page
      </Title>
    ),
    centered: true,
    size: "lg",
    children: (
      <Text>
        Posts from your profile have been updated.{"\n"} Do you wish to refresh
        the page
      </Text>
    ),
    labels: {
      confirm: "Yes, Sure",
      cancel: "Cancel",
    },
    onConfirm() {
      store.dispatch(refreshProfile());
    },
  });
};
