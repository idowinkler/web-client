import { UserData } from "../../types/entities/user";
import { fetchRequest } from "../fetch";

const serverUrl = "http://localhost:3000";

export const register = async (user: UserData) => {
  const response = await fetchRequest(`${serverUrl}/auth/register`, {
    method: "POST",
    body: JSON.stringify(user),
  });

  return response;
};

export const login = async (
  email: UserData["email"],
  password: UserData["password"]
) => {
  const response = await fetchRequest(`${serverUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response;
};

export const logout = async (refreshToken: string) => {
  const response = await fetchRequest(`${serverUrl}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  return response;
};
