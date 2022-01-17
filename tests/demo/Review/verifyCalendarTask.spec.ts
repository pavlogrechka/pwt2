import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
import credentials from '../../../aptem/authCredentials/credentialsData.json';
import { authConsole } from '../../baseSteps/authConsole.ts';
import { getDataFromDB } from './getDataFromDB';

const testInitConfig = {
  learnerName: 'User7 Learner',
  reviewName: 'review',
  admins: ['mwsadmin', 'UI Admin', 'SUPER ADMIN'],
};

test('test1', async ({ page }) => {
  const receivedData = await getDataFromDB(testInitConfig.admins);
  console.log(receivedData);

  await authConsole({ page }); /*possible to send login and password as a props*/
  await page.click(locatorsConsole.navigatePanel.learners);
  await page.hover(locatorsConsole.header.userSettingIcon);
  await page.fill(locatorsConsole.learnersGrig.searchInput, testInitConfig.learnerName);
  await page.click(`//span[text()="${testInitConfig.learnerName}"]`);
  await page.click(locatorsConsole.header.menuItemReviews);
  await page.click(locatorsConsole.reviewGrid.row.schedule);

  for await (let admin of receivedData) {
    await page.waitForTimeout(500);
    await page.click(locatorsConsole.reviewGrid.scheduledAssistant.addCalendarsButton);
    await page.fill(locatorsConsole.reviewGrid.scheduledAssistant.searchByName, admin.adminFullName);
    const adminFound = await page.locator('//table[@class="ng-star-inserted"]/tbody[1]/tr[1]/td[2]');
    await expect(adminFound).toContainText(`${admin.adminFullName}`);
    await page.click(locatorsConsole.reviewGrid.scheduledAssistant.checkBox);
    await page.click(locatorsConsole.reviewGrid.scheduledAssistant.addCalendarsButton2);
  }

  let row: number = 4;
  for await (let admin of receivedData) {
    const adminName = await page.locator(`//tr[${row}]//img[@alt="user"]/following-sibling::span`);
    await expect(adminName).toContainText(`${admin.adminFullName}`);

    const currentCaseload = await page.locator(`//tr[${row}]//div/div[2]/span`);
    !admin.adminCurrentCaseLoad ? (admin.adminCurrentCaseLoad = '-') : (admin.adminCurrentCaseLoad = admin.adminCurrentCaseLoad + '');
    await expect(currentCaseload).toContainText(`${admin.adminCurrentCaseLoad}`);

    const caseLoadCapacity = await page.locator(`//tr[${row}]//div/div[3]/span`);
    !admin.adminCaseLoadCapacity ? (admin.adminCaseLoadCapacity = '-') : (admin.adminCaseLoadCapacity = admin.adminCaseLoadCapacity + '');
    await expect(caseLoadCapacity).toContainText(`${admin.adminCaseLoadCapacity}`);

    await row++;
  }

  // await page.hover('//td[@data-slot-index="3:0:8"]');
  // // await page.click('//td[@data-slot-index="3:0:8"]');
  // await page.waitForTimeout(500);
  // await page.hover('//td[@data-slot-index="4:0:8"]');
  // // await page.click('//td[@data-slot-index="4:0:8"]');
  // await page.waitForTimeout(500);
});
