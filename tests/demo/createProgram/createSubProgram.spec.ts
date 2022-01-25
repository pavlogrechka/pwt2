import { test, expect } from '@playwright/test';
import { authClassic } from '../../baseSteps/authClassic';
import { locatorsClassic } from '../../../aptem/locators/locatorsClassic';

const testInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
  },
  programType: 'Sub-programme',
  programName: `Sub-programme Program name ${Date.now()}`,
  programDescription: `Sub-programme Program name ${Date.now()} created by Playwright`,
};

test('test', async ({ page }) => {
  authClassic({ page }, testInitConfig.credential.login, testInitConfig.credential.password);

  await page.click('i');
  await page.click('a:has-text("Programmes")');
  await expect(page).toHaveURL('https://pavlo-uat.uat.aptem.dev/MWS.PerformanceManager/ClientProgram');
  await page.click('text=Create');
  await page.click(`//ul/li/span[text()="${testInitConfig.programType}"]`);
  await page.click(locatorsClassic.clientProgram.yesButton);

  await page.fill(locatorsClassic.clientProgram.programNameInput, testInitConfig.programName);
  await page.fill(locatorsClassic.clientProgram.programDescriptionTextArea, testInitConfig.programDescription);

  await page.click('input:has-text("Confirm")');
  await page.click('input:has-text("Yes")');

  await page.fill('input[name="Name"]', testInitConfig.programName);
  await page.click('text=Name: See archived: Tags: Programme types: Search Reset >> :nth-match(div, 4)');
  await page.click('li[role="option"]:has-text("Delivery")');
  await page.click('text=DeliveryNoneOnboardingDeliverySub-programme >> span[role="button"]');
  await page.click('text=Search');
  await page.click(':nth-match(img, 4)');
});
