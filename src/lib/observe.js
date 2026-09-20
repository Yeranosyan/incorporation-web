const registries = new Map();

const registryFor = (rootMargin) => {
  if (!registries.has(rootMargin)) {
    const callbacks = new Map();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => callbacks.get(entry.target)?.(entry)),
      { rootMargin, threshold: 0 },
    );
    registries.set(rootMargin, { observer, callbacks });
  }
  return registries.get(rootMargin);
};

export const REVEAL_MARGIN = "0px 0px -10% 0px";

export const CENTER_BAND = "-45% 0px -54% 0px";

export const observeIntersection = (element, callback, rootMargin = REVEAL_MARGIN) => {
  if (typeof IntersectionObserver === "undefined") {
    callback({ isIntersecting: true, target: element });
    return () => {};
  }

  const { observer, callbacks } = registryFor(rootMargin);
  callbacks.set(element, callback);
  observer.observe(element);

  return () => {
    observer.unobserve(element);
    callbacks.delete(element);
  };
};
