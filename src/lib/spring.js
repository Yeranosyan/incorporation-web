const MAX_STEP_SECONDS = 1 / 240;
const SETTLE_DISTANCE = 0.1;
const SETTLE_VELOCITY = 2;

export const springConfig = ({ response, damping }) => ({
  stiffness: ((2 * Math.PI) / response) ** 2,
  friction: (4 * Math.PI * damping) / response,
});

export const SPRINGS = {
  settle: springConfig({ response: 0.4, damping: 1 }),
  momentum: springConfig({ response: 0.4, damping: 0.8 }),
};

export const stepSpring = (state, target, config, elapsedSeconds) => {
  let { value, velocity } = state;
  let remaining = elapsedSeconds;

  while (remaining > 0) {
    const step = Math.min(remaining, MAX_STEP_SECONDS);
    const acceleration =
      -config.stiffness * (value - target) - config.friction * velocity;
    velocity += acceleration * step;
    value += velocity * step;
    remaining -= step;
  }

  return { value, velocity };
};

export const isSpringSettled = ({ value, velocity }, target) =>
  Math.abs(value - target) < SETTLE_DISTANCE &&
  Math.abs(velocity) < SETTLE_VELOCITY;
