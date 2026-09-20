export type LinkTarget = { external?: boolean };

export const linkTargetProps = ({ external = false }: LinkTarget = {}) => ({
  target: external ? "_blank" : undefined,
  rel: external ? "noopener noreferrer" : undefined,
});
