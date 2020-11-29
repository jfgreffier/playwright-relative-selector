const fs = require("fs");
const process = require("process");
const { firefox, chromium, webkit, selectors } = require("playwright");
const relativeSelector = require("../src/index");

const headless = process.env.HEADFULL !== "true";
const browserType = process.env.BROWSER || "chromium";

let browser;
let page;

beforeAll(async () => {
  await relativeSelector(selectors);
  if (browserType === "chromium") {
    browser = await chromium.launch({ headless });
  } else if (browserType === "firefox") {
    browser = await firefox.launch({ headless });
  } else if (browserType === "webkit") {
    browser = await webkit.launch({ headless });
  }
  console.log(`Run test with ${browserType} ${browser.version()}`);
  const context = await browser.newContext();
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
  let elem;
  elem = await page.waitForSelector(
    'text="candidate text" >> toRightOf="Reference text"'
  );
  expect(await elem.getAttribute("id")).toBe("5");
  elem = await page.waitForSelector(
    'text="candidate text" >> toRightOf=text="Reference text"'
  );
  expect(await elem.getAttribute("id")).toBe("5");
});

it("should select element on the correct direction", async () => {
  await page.goto("http://mock/index.html");
  let elem;
  elem = await page.waitForSelector('[id="5"] >> toRightOf=td');
  expect(await elem.getAttribute("id")).toBe("6");
  elem = await page.waitForSelector('[id="5"] >> toLeftOf=td');
  expect(await elem.getAttribute("id")).toBe("4");
  elem = await page.waitForSelector('[id="5"] >> above=td');
  expect(await elem.getAttribute("id")).toBe("8");
  elem = await page.waitForSelector('[id="5"] >> below=td');
  expect(await elem.getAttribute("id")).toBe("2");
});

it("should select element by xPath", async () => {
  await page.goto("http://mock/index.html");
  let elem = await page.waitForSelector('[id="5"] >>  toRightOf=//td');
  expect(await elem.getAttribute("id")).toBe("6");
});

it("should page.$$ return the good candidate", async () => {
  await page.goto("http://mock/multipleCandidates.html");
  const elem = await page.$$(
    '[id="table1"] >> text="candidate" >> toLeftOf="target"'
  );
  expect(elem.length).toBe(1, "One element must be found");
  for (let i = 0; i < elem.length; i++) {
    expect(await elem[i].getAttribute("id")).toBe("good-target");
  }
});

it("should page.$$ return all candidates", async () => {
  await page.goto("http://mock/multipleCandidates.html");
  const elem = await page.$$('[id="table2"] >> td >> toLeftOf=td');
  expect(elem.length).toBe(2, "Two elements must be found");
  for (let i = 0; i < elem.length; i++) {
    expect(await elem[i].getAttribute("id")).toBe("good-target");
  }
});
