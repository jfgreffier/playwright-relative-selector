const fs = require("fs");
const process = require("process");
const { firefox } = require("playwright");
const { chromium } = require("playwright");
const relativeSelector = require("../src/index");

const headless = process.env.HEADFULL !== "true";
const browserType = process.env.BROWSER || "chromium";

let browser;
let context;
let page;

beforeAll(async () => {
  jest.setTimeout(10000);
  browser =
    browserType == "firefox"
      ? await firefox.launch({ headless })
      : await chromium.launch({ headless });
  console.log(`Run test with ${browserType} ${browser.version()}`);
  context = await browser.newContext();
  page = await context.newPage();
  page.on("console", (msg) => console.log(msg.text()));
  await context.route("**/**", (route, req) => {
    route.fulfill({
      status: 200,
      body: fs.readFileSync(
        "./test/assets/" + req.url().match(/\/mock\/(.*)/)[1]
      ),
    });
  });
});

afterAll(async () => {
  await browser.close();
});

it("should select element toRightOf other selector", async () => {
  await page.goto("http://mock/index.html");
  const elem = await relativeSelector(
    page,
    'text="candidate text" toRightOf text="Reference text"'
  );
  expect(await elem.getAttribute("id")).toBe("6");
});
