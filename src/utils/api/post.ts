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
