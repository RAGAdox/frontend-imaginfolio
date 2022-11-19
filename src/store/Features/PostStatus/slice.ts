import { showNotification } from "@mantine/notifications";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import * as R from "ramda";
import { RootState } from "../../store";
import { getAllInactivePostsApi, getPostStatusApi } from "./api";

export const STATUS_PENDING = "PENDING",
  STATUS_ACTIVE = "ACTIVE",
  STATUS_REJECT = "REJECTED",
  STATUS_CHECKED = "CHECKED";

export interface IPostStatus {
  id: string;
  status:
    | typeof STATUS_PENDING
    | typeof STATUS_ACTIVE
    | typeof STATUS_REJECT
    | typeof STATUS_CHECKED;
}
export interface IPostStatusStore {
  inActivePosts: IPostStatus[] | null;
  initialSet: boolean;
}

const initialState: IPostStatusStore = {
  inActivePosts: null,
  initialSet: true,
};

export const getInactivePosts = createAsyncThunk(
  "postStatus/getInactivePosts",
  async (_, thunkApi) => {
    const {
      auth: { isAuthenticated, currentUser },
    } = thunkApi.getState() as RootState;
    if (isAuthenticated) {
      return getAllInactivePostsApi(currentUser!.username);
    }
  }
);
export const monitorPosts = createAsyncThunk(
  "postStatus/monitorPosts",
  async ({ id }: any, thunkApi) => {
    const {
      auth: { isAuthenticated, currentUser },
    } = thunkApi.getState() as RootState;

    if (isAuthenticated) {
      return getPostStatusApi(currentUser!.username, id);
    }
  }
);

const getStatusChanges = (newState: IPostStatus[], prevState: IPostStatus[]) =>
  R.differenceWith(
    (a: IPostStatus, b: IPostStatus) => a.id === b.id && b.status === a.status,
    newState,
    prevState
  );

export const postStatusStore = createSlice({
  name: "postStatus",
  initialState,
  reducers: {
    cleanup: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInactivePosts.fulfilled, (state, action) => {
      if (action.payload && action.payload.length === 0)
        state.inActivePosts = null;
      else if (action.payload && action.payload.length !== 0) {
        const statusChanges = getStatusChanges(
          action.payload,
          state.inActivePosts ? current(state.inActivePosts) : []
        );
        if (statusChanges && statusChanges.length !== 0) {
          statusChanges.forEach((item: IPostStatus) => {
            if (item.status === STATUS_REJECT && !state.initialSet) {
              showNotification({
                color: "red",
                title: "Unable to create post",
                message: "Post Image could not be uploaded",
              });
            }
          });
        }
        state.inActivePosts = action.payload;
        state.initialSet = false;
      }
    });
  },
});

export const { cleanup: cleanUpPostStatus } = postStatusStore.actions;
export default postStatusStore.reducer;
