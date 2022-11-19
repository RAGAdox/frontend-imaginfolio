import { showNotification } from "@mantine/notifications";
import {
  incrementNavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { generateUserPostApi, getPostStatusApi } from "./api";
const STATUS_PENDING = "PENDING",
  STATUS_ACTIVE = "ACTIVE",
  STATUS_REJECT = "REJECTED";

export interface IPostStatus {
  id: string;
  status: typeof STATUS_PENDING | typeof STATUS_ACTIVE | typeof STATUS_REJECT;
}
const initialState = {
  file: null,
  tags: "",
  caption: "",
  monitorPosts: null as IPostStatus[] | null,
};

export const generateUserPost = createAsyncThunk(
  "createPost/generateUserPost",
  async ({ file, caption, tags }: any, thunkApi) => {
    const {
      auth: { isAuthenticated, currentUser },
    } = thunkApi.getState() as RootState;
    if (isAuthenticated) {
      //TRIGER API FOR GENERATING POST
      return generateUserPostApi(currentUser!.username, file, tags, caption);
    }
  }
);

export const getPostStatus = createAsyncThunk(
  "createPost/generateUserPost",
  async ({ id }: any, thunkApi) => {
    const {
      auth: { isAuthenticated, currentUser },
    } = thunkApi.getState() as RootState;
    if (isAuthenticated) {
      return getPostStatusApi(currentUser!.username, id);
    }
  }
);

export const createPost = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    updateFile: (state, action) => {
      state.file = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateUserPost.pending, (state) => {
        startNavigationProgress();
        return;
      })
      .addCase(generateUserPost.fulfilled, (state, action) => {
        incrementNavigationProgress(100);
        showNotification({
          title: "Post Created",
          message: `Post created succesfully.\nYour post will be made available to all the users in a little while.`,
        });
        state.monitorPosts = [
          ...(state.monitorPosts || []),
          { id: action.payload?.data.postId, status: STATUS_PENDING },
        ];
      })
      .addCase(generateUserPost.rejected, (state) => {
        resetNavigationProgress();
        showNotification({
          title: "Post not created",
          color: "red",
          message: `Could not create post .\nPlease try again`,
        });
        return;
      });
  },
});

export const { updateFile } = createPost.actions;
export default createPost.reducer;
