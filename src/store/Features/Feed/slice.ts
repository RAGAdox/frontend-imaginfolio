import {
  incrementNavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getFeedApi } from "./api";

export interface IPost {
  src: string;
  creator: string;
  id: string;
  fullName: string;
  caption: string;
  tags: string[];
  likedbyUser: boolean;
  [key: string]: any;
}
export interface IFeed {
  hasMore: boolean;
  pageSize: number;
  pageNumber: number;
  isLoading: boolean;
  postsList: IPost[];
}

const initialState: IFeed = {
  hasMore: true,
  pageSize: 10,
  pageNumber: 0,
  isLoading: false,
  postsList: [],
};

export const getUserFeed = createAsyncThunk(
  "feed/getUserFeed",
  async (_, thunkAPI) => {
    const {
      auth: { isAuthenticated, currentUser },
      feed,
    } = thunkAPI.getState() as RootState;
    if (isAuthenticated) {
      return getFeedApi(currentUser!.username, feed.pageSize, feed.pageNumber);
    }
  }
);
export const feedStore = createSlice({
  name: "feed",
  initialState,
  reducers: {
    incrementPageNumber: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
    cleanUp: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFeed.pending, (state) => {
        state.isLoading = true;
        startNavigationProgress();
      })
      .addCase(getUserFeed.fulfilled, (state, action) => {
        incrementNavigationProgress(100);
        resetNavigationProgress();
        state.isLoading = false;
        if (action.payload.length !== 0) {
          state.postsList = state.postsList.concat(action.payload);
          if (action.payload.length < state.pageSize) state.hasMore = false;
        } else {
          state.hasMore = false;
        }
      });
  },
});
export const { incrementPageNumber, cleanUp: cleanUpFeed } = feedStore.actions;
export default feedStore.reducer;
