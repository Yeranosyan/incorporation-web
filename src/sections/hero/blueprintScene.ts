import { boundsOf, boxFaces, depthOf, expandBox, project } from "@/lib/isometric";
import type { Box } from "@/lib/isometric";
import type { BlueprintTone } from "@/ui/blueprintTones";

export type BlueprintModule = { label: string; tone: BlueprintTone };
export type Block = Box & { h: number };

type Slot = { i: number; j: number; h: number };

const UNIT = 24;
const LOTS = 5;
const LOT = 3 * UNIT;
const PITCH = 4 * UNIT;
const SIZE = LOTS * PITCH - (PITCH - LOT);
const HEIGHTS = [1.1, 2.4, 0.7, 3.2, 1.6, 2, 3.8].map((height) => height * UNIT);
const SPLIT_DEPTH = 1.3 * UNIT;
const SPLIT_GAP = 0.4 * UNIT;
const OPEN_LOTS = new Set(["0-4", "1-1", "4-0"]);
const MODULE_LOTS: Slot[] = [
  { i: 3, j: 1, h: 3.4 * UNIT },
  { i: 4, j: 3, h: 2.2 * UNIT },
  { i: 2, j: 2, h: 1.3 * UNIT },
];
const LOW_HEIGHT = 0.6 * UNIT;
const FOOTPRINT_MARGIN = 0.4 * UNIT;
const PADDING = 1.5 * UNIT;

export const MODULE_CAPACITY = MODULE_LOTS.length;

const LOT_GRID = Array.from({ length: LOTS * LOTS }, (_, index) => [index % LOTS, Math.floor(index / LOTS)]);

const lotKey = (i: number, j: number) => `${i}-${j}`;

const lotBox = (i: number, j: number, h: number): Block => ({ x: i * PITCH, y: j * PITCH, w: LOT, d: LOT, h });

const lotsInFrontOf = ({ i, j }: Slot) => [lotKey(i + 1, j), lotKey(i, j + 1), lotKey(i + 1, j + 1)];

const cityBoxes = (i: number, j: number, lowered: boolean): Block[] => {
  const height = HEIGHTS[(i * 3 + j * 5) % HEIGHTS.length];
  const box = lotBox(i, j, lowered ? Math.min(height, LOW_HEIGHT) : height);
  if ((i + j) % 3 !== 0) return [box];
  return [
    { ...box, d: SPLIT_DEPTH, h: box.h * 0.55 },
    { ...box, y: box.y + SPLIT_DEPTH + SPLIT_GAP, d: LOT - SPLIT_DEPTH - SPLIT_GAP },
  ];
};

export const buildScene = (modules: readonly BlueprintModule[]) => {
  const placed = modules.slice(0, MODULE_CAPACITY).map((module, index) => {
    const slot = MODULE_LOTS[index];
    return { ...module, slot, id: lotKey(slot.i, slot.j), box: lotBox(slot.i, slot.j, slot.h) };
  });
  const reserved = new Set([...OPEN_LOTS, ...placed.map(({ id }) => id)]);
  const lowered = new Set(placed.flatMap(({ slot }) => lotsInFrontOf(slot)));

  const city = LOT_GRID.filter(([i, j]) => !reserved.has(lotKey(i, j))).flatMap(([i, j]) =>
    cityBoxes(i, j, lowered.has(lotKey(i, j))).map((box, part) => ({
      id: `${lotKey(i, j)}-${part}`,
      box,
      tone: undefined,
    })),
  );

  const blocks = [...city, ...placed.map(({ id, box, tone }) => ({ id, box, tone }))].sort(
    (a, b) => depthOf(a.box) - depthOf(b.box),
  );

  const ground: Box = { x: -UNIT, y: -UNIT, w: SIZE + UNIT * 2, d: SIZE + UNIT * 2 };
  const lots = LOT_GRID.map(([i, j]) => ({ id: lotKey(i, j), box: lotBox(i, j, 0) }));
  const footprints = placed.map(({ id, box, tone }) => ({ id, box: expandBox(box, FOOTPRINT_MARGIN), tone }));

  const bounds = boundsOf([...boxFaces(ground).base, ...blocks.flatMap(({ box }) => boxFaces(box).top)], PADDING);

  const tags = placed.map(({ label, tone, box }) => {
    const [x, y] = project([box.x + box.w / 2, box.y + box.d / 2, box.h]);
    return {
      label,
      tone,
      right: 100 - ((x - bounds.minX) / bounds.width) * 100,
      top: ((y - bounds.minY) / bounds.height) * 100,
    };
  });

  return { bounds, ground, lots, footprints, blocks, tags };
};
