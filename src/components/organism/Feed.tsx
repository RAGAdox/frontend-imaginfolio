import { Container, Text, Title } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Feed.scss";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";
import {
  getUserFeed,
  incrementPageNumber,
  IPost,
} from "../../store/Features/Feed/slice";
import { RootState } from "../../store/store";
import PostCard from "../molecules/PostCard";

const Feed = () => {
  const { hasMore, pageNumber, postsList } = useAppSelector(
    (state: RootState) => state.feed
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasMore) dispatch(getUserFeed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const handelNext = () => {
    if (hasMore) dispatch(incrementPageNumber());
  };
  return (
    <>
      {
        <div>
          <InfiniteScroll
            dataLength={postsList.length}
            hasMore={hasMore}
            next={handelNext}
            loader={<Text align="center">Loading</Text>}
            refreshFunction={() => dispatch(getUserFeed())}
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
            <Container className="grid-container">
              {postsList.map((post: IPost, index: number) => (
                <PostCard key={index} {...post} />
              ))}
            </Container>
          </InfiniteScroll>
        </div>
      }
    </>
  );
};

export default React.memo(Feed);
