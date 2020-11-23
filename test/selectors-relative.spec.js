const fs = require("fs");
const { chromium, selectors } = require("playwright");
const relativeSelector = require("../src/index");
let browser;
let ctx;
let page;

beforeAll(async () => {
  jest.setTimeout(30000);
  const opts = {
    headless: true,
  };
  browser = await chromium.launch(opts);
  await relativeSelector(selectors);

  ctx = await browser.newContext();
  await ctx.route("**/index.html", (route) => {
    route.fulfill({
      status: 200,
      body: fs.readFileSync("./test/assets/index.html"),
    });
  });
});

beforeEach(async () => {
  page = await ctx.newPage();
  page.on("console", (msg) => console.log(msg.text()));
});

afterEach(async () => {
  await page.close();
});
afterAll(async () => {
  await browser.close();
});

it("should select element right other selector", async () => {
  await page.goto("http://mock/index.html");
  let elem;
  elem = await page.waitForSelector(
    'text="candidate text" >> right="Reference text"'
  );
  expect(await elem.getAttribute("id")).toBe("5");
  elem = await page.waitForSelector(
    'text="candidate text" >> right=text="Reference text"'
  );
  expect(await elem.getAttribute("id")).toBe("5");
});

it("should select element on the correct direction", async () => {
  await page.goto("http://mock/index.html");
  let elem;
  elem = await page.waitForSelector('[id="5"] >> right=td');
  expect(await elem.getAttribute("id")).toBe("6");
  elem = await page.waitForSelector('[id="5"] >> left=td');
  expect(await elem.getAttribute("id")).toBe("4");
  elem = await page.waitForSelector('[id="5"] >> above=td');
  expect(await elem.getAttribute("id")).toBe("8");
  elem = await page.waitForSelector('[id="5"] >> below=td');
  expect(await elem.getAttribute("id")).toBe("2");
});

it("should select element by xPath", async () => {
  await page.goto("http://mock/index.html");
  let elem = await page.waitForSelector('[id="5"] >>  right=//td');
  expect(await elem.getAttribute("id")).toBe("6");
});
