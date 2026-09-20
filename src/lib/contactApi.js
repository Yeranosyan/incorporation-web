import { CONTACT_ENDPOINT } from "./contactContract";

export const submitContact = async (fields, meta, fetchImpl = fetch) => {
  const response = await fetchImpl(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, ...meta }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error ?? `status_${response.status}`);
  }
};
