import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import { addPost, deletePost, updatePost } from "../../api/post";

export const usePostMutations = () => {
  const { refetchPosts } = useRefetchQueries();
  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      refetchPosts();
    },
  });

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      refetchPosts();
    },
  });

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      refetchPosts();
    },
  });

  return { addPostMutation, updatePostMutation, deletePostMutation };
};
