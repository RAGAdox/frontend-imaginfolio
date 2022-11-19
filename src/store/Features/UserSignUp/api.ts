import validator from "validator";
import axios from "../../../Axios";
import { sentenceCase } from "../../../utilities/utilities";
import { IUserSignUp } from "../User/User";
const R = require("ramda");
export const validate = (value: string, key: string) => {
  if (R.isEmpty(value.trim())) {
    return ` ${sentenceCase(key)} cannot be empty`;
  }
  switch (key) {
    case "username":
      if (!validator.isAlphanumeric(value))
        return ` ${sentenceCase(key)} can only contain alphabets and numbers`;
      if (value.length < 5)
        return ` ${sentenceCase(key)} cannot be less than 5 characters`;
      break;
    case "email":
      if (!validator.isEmail(value)) return ` Enter a valid email`;
      break;
    case "password":
    case "confPassword":
      if (!validator.isStrongPassword(value))
        return ` Please use a strong password`;
      break;
  }
  return "";
};
export const validateUser = (userSignUpData: IUserSignUp) => {
  let data = {};
  let result = true;
  Object.keys(userSignUpData).forEach((key: string) => {
    const errorMsg = validate(
      userSignUpData[key as keyof typeof userSignUpData],
      key
    );
    if (errorMsg !== "") result = false;
    data = {
      ...data,
      [key]: errorMsg,
    };
  });
  return { result, error: data };
};
export const createUserApi = async (userSignUpData: IUserSignUp) => {
  return axios
    .post("auth/signup", {
      ...userSignUpData,
    })
    .then((res) => {
      return {success:res.data.success,message:res.data.message};
    });
};
