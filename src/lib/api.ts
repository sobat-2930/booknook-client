import { authClient } from "./auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  withAuth: boolean = true
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (withAuth) {
    const { data } = await authClient.token();
    if (!data?.token) {
      throw new Error("Your session has expired. Please log in again.");
    }
    headers.set("Authorization", `Bearer ${data.token}`);
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message ?? "Something went wrong. Please try again.");
  }
  return body as T;
}