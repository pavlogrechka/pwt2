import { test, expect } from '@playwright/test';
import { authClassic } from '../../baseSteps/authClassic';
import { locatorsClassic } from '../../../aptem/locators/locatorsClassic';

const testInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
  },
  programType: 'Delivery',
  programName: `Delivery Program name ${Date.now()}`,
  programDescription: `Delivery Program name ${Date.now()} created by Playwright`,
};

test('test', async ({ page }) => {
  authClassic({ page }, testInitConfig.credential.login, testInitConfig.credential.password);

  await page.click('i');
  await page.click('a:has-text("Programmes")');
  await expect(page).toHaveURL('https://pavlo-uat.uat.aptem.dev/MWS.PerformanceManager/ClientProgram');
  await page.click('text=Create');
  await page.click(`//ul/li/span[text()="${testInitConfig.programType}"]`);
  await page.click(locatorsClassic.clientProgram.yesButton);
  await page.locator('//h1[text()="Programme builder"]');
  await page.fill(locatorsClassic.clientProgram.programNameInput, testInitConfig.programName);
  await page.fill(locatorsClassic.clientProgram.programDescriptionTextArea, testInitConfig.programDescription);
  await page.click('//*[@aria-owns="Program_DeliveryType_listbox"]');
  await page.click('//ul[@id="Program_DeliveryType_listbox"]/li[text()="Training - Apprenticeship"]');
  await page.click('//div[@data-program-component="ILR"]');
  await page.click('//li/a[text()="Template"]');
  await page.click('//div[@class="wizardForm-row"]//span[text()="Programme type:"]/..//span[@role="option"]');
  await page.click('//li[text()="25 - Apprenticeship standard"]');
  await page.click('//button[text()="Add new"]/../..//div[text()="List of aim references"]');
  await page.click('#ilrForm >> text=Add new');
  await page.click('text=Aim reference: Aim type: 1 - Programme aim3 - Component learning aim within a pr >> :nth-match(div, 4)');
  await page.click('li:has-text("1 - Programme aim")');
  await page.click('#ilrForm >> :nth-match(:text("Add new"), 2)');
  await page.click('text=Type: TNP - Total negotiated pricePMR - Payment recordADP - Additional Payment C >> :nth-match(div, 3)');
  await page.click('li:has-text("TNP - Total negotiated price")');
  await page.fill('input[name="ko_unique_7"]', '10');
  await page.click('div#ilr-editor>div:nth-of-type(3)>div:nth-of-type(2)');
  await page.click('.pb-com.prog-com-ow .pb-com-indicator .indicator');
  await page.click('#ui-id-27');
  await page.click('text=preview Competencies/Skills Radar >> label');
  await page.click('text=preview PLR/Personal Learning Record >> label');
  await page.click('#ow-editor >> text=Confirm');
  await page.click('text=Confirm');
  await expect(page).toHaveURL('https://pavlo-uat.uat.aptem.dev/MWS.PerformanceManager/ClientProgram');
  await page.fill('input[name="Name"]', testInitConfig.programName);
  await page.click('text=Name: See archived: Tags: Programme types: Search Reset >> :nth-match(div, 4)');
  await page.click('li[role="option"]:has-text("Delivery")');
  await page.click('text=DeliveryNoneOnboardingDeliverySub-programme >> span[role="button"]');
  await page.click('text=Search');
  await page.click(':nth-match(img, 4)');
});
