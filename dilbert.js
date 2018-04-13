const puppeteer = require("puppeteer");
const login = require("./login");
const tweet = require("./tweet");
const { todayISOString } = require("./utils");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const today = todayISOString();
  const url = `http://www.dilbert.com/strips/${today}`;
  await login(page);
  await tweet(page, url);
  await browser.close();
})();
