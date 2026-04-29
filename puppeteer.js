const puppeteer = require("puppeteer");

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 75,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("http://127.0.0.1:5500/finalproj_mbsa/index.html", {
    waitUntil: "domcontentloaded",
  });

  await wait(3000);

  // SIGN UP
  await page.waitForSelector("#navSignUp");
  await page.click("#navSignUp");
  await wait(1500);

  // use whichever username/name field exists
  const usernameField = await page.$("#signUpUsername");
  if (usernameField) {
    await page.type("#signUpUsername", "Wurie");
  } else {
    await page.type("#signUpName", "Wurie Bah");
  }

  await page.type("#signUpEmail", "wurie@gmail.com");
  await page.type("#signUpPassword", "password123");
  await wait(1000);

  await page.click("#signUpForm button");
  await wait(2500);

  await page.click("#closeAuthModal");
  await wait(1500);

  // SCROLL TO EVENTS SECTION
  await page.evaluate(() => {
    document.querySelector("#events").scrollIntoView({ behavior: "smooth" });
  });

  await wait(2500);

  // CREATE EVENT
  await page.waitForSelector("#openEventModal");
  await page.click("#openEventModal");
  await wait(1500);

  await page.type("#eventType", "Workshop");
  await page.type("#eventTitle", "Puppeteer Demo Event");
  await page.type("#eventDate", "May 5, 2026");
  await page.type("#eventTime", "5:00 PM");
  await page.type("#eventLocation", "Grainger Hall");
  await page.type("#eventDescription", "Demo event created using Puppeteer.");
  await wait(1000);

  await page.click("#createEventForm button");
  await wait(1500);

  await page.evaluate(() => {
    document.querySelector("#events").scrollIntoView({ behavior: "smooth" });
  });

  // keep browser open to show the result
  await wait(60000);
}

go();
