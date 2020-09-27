# 🎭 Playwright relative selector

[![npm version](https://img.shields.io/npm/v/playwright-relative-selector.svg?style=flat)](https://www.npmjs.com/package/playwright-relative-selector)

Playwright selector to locate elements relative to others

## Usage

```
npm install --save-dev playwright-relative-selector
```

Once installed, you can `require` this package in a Node.js script and register it as a Playwright selector.

```js
await selectors.register('relative', require('playwright-relative-selector'));
await page.click(`text="Sign In" >> relative=toRightOf Home`);
```

## Selectors

Available selectors: 
- above
- below
- toLeftOf
- toRightOf

## Examples

### First example

This code snippet sets a page with three buttons and clicks on the 'Click me' element on the right of 'Middle'

```js
const { firefox, selectors } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setContent(`
    <div>
      <button>Click me</button><span>Middle</span><button>Click me</button>
    </div>
  `);

  await selectors.register('relative', require('playwright-relative-selector'));
  await page.click(`text="Click me" >> relative=toRightOf Middle`);

  await browser.close();
})();
```
