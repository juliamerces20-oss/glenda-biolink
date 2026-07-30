import { getRedis, SESSION_PREFIX, SESSION_TTL_SECONDS } from "./edit-content";

export async function createSessionToken(): Promise<string> {
  const token = crypto.randomUUID();
  await getRedis().set(SESSION_PREFIX + token, "1", {
    ex: SESSION_TTL_SECONDS,
  });
  return token;
}

export async function isSessionValid(token: string | null): Promise<boolean> {
  if (!token) return false;
  const value = await getRedis().get(SESSION_PREFIX + token);
  return value !== null;
}

export function getEditTokenFromRequest(request: Request): string | null {
  return request.headers.get("x-edit-token");
}
