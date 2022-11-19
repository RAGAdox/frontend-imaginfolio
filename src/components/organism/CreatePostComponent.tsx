import { Button, FileInput, MultiSelect, TextInput } from "@mantine/core";

import { useState } from "react";
import { useAppDispatch } from "../../hooks/stateHooks";
import { generateUserPost } from "../../store/Features/CreatePost/slice";
import { getInactivePosts } from "../../store/Features/PostStatus/slice";
import "./CreatePostComponent.scss";
import ImagePriview from "./ImagePriview";

const CreatePostComponent = ({ onClose = () => {} }: any) => {
  const [step, setStep] = useState<number>(0);
  const [caption, setCaption] = useState<string>("");
  const [tags, setTags] = useState<any[]>([]);
  const [file, setFile] = useState<any>();
  const [finalImage, setFinalImage] = useState<any>();

  const dispatch = useAppDispatch();

  const primaryOnClickHandeler = () => {
    switch (step) {
      case 0:
        setStep(1);
        break;
      case 1:
        setStep(2);
        break;
      case 2:
        dispatch(
          generateUserPost({
            file: finalImage,
            caption,
            tags,
          })
        ).then(() => {
          dispatch(getInactivePosts());
        });
        onClose();
        break;
    }
  };

  return (
    <>
      <div className="createPostContainer disp-f ai-c">
        <div className="w100">
          {(step === 0 || step === 1) && (
            <>
              {file && (
                <ImagePriview
                  file={file}
                  saveImage={setFinalImage}
                  step={step}
                />
              )}
              {!file && (
                <FileInput
                  placeholder="Pick a image"
                  label="Post Image"
                  accept="image/jpeg"
                  onChange={(file: any) => {
                    setFile(file);
                  }}
                  withAsterisk
                />
              )}
            </>
          )}

          {step === 2 && (
            <>
              <TextInput
                placeholder="Enter a caption"
                label="Caption"
                withAsterisk={false}
                value={caption}
                onChange={(event: any) => {
                  if (event.target.value.trim !== "") {
                    setCaption(event.target.value);
                  }
                }}
              />
              <MultiSelect
                data={tags}
                searchable
                creatable
                label="Tags"
                placeholder="Add tags to your post to be highlighted"
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => ({ value: query, label: query })}
                onChange={setTags}
              />
            </>
          )}
        </div>
      </div>
      <div className="disp-f fd-row-reverse cg-1">
        <Button
          disabled={(step === 0 && !file) || (step === 1 && !finalImage)}
          onClick={() => {
            primaryOnClickHandeler();
          }}
        >
          {step !== 2 ? "Next" : "Create Post"}
        </Button>
        <Button
          variant="light"
          color={"gray"}
          onClick={() => {
            alert("Back functionality not ready yet");
          }}
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default CreatePostComponent;
