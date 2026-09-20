const COS_30 = Math.cos(Math.PI / 6);

const round = (value) => Math.round(value * 100) / 100;

export const project = ([x, y, z = 0]) => [round((x - y) * COS_30), round((x + y) / 2 - z)];

export const expandBox = ({ x, y, w, d, ...rest }, margin) => ({
  ...rest,
  x: x - margin,
  y: y - margin,
  w: w + margin * 2,
  d: d + margin * 2,
});

export const boxFaces = ({ x, y, w, d, h = 0 }) => ({
  base: [
    [x, y, 0],
    [x + w, y, 0],
    [x + w, y + d, 0],
    [x, y + d, 0],
  ],
  left: [
    [x, y + d, 0],
    [x + w, y + d, 0],
    [x + w, y + d, h],
    [x, y + d, h],
  ],
  right: [
    [x + w, y, 0],
    [x + w, y + d, 0],
    [x + w, y + d, h],
    [x + w, y, h],
  ],
  top: [
    [x, y, h],
    [x + w, y, h],
    [x + w, y + d, h],
    [x, y + d, h],
  ],
});

export const toPath = (points) => `M${points.map((point) => project(point).join(" ")).join("L")}Z`;

export const depthOf = ({ x, y, w, d }) => x + y + (w + d) / 2;

export const boundsOf = (points, padding = 0) => {
  const projected = points.map(project);
  const xs = projected.map(([x]) => x);
  const ys = projected.map(([, y]) => y);
  const minX = Math.min(...xs) - padding;
  const minY = Math.min(...ys) - padding;
  return {
    minX,
    minY,
    width: Math.max(...xs) + padding - minX,
    height: Math.max(...ys) + padding - minY,
  };
};
