import { chromium } from 'playwright';
import { test } from '@playwright/test';
import { readFileSync } from 'fs';
import { routing } from '../../aptem/routing/routingConsole';
import { locatorsConsole } from '../../aptem/locators/locatorsConsole';
const credentialsDataFile = 'aptem/authCredentials/credentialsData.json';
const credentialsData = JSON.parse(readFileSync(credentialsDataFile, 'utf8'));
console.log(credentialsData);
console.log(routing.authPageConsole);

const authPWA = () => {
  test('authPWA', async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(routing.authPageConsole)
  await page.fill(locatorsConsole.authPage.inputLogin, credentialsData.default.userName)
  await page.click(locatorsConsole.authPage.buttonNext)
  await page.fill(locatorsConsole.authPage.inputPassword, credentialsData.default.userPassword)
  await page.click(locatorsConsole.authPage.buttonSignIn)

  // const locator = page.locator('//h1[text()="Students"]');
  // await expect(locator).toBeVisible();
  // await page.waitForTimeout(5000)
  await page.close()
  await context.close()
  await browser.close()
})
}

// const authPWA = async () => {
//   const browser = await chromium.launch({
//     headless: false,
//   });
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto(routing.authPageConsole)
//   await page.fill(locatorsConsole.authPage.inputLogin, credentialsData.default.userName)
//   await page.click(locatorsConsole.authPage.buttonNext)
//   await page.fill(locatorsConsole.authPage.inputPassword, credentialsData.default.userPassword)
//   await page.click(locatorsConsole.authPage.buttonSignIn)

//   // const locator = page.locator('//h1[text()="Students"]');
//   // await expect(locator).toBeVisible();
//   // await page.waitForTimeout(5000)
//   await page.close()
//   await context.close()
//   await browser.close()
// }

  authPWA()
// test('authPWA' async () => {
// })



export default {authPWA}
