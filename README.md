# 🎭 Playwright relative selector

[![npm version](https://img.shields.io/npm/v/playwright-relative-selector.svg?style=flat)](https://www.npmjs.com/package/playwright-relative-selector)
[![Actions Status](https://github.com/jfgreffier/playwright-relative-selector/workflows/build/badge.svg?branch=master)](https://github.com/jfgreffier/playwright-relative-selector/actions?query=branch:master)
![Code Coverage](https://raw.githubusercontent.com/jfgreffier/playwright-relative-selector/master/.github/badges/coverage.svg)

Selecting elements based on layout is native to Playwright since 1.8.0

```js
await page.click(':text("Sign In"):right-of(#home)');
```
Please refer to Playwright's documentation
https://playwright.dev/docs/selectors#selecting-elements-based-on-layout

<br>
<details>
  <summary>Click to see depreciated documentation</summary>
  <br><br>

  Playwright helper to locate elements relative to others

  ## Usage

  ```
  npm install --save-dev playwright-relative-selector
  ```

  Once installed, you can `require` this package in a Node.js script and use it with Playwright.

  ```js
  const relativeSelector = require('playwright-relative-selector');

  const clickMeElement = await relativeSelector(page, 'text="Sign In" toRightOf css=#home');
  await clickMeElement.click();
  ```

  ## Selectors

  Available selectors:
  - above
  - below
  - toLeftOf
  - toRightOf
  - near

  An element is considered relative to another if the distance between the two is of 30px or less.

  ## Examples

  ### First example

  This code snippet sets a page with three buttons and clicks on the 'Click me' element on the right of 'Middle'

  ```js
  const { firefox } = require('playwright');
  const relativeSelector = require('playwright-relative-selector');

  (async () => {
    const browser = await firefox.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setContent(`
      <div>
        <button>Click me</button><span>Middle</span><button>Click me</button>
      </div>
    `);

    const clickMeElement = await relativeSelector(page, 'text="Click me" toRightOf text="Middle"');
    await clickMeElement.click();

    await browser.close();
  })();
  ```
</details>
