import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetBearerToken, setBearerToken } from "../../../Axios";
import {
  API_STATUS_COMPLETE,
  API_STATUS_PENDING,
  API_STATUS_REJECT,
  API_STATUS_UNSET,
} from "../../../utilities/constants";
import { authenticationApi, getProfileApi } from "./api";
import { IUser } from "./User";

export interface IProfile {
  currentUser: IUser | null;
  authenticationStatus:
    | typeof API_STATUS_PENDING
    | typeof API_STATUS_COMPLETE
    | typeof API_STATUS_UNSET
    | typeof API_STATUS_REJECT;
  isAuthenticated: boolean;
  token: string;
}
const initialState: IProfile = {
  currentUser: null,
  isAuthenticated: false,
  authenticationStatus: API_STATUS_UNSET,
  token: "",
};
export const checkAuthentication = createAsyncThunk(
  "auth/checkAuthentication",
  async () => {
    if (!!localStorage.getItem("token") && !!localStorage.getItem("username")) {
      const { user, token } = await getProfileApi(
        localStorage.getItem("username") || "",
        localStorage.getItem("token") || ""
      );
      return { user, token };
    }
    throw new Error("Authentication Failed");
  }
);
export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async ({ username, password }: any) => {
    const { success, token, user } = await authenticationApi(
      username,
      password
    );
    return { success, token, user };
  }
);

export const profileStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthenticationStatus: (state: IProfile) => {
      state.authenticationStatus = API_STATUS_UNSET;
    },
    logout: (state) => {
      state.authenticationStatus = API_STATUS_UNSET;
      state.isAuthenticated = false;
      state.token = "";
      state.currentUser = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      resetBearerToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.pending, (state, action) => {
        state.authenticationStatus = API_STATUS_PENDING;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        const token = action.payload?.token;
        state.currentUser = { ...action.payload?.user };
        state.authenticationStatus = API_STATUS_COMPLETE;
        state.isAuthenticated = true;
        state.token = token!;
        setBearerToken(token);
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        state.authenticationStatus = API_STATUS_UNSET;
        state.isAuthenticated = false;
      })
      .addCase(authenticateUser.pending, (state, action) => {
        state.authenticationStatus = API_STATUS_PENDING;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        const { success, token, user } = action.payload;
        if (success) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", user.username);
          state.authenticationStatus = API_STATUS_COMPLETE;
          state.isAuthenticated = true;
          state.token = token;
          state.currentUser = user;
          setBearerToken(token);
        } else {
          state.isAuthenticated = false;
          state.authenticationStatus = API_STATUS_REJECT;
        }
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.currentUser = null;
        state.token = "";
        state.isAuthenticated = false;
        state.authenticationStatus = API_STATUS_REJECT;
      });
  },
});
export const { resetAuthenticationStatus, logout } = profileStore.actions;
export default profileStore.reducer;
