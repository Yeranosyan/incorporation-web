export const domRect = (rect: Partial<DOMRect>) => rect as DOMRect;

export const mediaQuery = (matches: boolean, media: string) =>
  ({
    matches,
    media,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList;
