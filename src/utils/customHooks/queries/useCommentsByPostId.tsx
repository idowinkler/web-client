import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { PostEntity } from "../../../types/entities/post";
import { CommentEntity } from "../../../types/entities/comment";
import { getCommentsByPostId } from "../../api/comment";

export const useCommentsByPostId = (postId: PostEntity["_id"] | undefined) => {
  return useQuery<CommentEntity[]>(
    [postId && QUERY_KEYS.COMMENTS_BY_POST(postId)],
    () => getCommentsByPostId(postId)
  );
};
