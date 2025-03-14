import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { UserData, UserRegisterData } from "../../../types/entities/user";

interface LoginData extends UserData {
  accessToken: string;
  refreshToken: string;
}

export const useLogin = () => {
  return useMutation<
    LoginData,
    Error,
    Pick<UserRegisterData, "email" | "password">
  >(({ email, password }) => login(email, password));
};
