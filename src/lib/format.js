export const padNumber = (value, width = 0) =>
  String(Math.round(value)).padStart(width, "0");

export const percentOf = (value, total) => `${(value / total) * 100}%`;

export const formatTemplate = (template, values) =>
  template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
