const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50
  });

  const page = await browser.newPage();

  await page.goto("http://127.0.0.1:5500/index.html");

  // open sign up modal
  await page.click("#navSignUp");

  await page.type("#signUpName", "Wurie Bah");
  await page.type("#signUpEmail", "wurie@gmail.com");
  await page.type("#signUpPassword", "password123");

  await page.click("#signUpForm button");

  await new Promise(r => setTimeout(r, 2000));

  // open mailing list modal
  await page.click("#openMailingModalNav");

  await page.type("#signupName", "Wurie");
  await page.type("#signupEmail", "wurie@wisc.edu");

  await page.click("#signupForm button");

  await new Promise(r => setTimeout(r, 2000));

  // open event creation modal
  await page.click("#openEventModal");

  await page.type("#eventType", "Workshop");
  await page.type("#eventTitle", "Puppeteer Demo Event");
  await page.type("#eventDate", "May 5, 2026");
  await page.type("#eventTime", "5:00 PM");
  await page.type("#eventLocation", "Grainger Hall");
  await page.type("#eventDescription", "Demo event created using Puppeteer.");

  await page.click("#createEventForm button");

  await new Promise(r => setTimeout(r, 10000));

  await browser.close();
}

go();
