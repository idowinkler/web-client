import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { UserData, UserEntity } from "../../../types/entities/user";

interface LoginData extends Pick<UserEntity, "_id"> {
  accessToken: string;
  refreshToken: string;
}

export const useLogin = () => {
  return useMutation<LoginData, Error, Pick<UserData, "email" | "password">>(
    ({ email, password }) => login(email, password)
  );
};
