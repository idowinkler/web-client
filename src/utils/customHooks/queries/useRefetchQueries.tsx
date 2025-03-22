import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { UserEntity } from "../../../types/entities/user";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { PostEntity } from "../../../types/entities/post";

export const useRefetchQueries = () => {
  const queryClient = useQueryClient();

  const refetchQuery = (queryKey: QueryKey) =>
    queryClient.invalidateQueries(queryKey);

  const refetchUserById = (userId: UserEntity["_id"]) =>
    refetchQuery([QUERY_KEYS.USER_BY_ID(userId)]);
  const refetchPosts = () => refetchQuery([QUERY_KEYS.POSTS]);
  const refetchPostsByUser = (userId: UserEntity["_id"]) =>
    refetchQuery([QUERY_KEYS.POSTS_BY_USER(userId)]);
  const refetchCommentsByPostId = (postId: PostEntity["_id"]) =>
    refetchQuery([QUERY_KEYS.COMMENTS_BY_POST(postId)]);

  return {
    refetchUserById,
    refetchPosts,
    refetchCommentsByPostId,
    refetchPostsByUser,
  };
};
