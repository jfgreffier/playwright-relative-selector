const Promise = require("promise");
const express = require("express");
const { selectors, firefox } = require("playwright");
let server, port;
let browser;
let page;

beforeAll(async () => {
  browser = await firefox.launch();
  page = await browser.newPage();
  await selectors.register("relative", require("../index"));

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

it("should use element toRightOf other selector", async () => {
  await page.goto("http://localhost:" + port);
  await page.click(`text="Click me" >> relative=toRightOf Middle`);
  expect(await page.evaluate("result")).toBe("Right");
});
