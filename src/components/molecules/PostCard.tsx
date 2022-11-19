import { AspectRatio, Badge, Card, Grid, Text } from "@mantine/core";
import {
  IconBookmark,
  IconHeart,
  IconHeartPlus,
  IconMessagePlus,
  IconShare,
} from "@tabler/icons";
import React, { useState } from "react";
import { IPost } from "../../store/Features/Feed/slice";
import IconButton from "../atoms/IconButton";
import ImageWrapper from "../atoms/ImageWrapper";
import "./PostCard.scss";

const PostCard = ({
  id,
  src,
  creator,
  fullName,
  caption,
  tags,
  likedbyUser,
  width,
  height,
  blurImage,
  onClick = () => {},
  isProfilePost = false,
}: IPost) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // useEffect(() => {
  //   const pixels = decode(blurImage, 32, 32);

  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   const imageData = ctx!.createImageData(width, height);
  //   imageData.data.set(pixels);
  //   ctx!.putImageData(imageData, 0, 0);
  //   //document.body.append(canvas);
  //   document.getElementById(`${id}-blur-container`)?.append(canvas);
  // }, [isLoaded]);

  return (
    <>
      {/* <Container size="xs" px={0}> */}
      <Card shadow="lg" radius="md" mb="md" className="post-card">
        <AspectRatio ratio={width / height}>
          <ImageWrapper
            width={width}
            height={height}
            blurImage={blurImage}
            src={src}
          />
        </AspectRatio>
        {!isProfilePost && (
          <Card.Section p="sm">
            <Grid>
              <Grid.Col span={3} className="disp-f jc-c">
                {likedbyUser ? (
                  <IconButton Icon={() => <IconHeartPlus />} />
                ) : (
                  <IconButton
                    className="icon-fill"
                    Icon={() => <IconHeart />}
                  />
                )}
              </Grid.Col>
              <Grid.Col span={3} className="disp-f jc-c">
                <IconButton Icon={() => <IconMessagePlus />} />
              </Grid.Col>
              <Grid.Col span={3} className="disp-f jc-c">
                <IconButton Icon={() => <IconShare />} />
              </Grid.Col>
              <Grid.Col span={3} className="disp-f jc-c">
                <IconButton Icon={() => <IconBookmark />} />
              </Grid.Col>
            </Grid>
          </Card.Section>
        )}
        <Card.Section p="sm">
          <Text
            size="md"
            lineClamp={4}
            color="dimmed"
            span
            className="select-none"
          >
            {fullName && (
              <Text
                span
                mr="xs"
                variant="gradient"
                weight="bold"
                transform="capitalize"
              >
                {fullName.toLowerCase()}
              </Text>
            )}
            {caption}
          </Text>
          <div className="disp-f fd-row flex-wrap cg-1">
            {tags &&
              tags.map((tagText: string, index: number) => (
                <Badge key={index} variant="gradient" mt="sm">
                  {tagText}
                </Badge>
              ))}
          </div>
        </Card.Section>
      </Card>
      {/* </Container> */}
    </>
  );
};

export default React.memo(PostCard);
