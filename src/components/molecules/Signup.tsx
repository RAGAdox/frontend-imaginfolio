import { Button, Container, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";
import { IUserSignUp } from "../../store/Features/User/User";
import {
  createUser,
  validateValue,
} from "../../store/Features/UserSignUp/slice";
import { RootState } from "../../store/store";
import {
  API_STATUS_COMPLETE,
  API_STATUS_REJECT,
} from "../../utilities/constants";
import Input from "../atoms/TextInput";
const Signup = ({ isModal = false }) => {
  const [user, setUser] = useState<IUserSignUp>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const { error, status } = useAppSelector((state: RootState) => state.signup);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === API_STATUS_COMPLETE) {
      showNotification({
        title: "User Creation",
        message:
          "You have successfully created an accout with us. Proceed to login",
      });
    } else if (status === API_STATUS_REJECT) {
      showNotification({
        title: "User Creation",
        color: "red",
        message: "Unable to create user. Please check details provided",
      });
    }
  }, [status]);

  const handelChange = (value: string, key: keyof IUserSignUp) => {
    setUser((userState) => ({ ...userState, [key]: value }));
  };

  return (
    <>
      <Input
        pb="xs"
        label="Full Name"
        placeholder="Enter fullName"
        withAsterisk
        name="fullName"
        value={user.fullName}
        handelChange={(value: string) => handelChange(value, "fullName")}
        validateChange={(value: string) => {
          dispatch(validateValue({ value, key: "fullName" }));
        }}
        error={error ? error.fullName : false}
        spellCheck={false}
      />
      <Input
        pb="xs"
        label="Username"
        placeholder="Enter username"
        withAsterisk
        value={user.username}
        handelChange={(value: string) => handelChange(value, "username")}
        validateChange={(value: string) => {
          dispatch(validateValue({ value, key: "username" }));
        }}
        error={error ? error.username : false}
        spellCheck={false}
      />
      <Input
        pb="xs"
        label="Email"
        placeholder="Enter email address"
        withAsterisk
        value={user.email}
        handelChange={(value: string) => handelChange(value, "email")}
        validateChange={(value: string) => {
          dispatch(validateValue({ value, key: "email" }));
        }}
        error={error ? error.email : false}
        spellCheck={false}
      />
      <Input
        pb="xs"
        label="Password"
        placeholder="Enter password"
        withAsterisk
        type="password"
        value={user.password}
        handelChange={(value: string) => handelChange(value, "password")}
        validateChange={(value: string) => {
          dispatch(validateValue({ value, key: "password" }));
        }}
        error={error ? error.password : false}
        spellCheck={false}
      />
      <Input
        pb="xs"
        label="Confirm Password"
        placeholder="Enter password again"
        withAsterisk
        type="password"
        value={user.confPassword}
        handelChange={(value: string) => handelChange(value, "confPassword")}
        validateChange={(value: string) => {
          dispatch(validateValue({ value, key: "confPassword" }));
        }}
        spellCheck={false}
        error={error ? error.confPassword : false}
      />
      <Container className="disp-f fd-row cg-1 m-i-0 p-i-0" mt="md" pl={0}>
        <Button
          fullWidth={!isModal}
          variant="gradient"
          onClick={() => {
            dispatch(createUser(user));
          }}
        >
          Sign Up
        </Button>
        {status === API_STATUS_REJECT && (
          <Text pt="xs" color="red" size="sm">
            Unable to create user .Please check details entered
          </Text>
        )}
      </Container>
    </>
  );
};

export default Signup;
