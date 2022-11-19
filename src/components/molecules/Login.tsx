/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Container,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";
import {
  authenticateUser,
  resetAuthenticationStatus,
} from "../../store/Features/User/slice";
import { RootState } from "../../store/store";
import {
  API_STATUS_COMPLETE,
  API_STATUS_REJECT,
} from "../../utilities/constants";

const Login = ({ isModal = false, onSuccess = () => {} }) => {
  //HOOK VARIABLES
  const dispatch = useAppDispatch();

  //REDUX STORE VARIABLES
  const authenticationStatus = useAppSelector(
    (state: RootState) => state.auth.authenticationStatus
  );

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  //LOCAL STATES
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //FUNCTIONS USED AS PROPS
  const onUsernameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    []
  );

  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const onLogin = useCallback(() => {
    dispatch(authenticateUser({ username, password }));
  }, [username, password]);

  // STATE CHANGE LISTENERS HOOKS
  useEffect(() => {
    if (authenticationStatus === API_STATUS_REJECT)
      dispatch(resetAuthenticationStatus());
  }, [username, password]);

  useEffect(() => {
    if (isAuthenticated && authenticationStatus === API_STATUS_COMPLETE) {
      showNotification({
        title: "User Authentication",
        message: "You have successfully logged into the application",
      });
      onSuccess();
    }
    if (authenticationStatus === API_STATUS_REJECT) {
      showNotification({
        title: "User Authentication",
        color: "red",
        message: "Invalid Username/Password",
      });
    }
  }, [isAuthenticated, authenticationStatus]);

  return (
    <>
      <TextInput
        pb="xs"
        label="Email/Username"
        placeholder="Enter email or username"
        withAsterisk
        error={authenticationStatus === API_STATUS_REJECT}
        value={username}
        onChange={onUsernameChange}
        data-autofocus
      />
      <PasswordInput
        pb="xs"
        label="Password"
        placeholder="Enter password"
        withAsterisk
        error={authenticationStatus === API_STATUS_REJECT}
        value={password}
        onChange={onPasswordChange}
      />

      <Text size="sm" color="red">
        {authenticationStatus === API_STATUS_REJECT
          ? "Invalid Credentials Provided"
          : "  "}
      </Text>
      <Container className="disp-f fd-row cg-1 m-i-0 p-i-0" mt="md" pl={0}>
        <Button fullWidth={!isModal} variant="gradient" onClick={onLogin}>
          Submit
        </Button>
        {isModal && (
          <Button variant="outline" color="dark">
            Cancel
          </Button>
        )}
      </Container>
    </>
  );
};

export default Login;
