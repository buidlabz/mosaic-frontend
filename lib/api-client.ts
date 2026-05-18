import { readAuthToken } from "./auth-session";

const RAW_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

function getBaseUrl() {
  if (!RAW_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL configuration.");
  }

  return RAW_BASE_URL.replace(/\/+$/, "");
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function collectMessages(value: unknown): string[] {
  if (typeof value === "string") {
    return value.trim() ? [value.trim()] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectMessages(item));
  }

  if (!isRecord(value)) {
    return [];
  }

  const messages = new Set<string>();

  for (const key of ["message", "msg", "error"]) {
    const candidate = value[key];
    if (typeof candidate === "string" && candidate.trim()) {
      messages.add(candidate.trim());
    }
  }

  if ("messages" in value) {
    for (const message of collectMessages(value.messages)) {
      messages.add(message);
    }
  }

  if ("errors" in value) {
    for (const message of collectMessages(value.errors)) {
      messages.add(message);
    }
  }

  if ("details" in value) {
    for (const message of collectMessages(value.details)) {
      messages.add(message);
    }
  }

  return [...messages];
}

async function parseErrorMessage(response: Response) {
  const errorData = await response.json().catch(() => null);
  const messages = collectMessages(errorData);

  if (messages.length > 0) {
    return messages.join("\n");
  }

  return `API error: ${response.status}`;
}

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...rest } = options;
  const authToken = readAuthToken();
  const baseUrl = getBaseUrl();
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${baseUrl}${normalizedEndpoint}`);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  const response = await fetch(url.toString(), {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}
