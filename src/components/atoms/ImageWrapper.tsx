import { Image, Skeleton } from "@mantine/core";
import React, { useState } from "react";
import { Blurhash } from "react-blurhash";
import "./ImageWrapper.scss";
const ImageWrapper = ({
  src,
  blurImage,
  width,
  height,
  ...imageProps
}: any) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <>
      <div className="imageContainer">
        {!isLoaded &&
          (blurImage ? (
            <Blurhash
              hash={blurImage}
              width={width}
              height={height}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          ) : (
            <Skeleton></Skeleton>
          ))}
      </div>
      <Image
        src={src}
        height={height}
        width={width}
        onLoad={() => setIsLoaded(true)}
        className={!isLoaded ? "hidden" : "visible"}
        {...imageProps}
      />
    </>
  );
};
export default React.memo(ImageWrapper);
