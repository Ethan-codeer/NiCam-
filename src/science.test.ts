import { describe, it, expect } from "vitest";
import { depthOfField, fieldOfView, motionBlur } from "./science";
describe("photography models", () => {
  it("stopping down expands depth of field", () => {
    const wide = depthOfField(50, 1.8, 3);
    const stopped = depthOfField(50, 8, 3);
    expect(wide.nearM).toBeLessThan(3);
    expect(wide.farM).toBeGreaterThan(3);
    expect(stopped.depthM).toBeGreaterThan(wide.depthM);
    expect(depthOfField(24, 16, 20).farM).toBe(Infinity);
  });
  it("matches a known 50 mm f/8 reference at 3 m", () => {
    // Thin-lens reference with 0.03 mm CoC: H = 10.4667 m.
    // Dn = Hs / (H + s - f); Df = Hs / (H - s + f).
    const result = depthOfField(50, 8, 3, 0.03);
    expect(result.hyperfocalM).toBeCloseTo(10.466667, 5);
    expect(result.nearM).toBeCloseTo(2.340373, 5);
    expect(result.farM).toBeCloseTo(4.177384, 5);
  });
  it("doubles motion blur when exposure doubles", () => {
    expect(motionBlur(5, 1 / 125, 50, 10).blurPx).toBeCloseTo(
      motionBlur(5, 1 / 250, 50, 10).blurPx * 2,
    );
    expect(motionBlur(0, 1, 50, 10).blurPx).toBe(0);
  });
  it("predicts full-frame and crop angle of view", () => {
    expect(fieldOfView(50, 36, 10).widthM).toBeCloseTo(7.2);
    expect(fieldOfView(50, 24, 10).equivalentMm).toBeCloseTo(75);
    expect(fieldOfView(50, 24, 10).horizontalDegrees).toBeLessThan(
      fieldOfView(50, 36, 10).horizontalDegrees,
    );
  });
  it("rejects invalid physical inputs", () => {
    expect(() => depthOfField(50, 0, 3)).toThrow(RangeError);
    expect(() => depthOfField(50, 2, 0.01)).toThrow(RangeError);
    expect(() => motionBlur(-1, 1, 50, 3)).toThrow(RangeError);
    expect(() => fieldOfView(NaN, 36, 3)).toThrow(RangeError);
  });
});
