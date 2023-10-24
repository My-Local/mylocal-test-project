import {
  Box,
  Button,
  Text,
  Flex,
  IconButton,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import { Post } from "@prisma/client";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { api } from "~/utils/api";

type PostCardProps = {
  post: Post;
  refetchPosts: () => void;
  onEdit: () => void;
  setSelectedPostId: (id: any) => void;
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  refetchPosts,
  onEdit,
  setSelectedPostId,
}) => {
  const upvotePost = api.posts.upvotePost.useMutation();
  const downvotePost = api.posts.downvotePost.useMutation();

  const upvote = async () => {
    await upvotePost.mutateAsync({ id: post.id });
    refetchPosts();
  };

  const downvote = async () => {
    await downvotePost.mutateAsync({ id: post.id });
  };

  const reset = async () => {
    const resetPost = api.posts.resetPost.useMutation();
    await resetPost.mutateAsync({ id: post.id });
  };

  return (
    <Box
      bg={"#ffffff"}
      borderRadius={"4px"}
      borderWidth={"2px"}
      borderTopColor={"#3498db"}
      width={"100%"}
      my={2}
    >
      <Flex direction={"row"} justifyContent={"space-between"}>
        <Text fontSize={"xs"} m={2}>
          {post.createdAt.toISOString()}
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            alignSelf={"flex-end"}
            aria-label="Search database"
            size={"sm"}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            rightIcon={<CiMenuKebab />}
          ></MenuButton>
          <MenuList fontSize={"sm"}>
            <MenuItem
              onClick={() => {
                setSelectedPostId(post.id);
                onEdit();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem>Delete post</MenuItem>
            <MenuItem onClick={reset}>Reset post</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text my={1} textAlign={"center"}>
        {post.content}
      </Text>
      <Flex justifyContent={"space-evenly"} ml={2}>
        <Text mt={2}>{post.upvotes - post.downvotes}</Text>
        <Spacer />
        <IconButton
          bg={"transparent"}
          onClick={() => downvote}
          aria-label="downvote"
          icon={<BsChevronDown />}
        />
        <IconButton
          bg={"transparent"}
          onClick={upvote}
          aria-label="upvote"
          icon={<BsChevronUp />}
        />
      </Flex>
    </Box>
  );
};

export default PostCard;
