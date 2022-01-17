import { test, expect } from "@playwright/test";
import { locatorsClassic } from "../../../../aptem/locators/locatorsClassic";

const config = {
  url: "https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/JobSeekers/Index",
  program: "PreReleaseTest 12/28/2021 Onboarding",
  groupId: "131",
  userEmail: "aptem1211+autoTester7@gmail.com",
  userFullName: "FirstName7 LastName7",
  CSVfilePath: "tests/demo/uploadUsers/withDefaultProgram/onboarding.csv",
};

test("Upload users", async ({ page }) => {
  await page.goto(config.url);
  await page.fill(locatorsClassic.authPage.inputLogin, "mwsadmin");
  await page.fill(locatorsClassic.authPage.inputPassword, "?evDFH7YM5MXz8WVmxrR");
  await page.click(locatorsClassic.authPage.buttonSignIn);
  await page.click(locatorsClassic.userGroupProfile.uploadUsers);
  await page.setInputFiles(locatorsClassic.userGroupProfile.uploadCSVdialog.fileUpload, config.CSVfilePath);
  await page.click(`//input[@value=${config.groupId}]`);
  await page.click(locatorsClassic.userGroupProfile.uploadCSVdialog.uploadButton);
  await page.click('tbody[role="rowgroup"] >> text=here');
  await page.click('text=Action: Cancel user creation >> [aria-label="select"] span');
  await page.click("text=Update existing user");
  await page.click('text=Ok Cancel >> input[type="button"]');
  await page.click('input:has-text("Import")');
  const locator = page.locator('//*[@id="Dialog"]/div[2]');
  await expect(locator).toContainText("Imported: 0, Updated: 1, Canceled: 0, Failed: 0 ");
  await page.click("text=Ok");
  await page.click("#importCancel");
  // Need to check
  await page.click('//i[contains(@class, "toggleTilesBtn-inner")]');
  await page.click('//a[@href="/MWS.ClientAdmin/Users"]');
  await page.fill('//input[@name="Email"]', config.userEmail);
  await page.click('//input[@value="Search"]');
  await page.click(`a:has-text("${config.userFullName}")`);
  await page.click('ul[role="tree"] >> text=Programme');
  const content = await page.textContent('//td[text()="Programme"]/../th/span');
  expect(content).toBe(config.program);
  // const programNameLocator = await page.locator('//td[text()="Programme"]/../th/span');
  // await expect(programNameLocator).toContainText(config.program);
  // const programNameLocator = await page.locator('//td[text()="Programme"]/../th/span');
  // await expect(programNameLocator).toContainText(config.program);
  // await expect(programNameLocator).toHaveText(config.program);
});
