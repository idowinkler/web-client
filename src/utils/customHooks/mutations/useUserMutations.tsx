import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../api/user";
import { useRefetchQueries } from "../queries/useRefetchQueries";

export const useUserMutations = () => {
  const { refetchUserById, refetchPosts } = useRefetchQueries();
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: (data) => {
      refetchUserById(data._id);
      refetchPosts();
    },
  });

  return { updateUserMutation };
};
