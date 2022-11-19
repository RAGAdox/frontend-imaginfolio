import { Card } from "@mantine/core";
import React from "react";
import { IPost } from "../../store/Features/Feed/slice";
import ImageWrapper from "../atoms/ImageWrapper";

const Post = ({
  src,
  creator,
  fullName,
  caption,
  tags,
  likedbyUser,
  onClick = () => {},
}: IPost) => {
  return (
    <Card shadow="sm" radius="md" onClick={onClick}>
      <ImageWrapper src={src} />
    </Card>
  );
};
export default React.memo(Post);
