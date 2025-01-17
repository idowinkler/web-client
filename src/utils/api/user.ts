import { UserEntity } from "../../types/entities/user";
import { fetchRequest } from "../fetch";
const serverUrl = "http://localhost:3000";

export const getUserById = async (id: string | undefined) => {
  if (id) {
    const user = await fetchRequest(`${serverUrl}/user/${id}`, {
      method: "GET",
    });

    return user;
  }

  return null;
};

export const updateUser = async (user: UserEntity) => {
  const updatedUser = await fetchRequest(`${serverUrl}/user`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

  return updatedUser;
};
