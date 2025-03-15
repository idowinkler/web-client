import { CommentEntity } from "../../types/entities/comment";
import { PostEntity } from "../../types/entities/post";
import { UserEntity } from "../../types/entities/user";
import { fetchRequest } from "../fetch";

export const getPosts = async () => {
  const posts = await fetchRequest(`/post`, { method: "GET" });

  return posts;
};

export const getCommentsByPostId = async (
  postId: PostEntity["_id"] | undefined
) => {
  const comments = postId
    ? await fetchRequest(`/comment?postId=${postId}`, {
        method: "GET",
      })
    : [];

  return comments;
};

export const addComment = async (
  comment: Omit<CommentEntity, "_id" | "user_id">
) => {
  const newComment = await fetchRequest(`/comment`, {
    method: "POST",
    body: JSON.stringify(comment),
  });

  return newComment;
};