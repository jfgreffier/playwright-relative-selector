module.exports = createTagNameEngine = () => ({
  // Creates a selector that matches given target when queried at the root.
  // Can return undefined if unable to create one.
  create(root, target) {
    return undefined;
  },

  // Returns the first element matching given selector in the root's subtree.
  query(root, selector) {
    function textSelector(selector) {
      return Array.from(document.querySelectorAll('*')).find(el => el.textContent === selector);
    }
    function above(candidateRect, refRect) {
      return candidateRect.bottom >= refRect.top && candidateRect.left < refRect.right && candidateRect.right > refRect.left;
    }
    function below(candidateRect, refRect) {
      return candidateRect.top >= refRect.bottom && candidateRect.left < refRect.right && candidateRect.right > refRect.left;
    }
    function toLeftOf(candidateRect, refRect) {
      return candidateRect.right >= refRect.left && candidateRect.top < refRect.bottom && candidateRect.bottom > refRect.top;
    }
    function toRightOf(candidateRect, refRect) {
      return candidateRect.left >= refRect.right && candidateRect.top < refRect.bottom && candidateRect.bottom > refRect.top;
    }
    function near(candidateRect, refRect) { return false; }

    var args = selector.match(/^(.+?) (.+)/);
    var proximity = args[1];
    var elementSelector = args[2];

    var recruteur = textSelector(elementSelector);

    var candidate = root.getBoundingClientRect();
    var recruteurRect = recruteur.getBoundingClientRect(); // DOMRect
    var test = near;
    switch (proximity) {
      case 'above' : test = above; break;
      case 'below' : test = below; break;
      case 'toLeftOf' : test = toLeftOf; break;
      case 'toRightOf' : test = toRightOf; break;
      default : test = near; 
    }

    if (test(candidate, recruteurRect)) {
      return root;
    }

    return undefined;
  },

  // Returns all elements matching given selector in the root's subtree.
  queryAll(root, selector) {
    // map
    return undefined;
  }
});