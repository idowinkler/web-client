import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../api/auth";

export const useUploadImage = () => {
  return useMutation(uploadImage);
};
