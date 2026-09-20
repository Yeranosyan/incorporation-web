import { CONTACT_ENDPOINT } from "./contactContract";

export type ContactFields = Record<string, string>;
export type ContactMeta = { website: string; elapsedMs: number };
export type ContactReply = { ok: boolean; status: number; json: () => Promise<unknown> };
export type ContactFetch = (endpoint: string, init: RequestInit) => Promise<ContactReply>;

type ContactResult = { ok?: boolean; error?: string } | null;

export const submitContact = async (
  fields: ContactFields,
  meta: ContactMeta,
  fetchImpl: ContactFetch = fetch,
) => {
  const response = await fetchImpl(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, ...meta }),
  });

  const result = (await response.json().catch(() => null)) as ContactResult;

  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error ?? `status_${response.status}`);
  }
};
