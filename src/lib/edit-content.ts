import { Redis } from "@upstash/redis";

let redisClient: Redis | undefined;

export function getRedis(): Redis {
  if (!redisClient) {
    redisClient = Redis.fromEnv();
  }
  return redisClient;
}

export const CONTENT_KEY = "biolink:content";
export const SESSION_PREFIX = "biolink:session:";
export const SESSION_TTL_SECONDS = 2 * 60 * 60;

// Every value the edit-mode UI is allowed to read/write. Keys here are the
// only ones /api/content will accept a write for.
export const EDITABLE_KEYS = [
  "calendarLink",
  "whatsappConsultoria",
  "whatsappAnalise",
  "whatsappGestao",
  "whatsappPodcasts",
  "mentoriaCheckoutLink",
  "mentoriaPriceText",
  "podcastLink",
  "turistandoLink",
  "instagramLink",
  "linkedinLink",
  "heroPhoto",
  "gallery1",
  "gallery2",
  "gallery3",
  "gallery4",
  "gallery5",
  "gallery6",
] as const;

export type EditableKey = (typeof EDITABLE_KEYS)[number];

export type EditableContent = Partial<Record<EditableKey, string>>;

export function isEditableKey(key: string): key is EditableKey {
  return (EDITABLE_KEYS as readonly string[]).includes(key);
}

export async function getContent(): Promise<EditableContent> {
  const content = await getRedis().get<EditableContent>(CONTENT_KEY);
  return content ?? {};
}

export async function setContentValue(
  key: EditableKey,
  value: string,
): Promise<EditableContent> {
  const current = await getContent();
  const next = { ...current, [key]: value };
  await getRedis().set(CONTENT_KEY, next);
  return next;
}
