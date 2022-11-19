import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import generateUserPost from "./Features/CreatePost/slice";
import feed, { IFeed } from "./Features/Feed/slice";
import postStatus, { IPostStatusStore } from "./Features/PostStatus/slice";
import auth, { IProfile } from "./Features/User/slice";
import signup, { ISignUp } from "./Features/UserSignUp/slice";
import viewProfile, { IUserProfile } from "./Features/ViewProfile/slice";

const appReducer = combineReducers({
  auth,
  feed,
  signup,
  viewProfile,
  generateUserPost,
  postStatus,
});

const rootReducer = (
  state:
    | CombinedState<{
        auth: IProfile;
        feed: IFeed;
        signup: ISignUp;
        viewProfile: IUserProfile;
        generateUserPost: any;
        postStatus: IPostStatusStore;
      }>
    | undefined,
  action: AnyAction
) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
