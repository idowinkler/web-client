const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODdkZjI2ZWMzMjljZGU0Yzk5MTk5NSIsInRpbWVzdGFtcCI6MTczNjk1NzczOTkwNSwiaWF0IjoxNzM2OTU3NzM5LCJleHAiOjE3Mzc1NjI1Mzl9.PEqATaZbRGy-JcsvnpIFEK9jCrp3ubetJ8ptjG6FhRE";

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

    console.log(response);

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
