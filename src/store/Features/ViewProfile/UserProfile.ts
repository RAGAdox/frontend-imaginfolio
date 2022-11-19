import { IFeed } from "../Feed/slice";
import { IUser } from "../User/User";

interface IFeedUser extends IUser {
  bio?: string;
  avatar?: string;
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
}

export interface IUserProfile {
  user: IFeedUser | null;
  isLoading: boolean;
  feed: IFeed;
  shouldRefreshProfile: boolean;
}
