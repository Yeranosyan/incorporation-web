import type { Band } from "./cycleCollapse";

type Point = [x: number, y: number, z: number];
type Slab = { x0: number; x1: number; y0: number; y1: number; z0: number; z1: number };

const DEPTH_ANGLE = Math.PI / 6;
const DEPTH_SCALE = 0.5;
const DX = Math.cos(DEPTH_ANGLE) * DEPTH_SCALE;
const DY = Math.sin(DEPTH_ANGLE) * DEPTH_SCALE;
const PAD = 0.12;

const LAYOUTS = {
  wide: { height: 2.6, depth: 1.9, plinth: 0.42, margin: 0.5, lift: 0.85, inset: 0.3 },
  compact: { height: 5.4, depth: 3.6, plinth: 0.95, margin: 0.9, lift: 1.7, inset: 0.6 },
};

export type CycleLayout = keyof typeof LAYOUTS;

const round = (value: number) => Math.round(value * 100) / 100;

const project = ([x, y, z]: Point) => [round(x + z * DX), round(-(y + z * DY))];

const line = (points: Point[]) => `M${points.map((point) => project(point).join(" ")).join("L")}`;

const shape = (points: Point[]) => `${line(points)}Z`;

const faces = ({ x0, x1, y0, y1, z0, z1 }: Slab) => ({
  front: shape([
    [x0, y0, z0],
    [x1, y0, z0],
    [x1, y1, z0],
    [x0, y1, z0],
  ]),
  top: shape([
    [x0, y1, z0],
    [x1, y1, z0],
    [x1, y1, z1],
    [x0, y1, z1],
  ]),
  right: shape([
    [x1, y0, z0],
    [x1, y0, z1],
    [x1, y1, z1],
    [x1, y1, z0],
  ]),
});

export const buildCycleChart = (layout: CycleLayout, scale: number, bands: Band[]) => {
  const { height, depth, plinth, margin, lift, inset } = LAYOUTS[layout];
  const z0 = inset;
  const z1 = depth - inset;
  const minX = -margin - PAD;
  const maxX = scale + margin + depth * DX + PAD;
  const minY = -(height + lift + z1 * DY) - PAD;
  const maxY = plinth + PAD;
  const width = maxX - minX;
  const tall = maxY - minY;

  const xPercent = (x: number, z = 0) => ((project([x, 0, z])[0] - minX) / width) * 100;
  const yPercent = (y: number, z = 0) => ((project([0, y, z])[1] - minY) / tall) * 100;

  const grooves = Array.from({ length: scale + 1 }, (_, week) => week);

  return {
    viewBox: `${round(minX)} ${round(minY)} ${round(width)} ${round(tall)}`,
    aspect: width / tall,
    plinth: faces({ x0: -margin, x1: scale + margin, y0: -plinth, y1: 0, z0: 0, z1: depth }),
    plinthRim: line([
      [-margin, 0, 0],
      [scale + margin, 0, 0],
      [scale + margin, 0, depth],
    ]),
    grooves: grooves
      .map((week) => line([
        [week, 0, depth * 0.18],
        [week, 0, depth * 0.82],
      ]))
      .join(""),
    ghost: bands.map(({ from, to }) =>
      shape([
        [from, 0, z0],
        [to, 0, z0],
        [to, 0, z1],
        [from, 0, z1],
      ]),
    ),
    axisPercent: (week: number) => xPercent(week),
    slab: (left: number, right: number, rise: number) => {
      const box = { x0: left, x1: right, y0: rise, y1: rise + height, z0, z1 };
      return {
        ...faces(box),
        rim: line([
          [left, rise + height, z0],
          [right, rise + height, z0],
          [right, rise + height, z1],
        ]),
      };
    },
    seams: (positions: number[], rise: number) =>
      positions
        .map((x) => line([
          [x, rise, z0],
          [x, rise + height, z0],
          [x, rise + height, z1],
        ]))
        .join(""),
    tagAt: (x: number, rise: number) => [xPercent(x, z0), yPercent(rise + height, z0)],
    lift,
  };
};

export type CycleChart = ReturnType<typeof buildCycleChart>;
