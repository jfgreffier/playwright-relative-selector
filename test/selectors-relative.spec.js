const { selectors, firefox } = require('playwright');
let browser;
let page;


beforeAll(async () => {
  browser = await firefox.launch();
  page = await browser.newPage();
  await selectors.register('relative', require('../index'));
  await page.setContent(`
    <div>
      <button class="left">Click me</button><span>Middle</span><button class="right">Click me</button>
    </div>
    <script>
      document.querySelector('.left').addEventListener('click', e => {
        result = 'Left';
      }, false);
      document.querySelector('.right').addEventListener('click', e => {
        result = 'Right';
      }, false);
    </script>
  `);
});

afterAll(async () => {
  await browser.close();
});

it('should use element toRightOf other selector', async () => {
  await page.click(`text="Click me" >> relative=toRightOf Middle`);
  expect(await page.evaluate('result')).toBe('Right');
});
