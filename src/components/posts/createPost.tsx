import {
  Box,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { useState } from "react";

type CreatePostProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  refetchPosts: () => void;
};

const CreatePost: React.FC<CreatePostProps> = ({
  isOpen,
  onClose,
  onOpen,
  refetchPosts,
}) => {
  const [creatingPost, setCreatingPost] = useState(false);
  const createPost = api.posts.createPost.useMutation();
  const [postContent, setPostContent] = useState("");

  const addNewPost = async () => {
    setCreatingPost(true);
    await createPost.mutateAsync({
      content: postContent,
      status: "published",
    });
    refetchPosts();
    setCreatingPost(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onOverlayClick={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            // mt={2}
            alignSelf={"flex-start"}
            borderRadius={"4px"}
            // padding={4}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box justifySelf={"flex-start"}>
              <Textarea
                bg={"#d1d1d1"}
                borderRadius={"4px"}
                padding={1}
                onChange={(e) => setPostContent(e.currentTarget.value)}
              />
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            borderRadius={"4px"}
            mr={4}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            isLoading={creatingPost}
            bg={"#3498db"}
            color={"white"}
            borderRadius={"4px"}
            onClick={addNewPost}
          >
            Create Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePost;
