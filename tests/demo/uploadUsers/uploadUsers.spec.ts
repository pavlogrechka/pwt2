import { test } from "@playwright/test";

const uatStageBaseULR =
  "https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/JobSeekers/Index";
const testStageBaseULR =
  "https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users";

test.only("Upload users", async ({ page }) => {
  await page.goto(uatStageBaseULR);
  await page.fill('input[name="userNameOrEmail"]', "mwsadmin");
  await page.fill('input[name="password"]', "?evDFH7YM5MXz8WVmxrR");
  await page.click('input:has-text("Sign in")');
  // await expect(page).toHaveURL(uatStageBaseULR);
  await page.click("text=upload users");
  // await page.click("text=Select file");
  await page.waitForTimeout(1000);

  // await page.setInputFiles("text=Select file", "upload.csv");
  await page.setInputFiles('//input[@type="file"]', "upload.csv");

  // const [fileChooser] = await Promise.all([
  //   page.waitForEvent("filechooser"),
  //   page.click("input#File"),
  // ]);
  // await fileChooser.setFiles("upload.csv");
});
test("Upload users2", async ({ page }) => {
  await page.goto("https://ps.uci.edu/~franklin/doc/file_upload.html");
  await page.waitForTimeout(1000);

  // await page.setInputFiles("text=Select file", "upload.csv");
  await page.setInputFiles('//input[@type="file"]', "./upload.csv");

  await page.waitForTimeout(3000);

  // const [fileChooser] = await Promise.all([
  //   page.waitForEvent("filechooser"),
  //   page.click("input#File"),
  // ]);
  // await fileChooser.setFiles("upload.csv");
});
