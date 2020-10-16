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
