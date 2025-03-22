import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getPosts, getPostsByUserId } from "../../api/post";

export const usePosts = (userId?: string) => {
  return useInfiniteQuery({
    queryKey: userId ? [QUERY_KEYS.POSTS_BY_USER(userId)] : [QUERY_KEYS.POSTS],
    queryFn: ({ pageParam = 1 }) =>
      userId ? getPostsByUserId(pageParam, userId) : getPosts(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });
};
