const { above, below, near, toLeftOf, toRightOf } = require("./logic");

function meetsProximitySelector(
  candidateBoundingBox,
  refBoundingBox,
  proximitySelector
) {
  var test = near;

  switch (proximitySelector) {
    case "above":
      test = above;
      break;
    case "below":
      test = below;
      break;
    case "toLeftOf":
      test = toLeftOf;
      break;
    case "toRightOf":
      test = toRightOf;
      break;
    default:
      test = near;
  }
  return test(candidateBoundingBox, refBoundingBox);
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
      (refBoundingBox.x + refBoundingBox.height)
  );
  let distance =  Math.sqrt(leftDiff**2 + rightDiff**2 + topDiff**2 + bottomDiff**2);
  return distance;
}

function getClosestId(candidatesBoundingBox, refBoundingBox) {
  var minId = 0;
  for (let i = 0; i < candidatesBoundingBox.length; i++) {
    let a = distance(candidatesBoundingBox[i], refBoundingBox);
    let b = distance(candidatesBoundingBox[minId], refBoundingBox);
    if (a < b) {
      minId = i;
    }
  }

  return minId;
}

async function relativeSelector(page, selector) {
  var args = selector.match(/^(.+?) (above|below|toLeftOf|toRightOf) (.+)/);
  var candidatesSelector = args[1];
  var proximitySelector = args[2];
  var refSelector = args[3];

  const candidates = await page.$$(candidatesSelector);
  const ref = await page.$(refSelector);
  const refBoundingBox = await ref.boundingBox();

  var results = [];
  for (const candidate of candidates) {
    const candidateBoundingBox = await candidate.boundingBox();
    if (
      await meetsProximitySelector(
        candidateBoundingBox,
        refBoundingBox,
        proximitySelector
      )
    ) {
      results.push(candidate);
    }
  }

  var resultsBoundingBox = [];
  for (const result of results) {
    resultsBoundingBox.push(await result.boundingBox());
  }
  var closestResult = results[getClosestId(resultsBoundingBox, refBoundingBox)];

  return closestResult;
}

module.exports = relativeSelector;
