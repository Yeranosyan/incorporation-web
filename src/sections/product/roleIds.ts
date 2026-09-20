import type { ProductContent } from "@/content/product";

export type Role = ProductContent["portals"][number];

export const roleTabId = (idPrefix: string, roleId: string) => `${idPrefix}-tab-${roleId}`;

export const rolePanelId = (idPrefix: string) => `${idPrefix}-panel`;

export const roleKey = (role: Role) => role.id;
