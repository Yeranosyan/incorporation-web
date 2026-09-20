export const BLUEPRINT_TONES = {
  accent: { block: "[--tone:var(--accent)]", line: "stroke-accent", mark: "border-accent" },
  amber: { block: "[--tone:var(--color-amber)]", line: "stroke-amber", mark: "border-amber" },
  pearl: { block: "[--tone:var(--color-pearl)]", line: "stroke-pearl", mark: "border-pearl" },
};

export type BlueprintTone = keyof typeof BLUEPRINT_TONES;
