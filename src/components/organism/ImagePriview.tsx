import { SegmentedControl } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./CanvarPreview";
import "./imagePreview.scss";
import { useDebounceEffect } from "./useDebounceEffect";
const aspectRatioSupported = [
  { label: "16:9", value: (16 / 9).toString() },
  { label: "4:3", value: (4 / 3).toString() },
  { label: "1:1", value: (1).toString() },
  { label: "9:16", value: (9 / 16).toString() },
  { label: "3:4", value: (3 / 4).toString() },
];

const ImagePriview = ({ file, saveImage, step = 0 }: any) => {
  const [imgUrl, setImgUrl] = useState("");
  const [aspectRatioSegmentValue, setAspectRatioSegmentValue] = useState(
    aspectRatioSupported[0].value
  );
  const [generatedFile, setGeneratedFile] = useState<any>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [isEditCompleted, setIsEditCompleted] = useState<boolean>(false);
  const [isCanvasLoading, setIsCanvasLoading] = useState<boolean>(false);

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }
  useEffect(() => {
    setImgUrl(URL.createObjectURL(file));
  }, [file]);
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  useDebounceEffect(
    async () => {
      if (
        crop &&
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate, aspect]
  );

  useEffect(() => {
    if (step === 1) {
      if (previewCanvasRef.current)
        previewCanvasRef.current.toBlob((blob: any) => {
          saveImage(new File([blob as Blob], "image.jpeg"), "image/jpeg", 0.1);
        });
    }
  }, [step]);

  return (
    <>
      <div className={step !== 0 ? "disp-n" : "disp-f fd-col ai-c"}>
        <>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => {
              setCrop(percentCrop);
            }}
            onComplete={(c) => {
              setCompletedCrop(c);
            }}
            aspect={aspect}
          >
            <div className="imageCropWrapper">
              <img ref={imgRef} src={imgUrl} alt="test" onLoad={onImageLoad} />
            </div>
          </ReactCrop>
          <SegmentedControl
            className="aspectRatioContainer"
            value={aspectRatioSegmentValue}
            data={aspectRatioSupported}
            onChange={async (value: string) => {
              let data = parseFloat(value);
              if (data) {
                setAspectRatioSegmentValue(value);
                if (imgRef.current) {
                  const { width, height } = imgRef.current;
                  setAspect(data);

                  setCrop(
                    convertToPixelCrop(
                      centerAspectCrop(width, height, data),
                      width,
                      height
                    )
                  );
                }
              }
            }}
          />
        </>
      </div>
      <>
        <div className="previewCroppedImage disp-f jc-c">
          {!!completedCrop && (
            <>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width:
                    crop && crop.unit === "px"
                      ? crop.width
                      : completedCrop.width,
                  height:
                    crop && crop.unit === "px"
                      ? crop.height
                      : completedCrop.height,

                  display: step === 0 ? "none" : "initial",
                }}
              />
            </>
          )}
        </div>
      </>
    </>
  );
};

export default ImagePriview;
