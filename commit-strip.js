const puppeteer = require("puppeteer");
const login = require("./login");
const {
  todayISOString,
  isoStringToYear,
  isoStringToMonth,
  isoStringToDay
} = require("./utils");
const tweet = require("./tweet");
const data = require("./commit-strip-data.json");
const fs = require("fs");

(async () => {
  const today = todayISOString(); // e.g 2017-12-09
  if (today === data.lastUpload) {
    return console.log(`Has already done upload for: ${data.lastUpload}`);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "http://www.commitstrip.com/en";
  console.log(`Going to ${url}`);
  await page.goto(url);
  const links = await page.$$eval("a", parseLinks);
  console.log(`Found: ${links.length} links`);
  const filteredLinks = links.filter(filterComicUrls);
  console.log(`Found: ${filteredLinks.length} links from today`);

  if (filteredLinks.length >= 1) {
    await login(page);
    await tweet(page, filteredLinks[0]);
    saveCompletedUploadDate(today);
  }

  await browser.close();
})();

const saveCompletedUploadDate = today => {
  const update = { lastUpload: today };
  const json = JSON.stringify(update);
  fs.writeFileSync("./commit-strip-data.json", json);
};

const parseLinks = links => {
  return links.map(link => link.href);
};

const filterComicUrls = url => {
  const today = todayISOString();
  const templateUrl = getComicUrl(today);
  const comicUrlRegex = new RegExp(templateUrl);
  return comicUrlRegex.test(url);
};

const getComicUrl = today => {
  const year = isoStringToYear(today);
  const month = isoStringToMonth(today);
  const day = isoStringToDay(today);
  // The day is hardcoded so we can get a comic link to test on
  const url = `http://www.commitstrip.com/en/${year}/${month}/${day}/`;

  return url;
};
