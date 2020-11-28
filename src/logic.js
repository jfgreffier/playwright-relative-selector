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
  function diff(ref, candP1, candP2) {
    const diff1 = ref - candP1;
    const diff2 = ref - candP2;
    if (Math.sign(diff1) !== Math.sign(diff2)) {
      return 0;
    }
    return Math.min(Math.abs(diff1), Math.abs(diff2));
  }

  function distMin(refP1, refP2, candP1, candP2) {
    const diff1 = diff(refP1, candP1, candP2);
    const diff2 = diff(refP2, candP1, candP2);
    return Math.min(diff1, diff2);
  }

  let xDiff = distMin(
    refBoundingBox.x,
    refBoundingBox.x + refBoundingBox.width,
    candidateBoundingBox.x,
    candidateBoundingBox.x + candidateBoundingBox.width
  );
  let yDiff = distMin(
    refBoundingBox.y,
    refBoundingBox.y + refBoundingBox.height,
    candidateBoundingBox.y,
    candidateBoundingBox.y + candidateBoundingBox.height
  );
  return Math.sqrt(xDiff ** 2 + yDiff ** 2);
}

module.exports = {
  above,
  below,
  toLeftOf,
  toRightOf,
  near,
  distance,
};
