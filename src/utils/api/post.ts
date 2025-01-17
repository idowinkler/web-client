import { UserEntity } from "../../types/entities/user";
import { fetchRequest } from "../fetch";
const serverUrl = "http://localhost:3000";

export const getPosts = async () => {
  const posts = await fetchRequest(`${serverUrl}/post`, { method: "GET" });

  return posts;
};

export const getPostsByUserId = async (userId: UserEntity['_id']) => {
  const posts = await fetchRequest(`${serverUrl}/post?sender=${userId}`, { method: "GET" });

  return posts;
};
