export type Reveal = {
  isIntersecting: boolean;
  target: Element;
  boundingClientRect?: DOMRectReadOnly;
  rootBounds?: DOMRectReadOnly | null;
};
export type RevealCallback = (entry: Reveal) => void;
export type Unobserve = () => void;

type Registry = { observer: IntersectionObserver; callbacks: Map<Element, RevealCallback> };

const registries = new Map<string, Registry>();

const registryFor = (rootMargin: string) => {
  const existing = registries.get(rootMargin);
  if (existing) return existing;

  const callbacks = new Map<Element, RevealCallback>();
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => callbacks.get(entry.target)?.(entry)),
    { rootMargin, threshold: 0 },
  );
  const registry = { observer, callbacks };
  registries.set(rootMargin, registry);
  return registry;
};

export const REVEAL_MARGIN = "0px 0px -10% 0px";

export const CENTER_BAND = "-45% 0px -54% 0px";

export const observeIntersection = (
  element: Element,
  callback: RevealCallback,
  rootMargin: string = REVEAL_MARGIN,
): Unobserve => {
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
