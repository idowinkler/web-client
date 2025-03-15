import { PostEntity } from "../../types/entities/post";
import { UserEntity } from "../../types/entities/user";
import { fetchRequest } from "../fetch";

export const getPosts = async () => {
  const posts = await fetchRequest(`/post`, { method: "GET" });

  return posts;
};

export const getPostsByUserId = async (userId: UserEntity["_id"]) => {
  const posts = await fetchRequest(`/post?sender=${userId}`, {
    method: "GET",
  });

  return posts;
};

export const getPostSuggestion = async () => {
  const suggestion = await fetchRequest(`/post/suggestion`, {
    method: "GET",
  });

  return suggestion;
};

export const addPost = async (post: Omit<PostEntity, "_id" | "user_id">) => {
  const newPost = await fetchRequest(`/post`, {
    method: "POST",
    body: JSON.stringify(post),
  });

  return newPost;
};

export const updatePost = async ({
  id,
  post,
}: {
  id: PostEntity["_id"];
  post: Partial<PostEntity>;
}) => {
  const updatedPost = await fetchRequest(`/post/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });

  return updatedPost;
};

export const deletePost = async (postId: PostEntity["_id"]) => {
  const deletedPost = await fetchRequest(`/post/${postId}`, {
    method: "DELETE",
  });

  return deletedPost;
};

export const likePost = async (id: PostEntity["_id"]) => {
  const updatedPost = await fetchRequest(`/post/${id}/like`, {
    method: "PUT",
  });

  return updatedPost;
};

export const unlikePost = async (id: PostEntity["_id"]) => {
  const updatedPost = await fetchRequest(`/post/${id}/unlike`, {
    method: "PUT",
  });

  return updatedPost;
};
