import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchRequest = async (
  url: string,
  { method, body }: RequestInit
) => {
  try {
    const response = await api.request({
      url,
      method,
      data: body,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("fetch failed", error.message);
      throw error;
    } else {
      console.error("An unexpected error occurred", error);
      throw error;
    }
  }
};
