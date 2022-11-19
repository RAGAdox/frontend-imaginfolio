import {
  Alert,
  AspectRatio,
  Avatar,
  Card,
  Container,
  SimpleGrid,
  Tabs,
  Text,
  Title,
} from "@mantine/core";

import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ImageWrapper from "../components/atoms/ImageWrapper";
import { useAppDispatch, useAppSelector } from "../hooks/stateHooks";
import { shouldRefreshProfilePage } from "../modals/ShouldRefreshProfilePage";
import { IPost } from "../store/Features/Feed/slice";
import {
  cleanUpPostStatus,
  getInactivePosts,
  IPostStatus,
  STATUS_PENDING,
  STATUS_REJECT,
} from "../store/Features/PostStatus/slice";

import {
  cleanUpProfile,
  getProfileFeed,
  getProfileInfo,
  incrementPageNumber,
  toggleShouldRefreshProfile,
} from "../store/Features/ViewProfile/slice";
import { RootState } from "../store/store";
import { getInitials, sentenceCase } from "../utilities/utilities";
import "./Profile.scss";

const TAB_POSTS = "posts";
const TAB_INTERESTS = "interests";

const Profile = () => {
  const { currentUser } = useAppSelector((state: RootState) => state.auth);
  const { inActivePosts, initialSet } = useAppSelector(
    (state: RootState) => state.postStatus
  );
  const {
    shouldRefreshProfile,
    user,
    isLoading,
    feed: { hasMore, pageSize, pageNumber, postsList },
  } = useAppSelector((state: RootState) => state.viewProfile);

  const monitorInterval = useRef<any>();
  const [pendingPosts, setPendingPosts] = useState<IPostStatus[]>([]);

  const tabValues = [TAB_POSTS, TAB_INTERESTS];
  type TabValueTypes = typeof TAB_POSTS | typeof TAB_INTERESTS;

  const dispatch = useAppDispatch();
  let params = useParams();

  const username = params.username || currentUser?.username;

  const [activeTab, setActiveTab] = useState<TabValueTypes>(TAB_POSTS);

  useEffect(() => {
    if (shouldRefreshProfile)
      dispatch(getProfileFeed({ username })).then(() =>
        dispatch(toggleShouldRefreshProfile())
      );
  }, [shouldRefreshProfile]);

  // GET PROFILE INFO
  useEffect(() => {
    dispatch(getProfileInfo({ username }));
    return () => {
      dispatch(cleanUpProfile());
    };
  }, [dispatch, username]);

  // GET PORFILE POSTS WITH INFINITE SCROLL
  useEffect(() => {
    if (user) {
      dispatch(getProfileFeed({ username }));
    }
  }, [pageNumber, pageSize, user, username]);

  // GET PENDING POSTS onPageLoad and changes value to a non null value on with we can monitor
  useEffect(() => {
    if (user && currentUser && currentUser.username === user.username) {
      dispatch(getInactivePosts());
    }
  }, [user]);

  useEffect(() => {
    let isReduced = false;
    setPendingPosts((prevPendingPost: IPostStatus[]) => {
      const newPendingPost = (inActivePosts || []).filter(
        (postStatus: IPostStatus) => postStatus.status === STATUS_PENDING
      );
      if (newPendingPost.length < prevPendingPost.length)
        shouldRefreshProfilePage();

      return newPendingPost;
    });
    if (
      inActivePosts &&
      inActivePosts.length !== 0 &&
      !monitorInterval.current
    ) {
      monitorInterval.current = setInterval(
        () => dispatch(getInactivePosts()),
        10000
      );
    }
    if (
      !inActivePosts ||
      inActivePosts.every((item: IPostStatus) => item.status === STATUS_REJECT)
    ) {
      clearInterval(monitorInterval.current);
      monitorInterval.current = null;
    }
  }, [inActivePosts]);

  useEffect(() => {
    return () => {
      clearInterval(monitorInterval.current);
      monitorInterval.current = null;
      dispatch(cleanUpPostStatus());
    };
  }, []);

  return (
    <>
      {user && (
        <Container fluid size="xs" className="disp-f fd-col rg-1 ai-c">
          <div className="disp-f fd-col rg-1">
            <div className="disp-f fd-row jc-sb">
              <Avatar
                src={user?.avatar}
                radius="xl"
                variant="outline"
                size={"lg"}
                alt={user?.username}
              >
                {getInitials(user?.fullName || "")}
              </Avatar>
              <div className="disp-f fd-col ai-f-e word-break">
                <Text size={"lg"}>{user?.username}</Text>
                <Text size={"md"}>{user?.fullName}</Text>
                <Text size={"sm"}>{user?.bio}</Text>
              </div>
            </div>
            <div className="disp-f fd-row jc-sb cg-2">
              <div className="disp-f fd-col ai-c">
                <Text size={"md"}>Posts</Text>
                <Text>{user.postCount}</Text>
              </div>
              <div className="disp-f fd-col ai-c">
                <Text size={"md"}>Followers</Text>
                <Text>{user?.followerCount}</Text>
              </div>
              <div className="disp-f fd-col ai-c">
                <Text size={"md"}>Following</Text>
                <Text>{user?.followingCount}</Text>
              </div>
            </div>
          </div>

          <Tabs
            variant="outline"
            color={"teal"}
            orientation="horizontal"
            className="w100"
            value={activeTab}
            onTabChange={(value: TabValueTypes) => {
              setActiveTab(value);
            }}
          >
            <Tabs.List className="cg-2 p-i-1">
              {tabValues.map((value: string, index: number) => {
                return (
                  <Tabs.Tab key={index} value={value} color="cyan">
                    {sentenceCase(value)}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
            {activeTab === tabValues[0] && (
              <>
                {pendingPosts && pendingPosts.length !== 0 && (
                  <Alert
                    title="Posts are pending to be uploaded"
                    className="mt-1"
                    radius="md"
                    variant="outline"
                  >
                    {pendingPosts.length > 1
                      ? `${pendingPosts.length} posts are `
                      : `A post is `}
                    currently being uploaded and processed on. You will be
                    notified once the upload is finished
                  </Alert>
                )}
                <InfiniteScroll
                  next={() => dispatch(incrementPageNumber())}
                  hasMore={hasMore}
                  loader={<Text align="center">Loading</Text>}
                  refreshFunction={() => dispatch(getProfileFeed({ username }))}
                  dataLength={(postsList || []).length}
                  pullDownToRefresh
                  endMessage={
                    <>
                      <Title align="center" variant="gradient" order={3}>
                        You have watched it all
                      </Title>
                      <Title align="center" order={5}>
                        Come back later to view more
                      </Title>
                    </>
                  }
                >
                  <SimpleGrid
                    breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                    cols={3}
                    className="ai-c m-1"
                  >
                    {postsList.map((post: IPost, index: number) => (
                      <Card
                        key={index}
                        shadow={"lg"}
                        radius="md"
                        mb="md"
                        className="profilePostCards"
                      >
                        <AspectRatio ratio={post.width / post.height}>
                          <ImageWrapper
                            width={post.width}
                            height={post.height}
                            blurImage={post.blurImage}
                            src={post.src}
                          />
                        </AspectRatio>
                      </Card>
                    ))}
                  </SimpleGrid>
                </InfiniteScroll>
              </>
            )}
            {activeTab === tabValues[1] && <p>Interesrs are in dev</p>}
          </Tabs>
        </Container>
      )}
    </>
  );
};

export default Profile;
