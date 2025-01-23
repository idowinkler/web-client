const accessToken = localStorage.getItem("accessToken") || "";

export const fetchRequest = async (
  url: string,
  {
    method,
    body,
    headers = { "Content-Type": "application/json" },
  }: RequestInit
) => {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      try {
        return await response.json();
      } catch (error) {
        console.error("Failed to parse JSON", error);
        return response;
      }
    }

    throw new Error(`fetch failed with status ${response.status}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("fetch failed", error.message);
      throw error;
    }
  }
};
