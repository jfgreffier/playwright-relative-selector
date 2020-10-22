function above(candidateRect, refRect) {
  return candidateRect.y + candidateRect.height <= refRect.y;
}

function below(candidateRect, refRect) {
  return candidateRect.y >= refRect.y + refRect.height;
}

function toLeftOf(candidateRect, refRect) {
  return candidateRect.x + candidateRect.width <= refRect.x;
}

function toRightOf(candidateRect, refRect) {
  return candidateRect.x >= refRect.x + refRect.width;
}

function near(candidateRect, refRect, offset = 30) {
  return (
    candidateRect.x + candidateRect.width > refRect.x - offset &&
    candidateRect.x < refRect.x + offset + refRect.width &&
    candidateRect.y + candidateRect.height > refRect.y - offset &&
    candidateRect.y < refRect.y + offset + refRect.height
  );
}

function distance(candidateBoundingBox, refBoundingBox) {
  let leftDiff = Math.abs(candidateBoundingBox.x - refBoundingBox.x);
  let rightDiff = Math.abs(
    candidateBoundingBox.x +
      candidateBoundingBox.width -
      (refBoundingBox.x + refBoundingBox.width)
  );
  let topDiff = Math.abs(candidateBoundingBox.y - refBoundingBox.y);
  let bottomDiff = Math.abs(
    candidateBoundingBox.y +
      candidateBoundingBox.height -
      (refBoundingBox.y + refBoundingBox.height)
  );
  let distance = Math.sqrt(
    leftDiff ** 2 + rightDiff ** 2 + topDiff ** 2 + bottomDiff ** 2
  );
  return distance;
}

module.exports = {
  above,
  below,
  toLeftOf,
  toRightOf,
  near,
  distance,
};
