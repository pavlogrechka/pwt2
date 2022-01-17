import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("hi");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://pavlogrechka.test.aptem.co.uk/pwa/");
  // const title = await page.title();
  // expect(title).toBe("Aptem");
  // const h1 = await page.innerText("h1");
  // expect(h1).toBe("Please sign in to continue.");

  await page.fill('input[name="userName"]', "mwsadmin");
  await page.click("text=Next");
  await page.fill('input[name="password"]', "?evDFH7YM5MXz8WVmxrR");
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://pavlogrechka.test.aptem.co.uk/pwa/caseload-dashboard' }*/),
    page.click('button:has-text("Sign in")'),
  ]);
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "storageState.json" });
  console.log("saved");
  await browser.close();
}
export default globalSetup;
