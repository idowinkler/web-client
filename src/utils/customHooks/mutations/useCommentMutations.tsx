import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import { addComment } from "../../api/comment";
import { CommentEntity } from "../../../types/entities/comment";

export const useCommentMutations = () => {
  const { refetchCommentsByPostId } = useRefetchQueries();
  const addCommentMutation = useMutation(addComment, {
    onSuccess: (data: CommentEntity) => {
        console.log('refetching')
      refetchCommentsByPostId(data.post_id);
    },
  });

  return { addCommentMutation };
};
