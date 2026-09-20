export type VelocityTracker = {
  reset: () => void;
  add: (position: number, time: number) => void;
  velocity: () => number;
};

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const projectMomentum = (velocity: number, decelerationRate = 0.998) =>
  ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

export const rubberband = (overshoot: number, dimension: number, constant = 0.55) =>
  (overshoot * dimension * constant) /
  (dimension + constant * Math.abs(overshoot));

export const resistBounds = (value: number, min: number, max: number, dimension: number) => {
  if (value < min) return min - rubberband(min - value, dimension);
  if (value > max) return max + rubberband(value - max, dimension);
  return value;
};

export const nearestIndex = (points: number[], value: number) =>
  points.reduce(
    (best, point, index) =>
      Math.abs(point - value) < Math.abs(points[best] - value) ? index : best,
    0,
  );

export const createVelocityTracker = (windowMs = 100): VelocityTracker => {
  let samples: { position: number; time: number }[] = [];

  return {
    reset() {
      samples = [];
    },
    add(position, time) {
      samples = [...samples, { position, time }].filter(
        (sample) => time - sample.time <= windowMs,
      );
    },
    velocity() {
      if (samples.length < 2) return 0;
      const first = samples[0];
      const last = samples[samples.length - 1];
      const duration = last.time - first.time;
      return duration > 0
        ? ((last.position - first.position) / duration) * 1000
        : 0;
    },
  };
};
