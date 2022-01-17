import { test, expect, chromium } from '@playwright/test';
import { locatorsClassic } from '../../../aptem/locators/locatorsClassic.ts';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
import { authPage } from '../../baseSteps/authConsole.ts';
import { switchToClassic } from '../../baseSteps/switchFromConsoleToClassic';
import credentials from '../../../aptem/authCredentials/credentialsData.json';

const programName = 'PreReleaseTest 12/13/2021 Onboarding';
const users = {
  userFirstName: `FirstName3`,
  userLastName: `LastName3`,
  userEmail: `aptem1211+autoTester3@gmail.com`,
};

test.beforeAll(async () => {
  // console.log(__dirname);
  // console.log(process.cwd());
  // console.log('Before all run');
  // authPage();
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://pavlo-uat.uat.aptem.dev/pwa');
  await page.fill(locatorsConsole.authPage.inputLogin, credentials.default.userName);
  await page.click(locatorsConsole.authPage.buttonNext);
  await page.fill(locatorsConsole.authPage.inputPassword, credentials.default.userPassword);
  await page.click(locatorsConsole.authPage.buttonSignIn);
  await page.waitForTimeout(5000);
  // console.log(context);

  // context = await browser.newContext({ storageState: 'state.json' });
  await context.storageState({ path: './state.json' });
});

// test.beforeEach(async ({ page }) => {});

// for (let action of actions) {

// }

test('enroll program', async ({ page }) => {
  switchToClassic({ page });
});
