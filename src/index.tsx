import { ButtonProps, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./store/store";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const ButtonDefaultProps: Partial<ButtonProps> = {
  color: "lime",
  variant: "gradient",
};
const IconButtonDefaultProps: Partial<ButtonProps> = {
  color: "red",
};
const AvatarDefaultProps: Partial<ButtonProps> = {
  color: "",
  variant: "outline",
};

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MantineProvider
        theme={{
          colorScheme: "dark",
          components: {
            Button: { defaultProps: ButtonDefaultProps },
            IconButton: { defaultProps: IconButtonDefaultProps },
            Avatar: { defaultProps: AvatarDefaultProps },
          },
          respectReducedMotion: true,
          primaryColor: "teal",
          defaultGradient: { from: "teal", to: "lime", deg: 105 },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-right">
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
