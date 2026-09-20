import { describe, expect, it } from "vitest";
import { boundsOf, boxFaces, depthOf, expandBox, project, toPath } from "./isometric";

describe("project", () => {
  it("maps the ground axes to the two isometric diagonals", () => {
    const [xRight, xDown] = project([10, 0]);
    const [yLeft, yDown] = project([0, 10]);
    expect(xRight).toBeGreaterThan(0);
    expect(yLeft).toBe(-xRight);
    expect(xDown).toBe(5);
    expect(yDown).toBe(5);
  });

  it("lifts points straight up by their height", () => {
    expect(project([4, 4, 3])).toEqual([0, 1]);
  });
});

describe("boxFaces", () => {
  it("returns four corners for every face", () => {
    const faces = boxFaces({ x: 0, y: 0, w: 2, d: 3, h: 4 });
    Object.values(faces).forEach((face) => expect(face).toHaveLength(4));
    faces.top.forEach(([, , z]) => expect(z).toBe(4));
    faces.base.forEach(([, , z]) => expect(z).toBe(0));
  });
});

describe("expandBox", () => {
  it("grows the footprint evenly and keeps other fields", () => {
    expect(expandBox({ x: 2, y: 2, w: 4, d: 4, h: 6 }, 1)).toEqual({ x: 1, y: 1, w: 6, d: 6, h: 6 });
  });
});

describe("toPath", () => {
  it("builds a closed SVG path from projected points", () => {
    expect(toPath([[0, 0], [0, 0, 2], [2, 2]])).toBe("M0 0L0 -2L0 2Z");
  });
});

describe("depthOf", () => {
  it("ranks boxes nearer the viewer higher", () => {
    expect(depthOf({ x: 8, y: 8, w: 2, d: 2 })).toBeGreaterThan(depthOf({ x: 0, y: 0, w: 2, d: 2 }));
  });
});

describe("boundsOf", () => {
  it("measures the projected extent with padding", () => {
    const bounds = boundsOf([[0, 0], [0, 0, 4]], 1);
    expect(bounds).toEqual({ minX: -1, minY: -5, width: 2, height: 6 });
  });
});
