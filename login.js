const config = require("./config");

module.exports = async page => {
  const url = "http://www.twitter.com";
  console.log(`Opening ${url}`);
  await page.goto(url);
  await page.screenshot({ path: "logs/twitter.png" });
  console.log("Typing in login information");
  await page.type("#signin-email", config.username);
  await page.type("#signin-password", config.password);
  await page.click("button[type=submit]");
  console.log("Waiting for login to finish");
  await page.waitForNavigation();
  console.log("Login successfull");
  await page.screenshot({ path: "logs/home.png" });
};
