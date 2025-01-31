import { UserEntity } from "../../types/entities/user";
import { fetchRequest } from "../fetch";

export const getUserById = async (id: string | undefined) => {
  if (id) {
    const user = await fetchRequest(`/user/${id}`, {
      method: "GET",
    });

    return user;
  }

  return null;
};

export const updateUser = async (user: UserEntity) => {
  const updatedUser = await fetchRequest(`/user`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

  return updatedUser;
};
