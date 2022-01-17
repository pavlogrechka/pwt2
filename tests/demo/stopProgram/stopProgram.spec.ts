import { test, expect } from "@playwright/test";
import { locatorsClassic } from "../../../aptem/locators/locatorsClassic.ts";
import { locatorsConsole } from "../../../aptem/locators/locatorsConsole.ts";
import credentials from "../../../aptem/authCredentials/credentialsData.json";

const users = {
  userFirstName: `FirstName3`,
  userLastName: `LastName3`,
  userEmail: `aptem1211+autoTester3@gmail.com`,
};
test.beforeEach(async ({ page }) => {
  await page.goto("https://pavlo-uat.uat.aptem.dev/Users/Account/LogOn");
  await page.fill(
    locatorsClassic.authPage.inputLogin,
    credentials.default.userName
  );
  await page.fill(
    locatorsClassic.authPage.inputPassword,
    credentials.default.userPassword
  );
  await page.click(locatorsClassic.authPage.buttonSignIn);
});

test("stop learners program", async ({ page }) => {
  await page.click(locatorsConsole.header.userSettingIcon);
  await page.click(locatorsConsole.header.switchBtn);
  expect(await page.innerText("h1")).toBe("Users");
  await page.waitForTimeout(1000);
  await page.fill(
    locatorsClassic.learnersPage.emailSearch,
    `${users.userEmail}`
  );
  await page.click(locatorsClassic.learnersPage.searchButton);
  await page.click(
    `//a[text()="${users.userFirstName} ${users.userLastName}"]`
  );
  await page.click(locatorsClassic.learnerProfile.stopButton);
  await page.click(
    'text=Tracker: Leaving date: Status: Onboarding Ready to enrol On probation Active Non >> input[type="button"]'
  );
  await page.click('ul[role="tree"] a:has-text("Programme")');

  expect(
    await page.innerText(
      '//*[@id="panelbar"]/li[7]/div/div/table[1]/tbody/tr[2]/th/span'
    )
  ).toBe("Account programme");
});
