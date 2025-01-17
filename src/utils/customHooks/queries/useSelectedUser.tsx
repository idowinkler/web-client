import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { useSelectedUserId } from "../../../components/SelectedUserContext/SelectedUserContext";
import { getUserById } from "../../api/user";
import { UserEntity } from "../../../types/entities/user";

export const useSelectedUser = () => {
  const { selectedUserId } = useSelectedUserId();

  return useQuery<UserEntity | undefined>(
    [QUERY_KEYS.USER_BY_ID(selectedUserId || "")],
    () => getUserById(selectedUserId),
    {
      keepPreviousData: true,
    }
  );
};
