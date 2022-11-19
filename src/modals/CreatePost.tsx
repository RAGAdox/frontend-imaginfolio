import { Modal, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import CreatePostComponent from "../components/organism/CreatePostComponent";
import "./CreatePost.scss";
export const openCreatePostModal = () => {
  return openModal({
    fullScreen: true,
    className: "h100",
    title: (
      <Title variant="gradient" order={3}>
        Create Post
      </Title>
    ),
    children: <CreatePostComponent />,
    centered: true,
    size: "lg",
  });
};

const CreatePost = ({ open, setOpen = () => {} }: any) => {
  return (
    <Modal
      id="create-post-modal"
      opened={open}
      onClose={() => {
        setOpen(false);
      }}
      fullScreen
      title={
        <Title variant="gradient" order={3}>
          Create Post
        </Title>
      }
    >
      <CreatePostComponent onClose={()=>{setOpen(false)} } />
    </Modal>
  );
};

export default CreatePost;
