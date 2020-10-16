function above(candidateRect, refRect) {
  return refRect.y < candidateRect.y + candidateRect.height;
}

function below(candidateRect, refRect) {
  return candidateRect.y > refRect.y + refRect.height;
}

function toLeftOf(candidateRect, refRect) {
  return refRect.x < candidateRect.x + candidateRect.width;
}

function toRightOf(candidateRect, refRect) {
  return candidateRect.x > refRect.x + refRect.width;
}

function near() {
  return false;
}

module.exports = {
  above,
  below,
  toLeftOf,
  toRightOf,
  near,
};
