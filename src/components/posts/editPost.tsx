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

type EditPostProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  refetchPosts: () => void;
  post_id: number | null;
};

const EditPost: React.FC<EditPostProps> = ({
  isOpen,
  onClose,
  onOpen,
  refetchPosts,
  post_id,
}) => {
  const [editingPost, setCreatingPost] = useState(false);
  const editPost = api.posts.editPost.useMutation();
  const [postContent, setPostContent] = useState("");

  const { data: post } = api.posts.getPost.useQuery({ id: post_id });

  const addNewPost = async () => {
    setCreatingPost(true);
    await editPost.mutateAsync({
      id: post_id,
      content: postContent,
      updatedAt: new Date().toISOString(),
    });
    refetchPosts();
    setCreatingPost(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            alignSelf={"flex-start"}
            borderRadius={"4px"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box justifySelf={"flex-start"}>
              <Textarea
                defaultValue={post?.content}
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
            isLoading={editingPost}
            bg={"#3498db"}
            color={"white"}
            borderRadius={"4px"}
            onClick={addNewPost}
          >
            Edit Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPost;
