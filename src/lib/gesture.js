export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const projectMomentum = (velocity, decelerationRate = 0.998) =>
  ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

export const rubberband = (overshoot, dimension, constant = 0.55) =>
  (overshoot * dimension * constant) /
  (dimension + constant * Math.abs(overshoot));

export const resistBounds = (value, min, max, dimension) => {
  if (value < min) return min - rubberband(min - value, dimension);
  if (value > max) return max + rubberband(value - max, dimension);
  return value;
};

export const nearestIndex = (points, value) =>
  points.reduce(
    (best, point, index) =>
      Math.abs(point - value) < Math.abs(points[best] - value) ? index : best,
    0,
  );

export const createVelocityTracker = (windowMs = 100) => {
  let samples = [];

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
