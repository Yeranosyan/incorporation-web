import { describe, expect, it } from "vitest";
import { SYNC_LAYER_COUNT, buildSyncScene } from "./syncScene";
import { SYNC_CYCLE, SYNC_POOL, SYNC_STILL_TIME, syncFrameAt } from "./syncTimeline";

const { motion } = buildSyncScene("wide");
const frameAt = (time) => syncFrameAt(time, motion);
const firstRead = (time) => frameAt(time).reads.find(({ type, slot }) => type === 0 && slot === 0);

describe("syncFrameAt", () => {
  it("starts a cycle with nothing read or written", () => {
    const frame = frameAt(0.1);
    expect(frame.read).toBe(0);
    expect(frame.written).toBe(0);
    expect(frame.lit.every((lit) => !lit)).toBe(true);
  });

  it("counts each data type as it leaves AutoQuotes", () => {
    const counts = [0.6, 1.8, 2.9, 4.1, 5.2].map((time) => frameAt(time).read);
    expect(counts).toEqual([1, 2, 3, 4, 5]);
    expect(frameAt(5.2).active).toBe(SYNC_LAYER_COUNT - 1);
  });

  it("carries the first record from AutoQuotes to CPQ Teams", () => {
    const departing = firstRead(0.5);
    const arrived = firstRead(2);
    expect([departing.cx, departing.cy]).toEqual(motion.source);
    expect(arrived.cx).toBeCloseTo(motion.target[0]);
    expect(arrived.cy).toBeCloseTo(motion.target[1]);
  });

  it("writes back once, after every read has landed", () => {
    const beforeWrite = frameAt(6);
    expect(beforeWrite.written).toBe(0);
    expect(beforeWrite.write.opacity).toBe(0);
    expect(frameAt(8.5).written).toBe(1);
  });

  it("rests in a complete state for reduced motion", () => {
    const frame = frameAt(SYNC_STILL_TIME);
    expect(frame.read).toBe(SYNC_LAYER_COUNT);
    expect(frame.written).toBe(1);
    expect(frame.lit.every(Boolean)).toBe(true);
  });

  it("keeps the last count while the next cycle waits to start", () => {
    expect(frameAt(SYNC_CYCLE + 0.1).read).toBe(SYNC_LAYER_COUNT);
  });

  it("orders every pooled slab exactly once for painting", () => {
    const { order } = frameAt(3.3);
    expect(order).toHaveLength(SYNC_POOL);
    expect(new Set(order).size).toBe(SYNC_POOL);
  });
});
