import { test, expect } from "@playwright/test";
import { locatorsClassic } from "../../../../aptem/locators/locatorsClassic";
// import { v4 as uuidv4 } from "uuid";

const programs = {
  onboarding: {
    programName: "PreReleaseTest 12/28/2021 Onboarding",
    groupId: "102",
    parentGroupId: "85",
  },
  delivery: {
    programName: "PreReleaseTest 12/13/2021 Delivery",
    groupId: "120",
  },
};

const deliveryProgramAsDefaultByCSVFile = "tests/demo/uploadUsers/withDefaultProgram/delivery.csv";

const learner = {
  firstName: "Tester101202205",
  lastName: "Tester101202205",
  email: "aptem1211+Tester101202205@gmail.com",
};

const uatStageBaseULR = "https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/JobSeekers/Index";
const learnerPage = "https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/Users";
const testStageBaseULR = "https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users";

test("Upload users", async ({ page }) => {
  await page.goto(uatStageBaseULR);
  await page.fill('input[name="userNameOrEmail"]', "mwsadmin");
  await page.fill('input[name="password"]', "?evDFH7YM5MXz8WVmxrR");
  await page.click('input:has-text("Sign in")');
  await page.click(locatorsClassic.userGroupProfile.uploadUsers);
  await page.setInputFiles(locatorsClassic.userGroupProfile.uploadCSVdialog.fileUpload, deliveryProgramAsDefaultByCSVFile);

  await page.click(`//input[@value=${programs.delivery.groupId}]`);
  await page.click('input:has-text("Upload")');
  // await page.click('tbody[role="rowgroup"] >> text=here');
  // await page.click(
  //   'text=Action: Cancel user creation >> [aria-label="select"] span'
  // );
  // await page.click("text=Update existing user");
  // await page.click('text=Ok Cancel >> input[type="button"]');

  // await page.click('input:has-text("Import")');

  await page.click('input:has-text("Import")');
  const locator = page.locator('//*[@id="Dialog"]/div[2]');
  await expect(locator).toContainText("Imported: 1, Updated: 0, Canceled: 0, Failed: 0 ");
  await page.click("text=Ok");
  await page.click("#importCancel");

  // Need to check
  await page.click('//i[contains(@class, "toggleTilesBtn-inner")]');
  await page.click('//a[@href="/MWS.ClientAdmin/Users"]');

  await page.fill('//input[@name="Email"]', learner.email);
  await page.click('//input[@value="Search"]');

  const search = page.locator(`a:has-text(${learner.firstName} ${learner.lastName})`);
  console.log(search);
  await page.click(`a:has-text('${learner.firstName} ${learner.lastName}')`);
  await page.click('ul[role="tree"] >> text=Programme');
  const programNameLocator = await page.locator(`//td[text()="Programme"]/../th/span`);

  await expect(programNameLocator).toHaveText(programs.delivery.programName);
});
