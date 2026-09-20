import { SYNC_LAYER_COUNT } from "./syncScene";

export const SYNC_POOL = SYNC_LAYER_COUNT + 2;

const LEAD = 0.5;
const STEP = 1.15;
const APPEAR = 0.18;
const RISE = 0.55;
const TRAVEL_DELAY = 0.28;
const TRAVEL = 0.92;
const DROP_OVERLAP = 0.16;
const SETTLE_LEAD = 0.04;
const LAND_SETTLE = 0.32;
const WRITE_PAUSE = 0.5;
const HOLD = 1.9;
const SINK = 0.7;
const REST = 0.25;

const DROP_START = TRAVEL_DELAY + TRAVEL - DROP_OVERLAP;
const LANDED_AT = DROP_START + LAND_SETTLE;
const WRITE_START = LEAD + (SYNC_LAYER_COUNT - 1) * STEP + LANDED_AT + WRITE_PAUSE;
const SINK_START = WRITE_START + LANDED_AT + HOLD;

export const SYNC_CYCLE = SINK_START + SINK + REST;
export const SYNC_STILL_TIME = SINK_START - 0.01;

const clamp = (value) => Math.min(Math.max(value, 0), 1);
const mod = (value, size) => ((value % size) + size) % size;
const lerp = (from, to, amount) => from + (to - from) * amount;
const easeOutCubic = (value) => 1 - (1 - value) ** 3;
const easeInOutCubic = (value) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2);

const LAND_OMEGA = (2 * Math.PI) / 0.44;
const LAND_DAMPING = 0.74;
const LAND_LAUNCH = 2.2;
const LAND_OMEGA_D = LAND_OMEGA * Math.sqrt(1 - LAND_DAMPING ** 2);

const landing = (seconds) => {
  if (seconds > 4) return 1;
  const decay = Math.exp(-LAND_DAMPING * LAND_OMEGA * seconds);
  const value =
    1 -
    decay *
      (Math.cos(LAND_OMEGA_D * seconds) +
        ((LAND_DAMPING * LAND_OMEGA - LAND_LAUNCH) / LAND_OMEGA_D) * Math.sin(LAND_OMEGA_D * seconds));
  return value > 1 ? 2 - value : value;
};

const SETTLE_OMEGA = (2 * Math.PI) / 0.4;

const settle = (seconds) => {
  if (seconds <= 0) return 0;
  if (seconds > 4) return 1;
  return 1 - Math.exp(-SETTLE_OMEGA * seconds) * (1 + SETTLE_OMEGA * seconds);
};

const arrivalStart = (arrival) =>
  Math.floor(arrival / SYNC_LAYER_COUNT) * SYNC_CYCLE + LEAD + mod(arrival, SYNC_LAYER_COUNT) * STEP;

const arc = (since, from, to, startTop, cruiseTop, landTop) => {
  const travel = easeInOutCubic(clamp((since - TRAVEL_DELAY) / TRAVEL));
  const top =
    since < DROP_START
      ? lerp(startTop, cruiseTop, easeOutCubic(clamp(since / RISE)))
      : lerp(cruiseTop, landTop, landing(since - DROP_START));
  return { travel, top, cx: lerp(from[0], to[0], travel), cy: lerp(from[1], to[1], travel) };
};

export const syncFrameAt = (time, motion) => {
  const { source, target, slabDepth, capDepth, floorZ, topZ, cruiseTop, layer } = motion;
  const cycle = Math.floor(time / SYNC_CYCLE);
  const local = time - cycle * SYNC_CYCLE;
  const started = Array.from({ length: SYNC_LAYER_COUNT }, (_, index) => LEAD + index * STEP).filter(
    (start) => local >= start,
  ).length;
  const latest = cycle * SYNC_LAYER_COUNT + started - 1;

  const settledAfter = (arrival) => {
    let sum = 0;
    for (let later = arrival + 1; later <= latest; later += 1) {
      sum += settle(time - (arrivalStart(later) + DROP_START - SETTLE_LEAD));
    }
    return sum;
  };

  const reads = Array.from({ length: SYNC_POOL }, (_, offset) => {
    const arrival = latest - SYNC_POOL + 1 + offset;
    const since = time - arrivalStart(arrival);
    const level = SYNC_LAYER_COUNT - 1 - settledAfter(arrival);
    const flight = arc(since, source, target, topZ, cruiseTop, floorZ + (level + 1) * layer);
    return {
      slot: mod(arrival, SYNC_POOL),
      type: mod(arrival, SYNC_LAYER_COUNT),
      cx: flight.cx,
      cy: flight.cy,
      top: flight.top,
      depth: slabDepth,
      clip: flight.travel < 0.5 ? topZ : floorZ,
      opacity: 1,
    };
  });

  const writeSince = local - WRITE_START;
  const capRest = topZ + capDepth;
  const writeFlight = arc(writeSince, target, source, capRest, cruiseTop, capRest);
  const sinking = easeInOutCubic(clamp((local - SINK_START) / SINK));
  const write = {
    cx: writeFlight.cx,
    cy: writeFlight.cy,
    top: local >= SINK_START ? lerp(capRest, topZ, sinking) : writeFlight.top,
    depth: capDepth,
    clip: writeFlight.travel > 0.5 ? topZ : floorZ,
    opacity: writeSince < 0 ? 0 : clamp(writeSince / APPEAR),
  };

  const resting = cycle > 0 && started === 0;
  const readDigit = resting ? SYNC_LAYER_COUNT : started;

  return {
    reads,
    write,
    lit: Array.from({ length: SYNC_LAYER_COUNT }, (_, index) => local >= LEAD + index * STEP && local < SINK_START),
    order: reads.map(({ slot }) => slot).join(""),
    read: readDigit,
    active: Math.max(readDigit - 1, 0),
    written: local >= WRITE_START + LANDED_AT && local < SINK_START + SINK * 0.6 ? 1 : 0,
  };
};
