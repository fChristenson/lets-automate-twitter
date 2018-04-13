const puppeteer = require("puppeteer");
const login = require("./login");
const tweet = require("./tweet");
const { todayISOString, wait } = require("./utils");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await login(page);
  const likes = await like(page);
  console.log(`Clicked ${likes} like buttons`);
  await wait(2000);
  await browser.close();
})();

const like = async page => {
  return await page.$$eval(".tweet", clickLike);
};

const clickLike = elements => {
  const shouldClick = numClicks => {
    return Math.random() >= 0.5 && numClicks < 1;
  };

  return Array.from(elements).reduce((count, e) => {
    const likeButton = e.querySelector(
      ".ProfileTweet-actionButton.js-actionButton.js-actionFavorite"
    );
    if (likeButton && shouldClick(count)) {
      likeButton.click();
      return count + 1;
    }

    return count;
  }, 0);
};
