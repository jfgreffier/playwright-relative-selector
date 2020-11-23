// This script is injected on the browser
function near(candidateRect, refRect, offset = 30) {
  return (
    candidateRect.right > refRect.left - offset &&
    candidateRect.left < refRect.right + offset &&
    candidateRect.bottom > refRect.top - offset &&
    candidateRect.top < refRect.bottom + offset
  );
}

function above(candidateRect, refRect) {
  return candidateRect.bottom <= refRect.top;
}

function below(candidateRect, refRect) {
  return candidateRect.top >= refRect.bottom;
}

function left(candidateRect, refRect) {
  return candidateRect.right <= refRect.left;
}

function right(candidateRect, refRect) {
  return candidateRect.left >= refRect.right;
}

function meetsProximitySelector(
  proximitySelector,
  candidateBoundingBox,
  refBoundingBox
) {
  switch (proximitySelector) {
    case "above":
      return above(candidateBoundingBox, refBoundingBox);
    case "below":
      return below(candidateBoundingBox, refBoundingBox);
    case "left":
      return left(candidateBoundingBox, refBoundingBox);
    case "right":
      return right(candidateBoundingBox, refBoundingBox);
  }
  return near(candidateBoundingBox, refBoundingBox);
}

function distance(candidateBoundingBox, refBoundingBox, proximitySelector) {
  let xDiff = Math.min(
    Math.abs(refBoundingBox.left - candidateBoundingBox.left),
    Math.abs(refBoundingBox.left - candidateBoundingBox.right),
    Math.abs(refBoundingBox.right - candidateBoundingBox.left),
    Math.abs(refBoundingBox.right - candidateBoundingBox.right)
  );
  let yDiff = Math.min(
    Math.abs(refBoundingBox.top - candidateBoundingBox.top),
    Math.abs(refBoundingBox.top - candidateBoundingBox.bottom),
    Math.abs(refBoundingBox.bottom - candidateBoundingBox.top),
    Math.abs(refBoundingBox.bottom - candidateBoundingBox.bottom)
  );
  if (proximitySelector === "above" || proximitySelector === "below") {
    xDiff = xDiff * 10; // Give priority on distance Y
  } else if (proximitySelector === "left" || proximitySelector === "right") {
    yDiff = yDiff * 10; // Give priority on distance X
  }
  return Math.sqrt(xDiff ** 2 + yDiff ** 2);
}

module.exports = {
  near,
  above,
  below,
  left,
  right,
  distance,
  meetsProximitySelector,
};
