import { Container, Text, Title } from "@mantine/core";
import { useState } from "react";
import Signup from "../components/molecules/Signup";
import { APPLICATION_TITLE } from "../utilities/constants";
import { sentenceCase } from "../utilities/utilities";

const Login = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  return (
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
            <Text
              variant="link"
              component="span"
              onClick={() => setShowLogin(!showLogin)}
            >
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
            onClick={() => setShowLogin(!showLogin)}
          >
            Proceed to login
          </Text>
        </>
      )}
    </Container>
  );
};

export default Login;
