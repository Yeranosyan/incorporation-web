import { project, toPath } from "@/lib/isometric";

const UNIT = 24;
const u = (value) => value * UNIT;

export const SYNC_LAYER_COUNT = 5;
const LOT = u(5.6);
const PLINTH = u(0.36);
const INSET = u(0.6);
const BODY = LOT - INSET * 2;
const LAYER = u(0.8);
const HEIGHT = LAYER * SYNC_LAYER_COUNT;
const SLAB = BODY - u(0.5) * 2;
const SLAB_DEPTH = u(0.6);
const CAP_DEPTH = u(0.28);
const GROOVE = u(0.12);
const LIFT = u(1.5);
const PADDING = u(0.5);
const LAYOUTS = {
  wide: { span: u(10.5), below: u(1.9) },
  compact: { span: u(7), below: u(0.2) },
};

const prism = ({ x, y, z = 0, w, d, h }) => ({
  top: [
    [x, y, z + h],
    [x + w, y, z + h],
    [x + w, y + d, z + h],
    [x, y + d, z + h],
  ],
  left: [
    [x, y + d, z],
    [x + w, y + d, z],
    [x + w, y + d, z + h],
    [x, y + d, z + h],
  ],
  right: [
    [x + w, y, z],
    [x + w, y + d, z],
    [x + w, y + d, z + h],
    [x + w, y, z + h],
  ],
  backLeft: [
    [x, y, z],
    [x, y + d, z],
    [x, y + d, z + h],
    [x, y, z + h],
  ],
  backRight: [
    [x, y, z],
    [x + w, y, z],
    [x + w, y, z + h],
    [x, y, z + h],
  ],
});

const openPath = (points) => `M${points.map((point) => project(point).join(" ")).join("L")}`;

const solid = (box) => {
  const faces = prism(box);
  return { top: toPath(faces.top), left: toPath(faces.left), right: toPath(faces.right) };
};

const square = (cx, cy, z, size, h = 0) => ({ x: cx - size / 2, y: cy - size / 2, z, w: size, d: size, h });

export const hangingSides = (size, h) => {
  const faces = prism(square(0, 0, -h, size, h));
  return { left: toPath(faces.left), right: toPath(faces.right) };
};

const hanging = (size, h) => ({ top: toPath(prism(square(0, 0, 0, size)).top), ...hangingSides(size, h) });

const TEXT_PLANES = {
  top: (x, y) => `matrix(0.866 0.5 -0.866 0.5 ${x} ${y})`,
  left: (x, y) => `matrix(0.866 0.5 0 1 ${x} ${y})`,
};

const planeText = (point, plane) => {
  const [x, y] = project(point);
  return TEXT_PLANES[plane](x, y);
};

export const buildSyncScene = (layout) => {
  const { span, below } = LAYOUTS[layout];
  const source = { x: 0, y: 0 };
  const target = { x: span, y: -span };
  const plinthOf = ({ x, y }) => ({ x, y, z: 0, w: LOT, d: LOT, h: PLINTH });
  const bodyOf = ({ x, y }) => ({ x: x + INSET, y: y + INSET, z: PLINTH, w: BODY, d: BODY, h: HEIGHT });
  const centerOf = ({ x, y }) => [x + LOT / 2, y + LOT / 2];
  const topZ = PLINTH + HEIGHT;
  const cruiseTop = topZ + LIFT + SLAB_DEPTH;
  const [sx, sy] = centerOf(source);
  const [tx, ty] = centerOf(target);

  const sourceBody = bodyOf(source);
  const record = prism(sourceBody);
  const glass = prism(bodyOf(target));

  const extremes = [
    project([source.x, source.y + LOT, 0]),
    project([target.x + LOT, target.y, 0]),
    project([source.x + LOT, source.y + LOT, 0]),
    project([sx - SLAB / 2, sy - SLAB / 2, cruiseTop]),
    project([tx - SLAB / 2, ty - SLAB / 2, cruiseTop]),
  ];
  const minX = Math.min(...extremes.map(([x]) => x)) - PADDING;
  const maxX = Math.max(...extremes.map(([x]) => x)) + PADDING;
  const minY = Math.min(...extremes.map(([, y]) => y)) - PADDING;
  const maxY = Math.max(...extremes.map(([, y]) => y)) + PADDING + below;
  const width = maxX - minX;
  const height = maxY - minY;

  const percentOf = (point) => {
    const [x, y] = project(point);
    return [((x - minX) / width) * 100, ((y - minY) / height) * 100];
  };

  const polygon = (points) =>
    `polygon(${points.map((point) => percentOf(point).map((value) => `${value.toFixed(3)}%`).join(" ")).join(", ")})`;

  const [sourceX, nameY] = percentOf([source.x + LOT, source.y + LOT, 0]);
  const [targetX] = percentOf([target.x + LOT, target.y + LOT, 0]);
  const [, readoutY] = percentOf([sx, sy, PLINTH + HEIGHT * 0.22]);

  return {
    viewBox: `${minX} ${minY} ${width} ${height}`,
    aspect: width / height,
    anchors: { sourceX, targetX, nameY, readoutY },
    plinths: [solid(plinthOf(source)), solid(plinthOf(target))],
    record: {
      ...solid(sourceBody),
      seams: Array.from({ length: SYNC_LAYER_COUNT - 1 }, (_, index) => {
        const z = PLINTH + (index + 1) * LAYER;
        return openPath([
          [sourceBody.x, sourceBody.y + BODY, z],
          [sourceBody.x + BODY, sourceBody.y + BODY, z],
          [sourceBody.x + BODY, sourceBody.y, z],
        ]);
      }),
      numerals: Array.from({ length: SYNC_LAYER_COUNT }, (_, level) =>
        planeText([sourceBody.x + u(0.42), sourceBody.y + BODY, PLINTH + level * LAYER + LAYER * 0.3], "left"),
      ),
      rim: openPath([record.left[3], record.left[2], record.right[3]]),
      groove: toPath(prism(square(sx, sy, topZ, SLAB + GROOVE * 2)).top),
      port: toPath(prism(square(sx, sy, topZ, SLAB)).top),
    },
    glass: {
      floor: toPath(prism({ ...bodyOf(target), h: 0 }).top),
      back: [toPath(glass.backLeft), toPath(glass.backRight)],
      backEdges: openPath([glass.backLeft[1], glass.backLeft[0], glass.backRight[1]]),
      backPost: openPath([glass.backLeft[0], glass.backLeft[3]]),
      backRim: openPath([glass.backLeft[2], glass.backLeft[3], glass.backRight[2]]),
      frontRim: openPath([glass.left[3], glass.left[2], glass.right[3]]),
      frontPosts: [
        openPath([glass.left[0], glass.left[3]]),
        openPath([glass.left[1], glass.left[2]]),
        openPath([glass.right[0], glass.right[3]]),
      ],
      frontBase: openPath([glass.left[0], glass.left[1], glass.right[0]]),
      clipLeft: polygon(glass.left),
      clipRight: polygon(glass.right),
    },
    slab: {
      ...hanging(SLAB, SLAB_DEPTH),
      numeral: planeText([-SLAB / 2 + u(0.4), SLAB / 2 - u(0.36), 0], "top"),
    },
    cap: hanging(SLAB, CAP_DEPTH),
    motion: {
      source: [sx, sy],
      target: [tx, ty],
      size: SLAB,
      slabDepth: SLAB_DEPTH,
      capDepth: CAP_DEPTH,
      floorZ: PLINTH,
      topZ,
      cruiseTop,
      layer: LAYER,
    },
  };
};
