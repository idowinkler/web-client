const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGE4MDllN2E4NjRiODRlMDY2NWRmNSIsInRpbWVzdGFtcCI6MTczNzEzMDE4NTEzNSwiaWF0IjoxNzM3MTMwMTg1LCJleHAiOjE3MzcxMzM3ODV9.s3vKRlP1KCZlSUwz6bWK8E-UMieuEAJl9YfINurS3Gc";

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
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }

    throw new Error(`fetch failed with status ${response.status}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("fetch failed", error.message);
      throw error;
    }
  }
};
