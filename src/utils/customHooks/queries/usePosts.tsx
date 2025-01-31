import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getPosts, getPostsByUserId } from "../../api/post";
import { PostEntity } from "../../../types/entities/post";

export const usePosts = (userId: string | undefined) => {
  return useQuery<PostEntity[]>(
    [QUERY_KEYS.POSTS, userId && QUERY_KEYS.POSTS_BY_USER(userId)],
    () => (userId ? getPostsByUserId(userId) : getPosts()),
    {
      keepPreviousData: true,
    }
  );
};
