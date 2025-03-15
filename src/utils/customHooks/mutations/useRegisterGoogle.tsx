import { useMutation } from "@tanstack/react-query";
import { registerGoogle } from "../../api/auth";

export const useRegisterGoogle = () => {
  return useMutation(registerGoogle);
};
