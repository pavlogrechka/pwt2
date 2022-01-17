import { test } from "@playwright/test";
const parentGroupIDToAssign = "85";
const groupIDToAssign = "102";

// const learner: {
//   name: "";
//   email: "";
// };

const uatStageBaseULR =
  "https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/JobSeekers/Index";
const testStageBaseULR =
  "https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users";

test.only("Upload users", async ({ page }) => {
  await page.goto(uatStageBaseULR);
  await page.fill('input[name="userNameOrEmail"]', "mwsadmin");
  await page.fill('input[name="password"]', "?evDFH7YM5MXz8WVmxrR");
  await page.click('input:has-text("Sign in")');
  await page.click("text=upload users");
  await page.setInputFiles('//input[@type="file"]', "upload.csv");
  await page.click(`//input[@value=${parentGroupIDToAssign}]`);
  await page.click(`//input[@value=${groupIDToAssign}]`);
  await page.click('input:has-text("Upload")');
  // await page.click('input:has-text("Import")');

  // Need to check
});
