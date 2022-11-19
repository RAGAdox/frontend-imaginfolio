import { decode } from "blurhash";
import { useLayoutEffect, useState } from "react";

// modified from https://gist.github.com/WorldMaker/a3cbe0059acd827edee568198376b95a
// https://github.com/woltapp/react-blurhash/issues/3
export function useBlurhash(blurhash, width, height, punch) {
  punch = punch || 1;

  const [url, setUrl] = useState(null);

  useLayoutEffect(() => {
    let isCancelled = false;
    if (!blurhash || !width || !height) return;

    // decode hash

    const pixels = decode(blurhash, width, height, punch);
    // temporary canvas to create a blob from decoded ImageData
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    const imageData = context.createImageData(width, height);
    imageData.data.set(pixels);
    context.putImageData(imageData, 0, 0);
    canvas.toBlob((blob) => {
      if (!isCancelled) {
        setUrl((oldUrl) => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl);
          }
          return URL.createObjectURL(blob);
        });
      }
    });

    return function cleanupBlurhash() {
      isCancelled = true;
      setUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        return null;
      });
    };
  }, [blurhash, height, width, punch]);

  return url;
}
