import { test, expect } from "@playwright/test";

const programs = {
  onboarding: {
    programName: "PreReleaseTest 12/28/2021 Onboarding",
    groupId: "102",
    parentGroupId: "85",
  },
  delivery: {
    programName: "PreReleaseTest 12/28/2021 Delivery",
    groupId: "103",
    parentGroupId: "85",
  },
};

const learner = {
  firstName: "PreRevease12/28/2021",
  lastName: "ONBOARDING_LearnerCSV",
  email: "aptem1211+PreRevease12282021_ONBOARDING_CSV@gmail.com",
};

const transmissionProgram = "PreReleaseTest 12/28/2021 Onboarding";

const uatStageBaseULR = "https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/JobSeekers/Index";
const learnerPage = "https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/Users";
const testStageBaseULR = "https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users";

test.only("Upload users", async ({ page }) => {
  await page.goto(uatStageBaseULR);
  await page.fill('input[name="userNameOrEmail"]', "mwsadmin");
  await page.fill('input[name="password"]', "?evDFH7YM5MXz8WVmxrR");
  await page.click('input:has-text("Sign in")');
  await page.click("text=upload users");
  await page.setInputFiles('//input[@type="file"]', "onboarding.csv");
  await page.click(`//input[@value=${programs.delivery.parentGroupId}]/../../span`);
  await page.click(`//input[@value=${programs.delivery.parentGroupId}]`);
  await page.click('input:has-text("Upload")');
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

  await page.fill('//input[@name="Email"]', learner.email);
  await page.click('//input[@value="Search"]');

  await page.click(`a:has-text(${transmissionProgram})`);
  await page.click('ul[role="tree"] >> text=Programme');
  const programNameLocator = await page.locator(`//td[text()="Programme"]/../th/span`);

  await expect(programNameLocator).toHaveText(transmissionProgram);
});
