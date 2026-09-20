export type TemplateValues = Record<string, string | number>;

export const padNumber = (value: number, width = 0) =>
  String(Math.round(value)).padStart(width, "0");

export const percentOf = (value: number, total: number) => `${(value / total) * 100}%`;

export const formatTemplate = (template: string, values: TemplateValues) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
