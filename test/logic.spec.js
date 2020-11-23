const {
  above,
  below,
  left,
  right,
  near,
  distance,
  meetsProximitySelector,
} = require("../src/logic.js");

//////////////////////////////////////////////////////////////////////////////////////////
// Compute getBoundingClientRect
// https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
//

function rect(element) {
  element.left = element.x;
  element.right = element.x + element.width;
  element.top = element.y;
  element.bottom = element.y + element.height;
  return element;
}

const ref = rect({ x: 0, y: 0, width: 20, height: 20 });
const justAbove = rect({ x: 0, y: -20, width: 20, height: 20 });
const justBelow = rect({ x: 0, y: 20, width: 20, height: 20 });
const justLeft = rect({ x: -20, y: 0, width: 20, height: 20 });
const justRight = rect({ x: 20, y: 0, width: 20, height: 20 });
const topLeft = rect({ x: -30, y: -30, width: 20, height: 20 });
const bottomRight = rect({ x: 30, y: 30, width: 20, height: 20 });
const inside = rect({ x: 5, y: 5, width: 10, height: 10 });
const outside = rect({ x: -20, y: -20, width: 60, height: 60 });

const nearAbove = rect({ x: 0, y: -15, width: 20, height: 20 });
const nearBelow = rect({ x: 0, y: 5, width: 20, height: 20 });
const nearLeft = rect({ x: -15, y: 0, width: 20, height: 20 });
const nearRight = rect({ x: 5, y: 0, width: 20, height: 20 });
const farAbove = rect({ x: 0, y: -115, width: 20, height: 20 });
const farBelow = rect({ x: 0, y: 105, width: 20, height: 20 });
const farLeft = rect({ x: 0, y: -115, width: 20, height: 20 });
const farRight = rect({ x: 0, y: 105, width: 20, height: 20 });

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

describe("left", () => {
  it("should be true if left", () => {
    expect(left(topLeft, ref)).toBe(true);
    expect(left(justLeft, ref)).toBe(true);
  });
  it("should be false if not below, smaller, bigger", () => {
    expect(left(inside, ref)).toBe(false);
    expect(left(outside, ref)).toBe(false);
  });
});

describe("right", () => {
  it("should be true if right", () => {
    expect(right(bottomRight, ref)).toBe(true);
    expect(right(justRight, ref)).toBe(true);
  });
  it("should be false if not below, smaller, bigger", () => {
    expect(right(inside, ref)).toBe(false);
    expect(right(outside, ref)).toBe(false);
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
    const nearAbove = rect({ x: 0, y: -40, width: 20, height: 20 });
    expect(near(nearAbove, ref)).toBe(true);
    const nearBelow = rect({ x: 0, y: 30, width: 20, height: 20 });
    expect(near(nearBelow, ref)).toBe(true);
    const nearLeft = rect({ x: -40, y: 0, width: 20, height: 20 });
    expect(near(nearLeft, ref)).toBe(true);
    const nearRight = rect({ x: 30, y: 0, width: 20, height: 20 });
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

describe("meetsProximitySelector", () => {
  it("should be use the correct selector", () => {
    expect(meetsProximitySelector("left", topLeft, ref)).toBe(true);
    expect(meetsProximitySelector("left", farLeft, ref)).toBe(false);
    expect(meetsProximitySelector("below", bottomRight, ref)).toBe(true);
    expect(meetsProximitySelector("below", inside, ref)).toBe(false);
    expect(meetsProximitySelector("above", topLeft, ref)).toBe(true);
    expect(meetsProximitySelector("right", justRight, ref)).toBe(true);

    expect(meetsProximitySelector("near", nearBelow, ref)).toBe(true);
    expect(meetsProximitySelector("near", farRight, ref)).toBe(false);
  });
});

it("distance bug", () => {
  const nearBigRight = rect({ x: 5, y: 0, width: 200, height: 20 });
  const farRight = rect({ x: 0, y: 105, width: 20, height: 20 });
  expect(distance(farRight, ref)).toBeGreaterThan(distance(nearBigRight, ref));
});
