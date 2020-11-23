/*eslint no-undef: ["off"]*/

function selectors(reference, proximitySelector, selector) {
  function getClosestIdx(
    candidatesBoundingBox,
    refBoundingBox,
    proximitySelector
  ) {
    if (candidatesBoundingBox.length === 0) {
      return -1;
    }
    let minIdx = 0;
    let minDist = distance(
      candidatesBoundingBox[0],
      refBoundingBox,
      proximitySelector
    );
    for (let i = 1; i < candidatesBoundingBox.length; i++) {
      const cDist = distance(
        candidatesBoundingBox[i],
        refBoundingBox,
        proximitySelector
      );
      if (cDist < minDist) {
        minDist = cDist;
        minIdx = i;
      }
    }
    return minIdx;
  }

  function css(selector) {
    return document.querySelectorAll(selector);
  }

  function xPath(selector) {
    const result = [];
    const it = document.evaluate(
      selector,
      document,
      null,
      XPathResult.UNORDERED_NODE_ITERATOR_TYPE
    );
    for (let node = it.iterateNext(); node; node = it.iterateNext()) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        result.push(node);
      }
    }
    return result;
  }

  function text(selector) {
    let findText = selector.replace("text=", "");
    if (!findText.startsWith('"') || !findText.endsWith('"')) {
      findText = `"${findText}"`;
    }
    return xPath(`//*[text()=${findText}]`);
  }

  const refBoundingBox = reference.getBoundingClientRect();
  let candidates;
  if (selector.startsWith("//")) {
    candidates = xPath(selector);
  } else if (
    selector.startsWith("text=") ||
    (selector.startsWith('"') && selector.endsWith('"'))
  ) {
    candidates = text(selector);
  } else {
    candidates = css(selector);
  }
  const results = [];
  const resultsBoundingBox = [];
  for (const candidate of candidates) {
    const candidateBoundingBox = candidate.getBoundingClientRect();
    if (
      meetsProximitySelector(
        proximitySelector,
        candidateBoundingBox,
        refBoundingBox
      )
    ) {
      results.push(candidate);
      resultsBoundingBox.push(candidate.getBoundingClientRect());
    }
  }
  let closestIdx = getClosestIdx(
    resultsBoundingBox,
    refBoundingBox,
    proximitySelector
  );
  if (closestIdx === -1) {
    throw `No candidate for ${selector} found`;
  }
  return results[closestIdx];
}

module.exports = {
  selectors: selectors,
};
