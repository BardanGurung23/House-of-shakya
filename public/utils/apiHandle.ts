import { BACKEND_BASE_URL } from "@/constants/index";

const DEFAULT_REVALIDATE_SECONDS = 300;

export async function getData(
  url: string,
  token?: string,
  revalidate: number = DEFAULT_REVALIDATE_SECONDS
) {
  try {
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = token;

    const cacheOptions = token
      ? { cache: "no-store" as const }
      : revalidate === 0
      ? { cache: "no-store" as const }
      : { next: { revalidate } };

    const res = await fetch(`${BACKEND_BASE_URL}${url}`, {
      ...cacheOptions,
      headers,
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "fetch error occurred"
    );
  }
}

export async function postData(url: string, data: any, token?: string) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = token;

    const res = await fetch(`${BACKEND_BASE_URL}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorMessage = `Request failed with status ${res.status}`;
      try {
        const errorBody = await res.json();
        if (errorBody?.message) errorMessage = errorBody.message;
      } catch {
        // ignore parse failure
      }
      throw new Error(errorMessage);
    }

    return res.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "post error occurred"
    );
  }
}

export async function putData(url: string, data: any, token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = token;

  const res = await fetch(`${BACKEND_BASE_URL}${url}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      errorBody?.message ?? `Request failed with status ${res.status}`
    );
  }
  return res.json();
}

export async function deleteData(url: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = token;

  const res = await fetch(`${BACKEND_BASE_URL}${url}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      errorBody?.message ?? `Request failed with status ${res.status}`
    );
  }
  return res.json();
}
