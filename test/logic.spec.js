const {
  above,
  below,
  toLeftOf,
  toRightOf,
  near,
  distance,
} = require("../src/logic");

const ref = { x: 0, y: 0, width: 20, height: 20 };
const justAbove = { x: 0, y: -20, width: 20, height: 20 };
const justBelow = { x: 0, y: 20, width: 20, height: 20 };
const justLeft = { x: -20, y: 0, width: 20, height: 20 };
const justRight = { x: 20, y: 0, width: 20, height: 20 };
const topLeft = { x: -30, y: -30, width: 20, height: 20 };
const bottomRight = { x: 30, y: 30, width: 20, height: 20 };
const inside = { x: 5, y: 5, width: 10, height: 10 };
const outside = { x: -20, y: -20, width: 60, height: 60 };

const nearAbove = { x: 0, y: -15, width: 20, height: 20 };
const nearBelow = { x: 0, y: 5, width: 20, height: 20 };
const nearLeft = { x: -15, y: 0, width: 20, height: 20 };
const nearRight = { x: 5, y: 0, width: 20, height: 20 };
const farAbove = { x: 0, y: -115, width: 20, height: 20 };
const farBelow = { x: 0, y: 105, width: 20, height: 20 };
const farLeft = { x: 0, y: -115, width: 20, height: 20 };
const farRight = { x: 0, y: 105, width: 20, height: 20 };

describe("above", () => {
  it("should be true if above", () => {
    expect(above(topLeft, ref)).toBe(true);
    expect(above(justAbove, ref)).toBe(true);
  });
  it("should be false if not above, smaller, bigger", () => {
    expect(above(inside, ref)).toBe(false);
    expect(above(outside, ref)).toBe(false);
  });
});

describe("below", () => {
  it("should be true if below", () => {
    expect(below(bottomRight, ref)).toBe(true);
    expect(below(justBelow, ref)).toBe(true);
  });
  it("should be false if not below, smaller, bigger", () => {
    expect(below(inside, ref)).toBe(false);
    expect(below(outside, ref)).toBe(false);
  });
});

describe("toLeftOf", () => {
  it("should be true if toLeftOf", () => {
    expect(toLeftOf(topLeft, ref)).toBe(true);
    expect(toLeftOf(justLeft, ref)).toBe(true);
  });
  it("should be false if not below, smaller, bigger", () => {
    expect(toLeftOf(inside, ref)).toBe(false);
    expect(toLeftOf(outside, ref)).toBe(false);
  });
});

describe("toRightOf", () => {
  it("should be true if toRightOf", () => {
    expect(toRightOf(bottomRight, ref)).toBe(true);
    expect(toRightOf(justRight, ref)).toBe(true);
  });
  it("should be false if not below, smaller, bigger", () => {
    expect(toRightOf(inside, ref)).toBe(false);
    expect(toRightOf(outside, ref)).toBe(false);
  });
});

describe("near", () => {
  it("should be true if within a rect ref", () => {
    expect(near(nearAbove, ref)).toBe(true);
    expect(near(nearBelow, ref)).toBe(true);
    expect(near(nearLeft, ref)).toBe(true);
    expect(near(nearRight, ref)).toBe(true);
  });
  it("should be true if within a rect ref + offset", () => {
    const nearAbove = { x: 0, y: -40, width: 20, height: 20 };
    expect(near(nearAbove, ref)).toBe(true);
    const nearBelow = { x: 0, y: 30, width: 20, height: 20 };
    expect(near(nearBelow, ref)).toBe(true);
    const nearLeft = { x: -40, y: 0, width: 20, height: 20 };
    expect(near(nearLeft, ref)).toBe(true);
    const nearRight = { x: 30, y: 0, width: 20, height: 20 };
    expect(near(nearRight, ref)).toBe(true);
  });
  it("should be false if far", () => {
    expect(near(farAbove, ref)).toBe(false);
    expect(near(farBelow, ref)).toBe(false);
    expect(near(farLeft, ref)).toBe(false);
    expect(near(farRight, ref)).toBe(false);
  });
});

describe("distance", () => {
  it("should be bigger if far", () => {
    expect(distance(farAbove, ref)).toBeGreaterThan(distance(nearAbove, ref));
    expect(distance(farBelow, ref)).toBeGreaterThan(distance(nearBelow, ref));
    expect(distance(farLeft, ref)).toBeGreaterThan(distance(nearLeft, ref));
    expect(distance(farRight, ref)).toBeGreaterThan(distance(nearRight, ref));
  });
});

describe("distance of elements with different size", () => {
  it("should not far if bigger", () => {
    const nearBigRight = { x: 5, y: 0, width: 200, height: 20 };
    const farRight = { x: 0, y: 105, width: 20, height: 20 };
    expect(distance(farRight, ref)).toBeGreaterThan(
      distance(nearBigRight, ref)
    );
  });

  it("should not far if bounded rigth", () => {
    const bigCloser = {
      x: ref.x + ref.width + 5,
      y: -100,
      width: ref.width,
      height: 200,
    };
    const farSmall = {
      x: ref.x + ref.width + 10,
      y: ref.y,
      width: ref.width,
      height: ref.height,
    };
    expect(distance(farSmall, ref)).toBeGreaterThan(distance(bigCloser, ref));
  });

  it("should not far if bounded left", () => {
    const bigCloser = {
      x: ref.x - ref.width - 5,
      y: -100,
      width: ref.width,
      height: 200,
    };
    const farSmall = {
      x: ref.x - ref.width - 10,
      y: ref.y,
      width: ref.width,
      height: ref.height,
    };
    expect(distance(farSmall, ref)).toBeGreaterThan(distance(bigCloser, ref));
  });
});
