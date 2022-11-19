import { showNotification } from "@mantine/notifications";
import {
  resetNavigationProgress,
  setNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchUserDetails, fetchUserPosts } from "./api";
import { IUserProfile } from "./UserProfile";

const initialState: IUserProfile = {
  feed: {
    hasMore: true,
    pageSize: 10,
    pageNumber: 0,
    isLoading: false,
    postsList: [],
  },
  shouldRefreshProfile: false,
  isLoading: false,
  user: null,
};

export const getProfileInfo = createAsyncThunk(
  "profile/getUserInfo",
  async ({ username }: any) => {
    return fetchUserDetails(username);
  }
);

export const getProfileFeed = createAsyncThunk(
  "profile/getUserPosts",
  async ({ username }: any, thunkAPI) => {
    const {
      viewProfile: { user, feed },
    } = thunkAPI.getState() as RootState;
    if (user) {
      const { pageNumber, pageSize } = feed;
      return fetchUserPosts({ username, pageNumber, pageSize });
    }
  }
);

export const viewProfileStore = createSlice({
  name: "profile",
  initialState,
  reducers: {
    cleanUp: (state) => {
      return initialState;
    },
    incrementPageNumber: (state) => {
      state.feed.pageNumber = state.feed.pageNumber + 1;
    },
    refreshProfile: (state) => {
      state.feed = initialState.feed;
      state.shouldRefreshProfile = true;
    },
    toggleShouldRefreshProfile: (state) => {
      state.shouldRefreshProfile = !state.shouldRefreshProfile;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInfo.pending, (state, action) => {
        state.isLoading = true;
        startNavigationProgress();
      })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        setNavigationProgress(100);
        resetNavigationProgress();
      })
      .addCase(getProfileInfo.rejected, (state, action) => {
        state.isLoading = false;
        resetNavigationProgress();
        showNotification({
          title: "User not found",
          color: "red",
          message: `Could not find ${action.meta.arg.username}`,
        });
      })
      .addCase(getProfileFeed.pending, (state, action) => {
        state.feed.isLoading = true;
        startNavigationProgress();
      })
      .addCase(getProfileFeed.fulfilled, (state, action) => {
        state.feed.isLoading = false;
        setNavigationProgress(100);
        resetNavigationProgress();
        if (
          action.payload.length !== 0 &&
          (state.feed.pageNumber + 1) * state.feed.pageSize >=
            state.feed.postsList.length
        ) {
          state.feed.postsList =
            state.feed.pageNumber === 0
              ? action.payload || []
              : state.feed.postsList.concat(action.payload);
          if (action.payload.length < state.feed.pageSize)
            state.feed.hasMore = false;
        } else {
          state.feed.hasMore = false;
        }
      });
  },
});
export type { IUserProfile };
export const {
  incrementPageNumber,
  cleanUp: cleanUpProfile,
  refreshProfile,
  toggleShouldRefreshProfile,
} = viewProfileStore.actions;
export default viewProfileStore.reducer;
