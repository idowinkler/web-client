import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { UserEntity } from "../../../types/entities/user";
import { QUERY_KEYS } from "../../../constants/QueryKeys";

export const useRefetchQueries = () => {
  const queryClient = useQueryClient();

  const refetchQuery = (queryKey: QueryKey) =>
    queryClient.invalidateQueries(queryKey);

  const refetchUserById = (userId: UserEntity["_id"]) =>
    refetchQuery([QUERY_KEYS.USER_BY_ID(userId)]);
  const refetchPosts = () => refetchQuery([QUERY_KEYS.POSTS]);

  return { refetchUserById, refetchPosts };
};
