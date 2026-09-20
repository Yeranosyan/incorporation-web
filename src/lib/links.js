export const linkTargetProps = ({ external = false } = {}) => ({
  target: external ? "_blank" : undefined,
  rel: external ? "noopener noreferrer" : undefined,
});
