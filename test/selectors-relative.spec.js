const Promise = require("promise");
const express = require("express");
const { firefox } = require("playwright");
const relativeSelector = require("../src/index");
let server, port;
let browser;
let page;

beforeAll(async () => {
  browser = await firefox.launch();
  page = await browser.newPage();

  const app = express();
  app.use(express.static("test/assets"));
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      port = server.address().port;
      console.log(`Running server on ${port}...`);
      resolve();
    });
  });
});

afterAll(async () => {
  server.close();
  await browser.close();
});

it("should select element toRightOf other selector", async () => {
  await page.goto("http://localhost:" + port);
  const elem = await relativeSelector(
    page,
    'text="candidate text" toRightOf text="Reference text"'
  );
  expect(await elem.getAttribute("id")).toBe("6");
});
