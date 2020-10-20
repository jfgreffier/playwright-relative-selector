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

module.exports = {
  above,
  below,
  toLeftOf,
  toRightOf,
  near,
};
