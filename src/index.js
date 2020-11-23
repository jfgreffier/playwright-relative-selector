/*eslint no-unused-vars: ["off"]*/
// This script is injected on the browser
const lib = require("./logic.js");
const { selectors } = require("./selectors.js");

const register = (proximitySelector) => ({
  create(root, targetElement) {
    console.error("relativeSelector.create() not implemented !");
    throw new Error("Error : relativeSelector.create() not implemented");
  },

  query(root, targetElement) {
    //@INJECT_LIB
    return selectors(root, proximitySelector, targetElement);
  },

  queryAll(root, targetElement) {
    console.error("relativeSelector.queryAll() not implemented !");
    throw new Error("Error : relativeSelector.queryAll() not implemented");
  },
});

const relativeSelector = async function registerOn(selector) {
  let script = lib.near.toString();
  script += lib.above.toString();
  script += lib.below.toString();
  script += lib.left.toString();
  script += lib.right.toString();
  script += lib.distance.toString();
  script += lib.meetsProximitySelector.toString();
  script += selectors.toString();
  const injectedScript = register.toString().replace("//@INJECT_LIB", script);
  await selector.register("near", `(${injectedScript})("near")`);
  await selector.register("above", `(${injectedScript})("above")`);
  await selector.register("below", `(${injectedScript})("below")`);
  await selector.register("left", `(${injectedScript})("left")`);
  await selector.register("right", `(${injectedScript})("right")`);
};

module.exports = relativeSelector;
