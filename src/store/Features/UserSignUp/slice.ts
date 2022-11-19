import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  API_STATUS_COMPLETE,
  API_STATUS_PENDING,
  API_STATUS_REJECT,
  API_STATUS_UNSET,
} from "../../../utilities/constants";
import { IUserSignUp } from "../User/User";
import { createUserApi, validate, validateUser } from "./api";

export interface ISignUp {
  error: IUserSignUp;
  status:
    | typeof API_STATUS_UNSET
    | typeof API_STATUS_PENDING
    | typeof API_STATUS_COMPLETE
    | typeof API_STATUS_REJECT;
}
interface IUserSignUpKeyValue {
  value: string;
  key: keyof IUserSignUp;
}
export const createUser = createAsyncThunk(
  "profile/createUser",
  async (userSignUpData: IUserSignUp, thunkApi) => {
    const { result, error } = validateUser(userSignUpData);
    if (!result) {
      return thunkApi.rejectWithValue(error);
    }
    const { success, message } = await createUserApi(userSignUpData);
    return { success, message };
  }
);
const initialState: ISignUp = {
  error: {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confPassword: "",
  },
  status: API_STATUS_UNSET,
};

export const userSignUp = createSlice({
  name: "signup",
  initialState,
  reducers: {
    validateValue: (state, action: PayloadAction<IUserSignUpKeyValue>) => {
      const errorMsg = validate(action.payload.value, action.payload.key);
      state.error[action.payload.key] = errorMsg;
    },
    reset: (state, action: PayloadAction<keyof IUserSignUp>) => {
      if (state.error) state.error[action.payload] = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = API_STATUS_PENDING;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = API_STATUS_COMPLETE;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = API_STATUS_REJECT;
        if (action.payload) state.error = action.payload as IUserSignUp;
      });
  },
});
export const { reset, validateValue } = userSignUp.actions;
export default userSignUp.reducer;
