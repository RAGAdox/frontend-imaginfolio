import { Container, Text, Title } from "@mantine/core";
import { useCallback, useState } from "react";
import Login from "../components/molecules/Login";
import Signup from "../components/molecules/Signup";
import Feed from "../components/organism/Feed";
import { useAppSelector } from "../hooks/stateHooks";
import { RootState } from "../store/store";
import { API_STATUS_PENDING, APPLICATION_TITLE } from "../utilities/constants";
import { sentenceCase } from "../utilities/utilities";
import "./Home.scss";

const Home = () => {

  //LOCAL STATES
  const [showLogin, setShowLogin] = useState(true);

  //REDUX STORE STATES
  const { isAuthenticated, authenticationStatus } = useAppSelector(
    (state: RootState) => state.auth
  );

  //FUNCTIONS USED AS PROPS
  const showLoginModal = useCallback(() => {
    setShowLogin((value) => !value);
  }, []);

  if (authenticationStatus === API_STATUS_PENDING) {
    return <></>;
  }
  return isAuthenticated ? (
    <Container fluid my="md">
      <Feed />
    </Container>
  ) : (
    <Container
      size="sm"
      className="disp-f fd-col h100 jc-c home-login-container"
    >
      <Title order={1} variant="gradient" className="home-title" align="center">
        {sentenceCase(APPLICATION_TITLE)}
      </Title>
      {showLogin ? (
        <>
          <Login />
          <Text pt="md" size="md" color="dimmed" align="center">
            New user ?{" "}
            <Text variant="link" component="span" onClick={showLoginModal}>
              Click here to Signup
            </Text>
          </Text>
        </>
      ) : (
        <>
          <Signup />
          <Text
            pt="md"
            size="md"
            variant="link"
            align="center"
            onClick={showLoginModal}
          >
            Proceed to login
          </Text>
        </>
      )}
    </Container>
  );
};

export default Home;
