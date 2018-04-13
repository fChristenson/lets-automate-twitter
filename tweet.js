const login = require("./login");
const { wait } = require("./utils");

module.exports = async (page, text) => {
  console.log("Trying to tweet");
  await page.click("#tweet-box-home-timeline");
  console.log(`Typing in text: ${text}`);
  await page.type("textarea[name=status]", text);
  console.log("Submitting form");
  await page.click("button.tweet-action");
  console.log("Waiting to take screenshot");
  await wait(2000);
  await page.screenshot({ path: "logs/tweet.png" });
  console.log("Screenshot saved");
};
