# 🎭 Playwright relative selector

[![npm version](https://img.shields.io/npm/v/playwright-relative-selector.svg?style=flat)](https://www.npmjs.com/package/playwright-relative-selector)
[![Actions Status](https://github.com/jfgreffier/playwright-relative-selector/workflows/build/badge.svg?branch=master)](https://github.com/jfgreffier/playwright-relative-selector/actions?query=branch:master)
![Code Coverage](https://raw.githubusercontent.com/jfgreffier/playwright-relative-selector/master/.github/badges/coverage.svg)

Playwright helper to locate elements relative to others

## Usage

```
npm install --save-dev playwright-relative-selector
```

Once installed, you can `require` this package in a Node.js script and you must register selectors.

```js
const { chromium, selectors } = require('playwright');
const relativeSelector = require('playwright-relative-selector');

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await relativeSelector(selectors);
...
await page.fill('text="Sign In" >> right=input', 'My name');

```

## Selectors

Available selectors:
- above
- below
- left
- right
- near

An element is considered relative to another if the distance between the tow is of 30px or less.

## Examples

### First example

This code snippet sets a page with three buttons and clicks on the 'Click me' element on the right of 'Middle'

```js
const { firefox, selectors } = require('playwright');
const relativeSelector = require('playwright-relative-selector');

(async () => {
  const browser = await firefox.launch({ headless: false });
  await relativeSelector(selectors);
  const page = await browser.newPage();
  await page.setContent(`
    <div>
      <button>Click me</button><span>Middle</span><button>Click me</button>
    </div>
  `);

  await page.click(page, '"Click me" >> right="Middle"');
  await page.click(page, '"Click me" >> right=button');
  await page.click(page, '"Click me" >> right=//button');

  await browser.close();
})();
```
