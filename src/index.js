const {
  above,
  below,
  near,
  toLeftOf,
  toRightOf,
  distance,
} = require("./logic");

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
