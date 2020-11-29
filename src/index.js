/*eslint no-unused-vars: ["off"]*/
// This script is injected on the browser
const lib = require("./logic.js");
const { selectors } = require("./selectors.js");

const register = (proximitySelector) => ({
  create(root, targetElement) {
    console.error("relativeSelector.create() not supported !");
    throw new Error("Error : relativeSelector.create() not supported");
  },

  query(root, targetElement) {
    //@INJECT_LIB
    return selectors(root, proximitySelector, targetElement);
  },

  queryAll(root, targetElement) {
    //@INJECT_LIB
    let x = selectors(root, proximitySelector, targetElement, true);
    if (x !== undefined) {
      return [x];
    }
    return [];
  },
});

function renameFn(originalName, fn) {
  return fn
    .toString()
    .replace(new RegExp(`function\\s+${originalName}`), "function select");
}

// Script injector
const relativeSelector = async function registerOn(selector) {
  const globalScript = lib.distance.toString() + selectors.toString();
  const registerToString = register.toString();
  const fns = {
    near: lib.near,
    above: lib.above,
    below: lib.below,
    toLeftOf: lib.toLeftOf,
    toRightOf: lib.toRightOf,
  };
  for (let name in fns) {
    let script = renameFn(name, fns[name]) + globalScript;
    const registerScript = registerToString.replace(/\/\/@INJECT_LIB/g, script);
    await selector.register(name, `(${registerScript})("${name}")`);
  }
};

module.exports = relativeSelector;
