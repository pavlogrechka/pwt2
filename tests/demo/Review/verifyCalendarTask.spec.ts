import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
import credentials from '../../../aptem/authCredentials/credentialsData.json';
import { authConsole } from '../../baseSteps/authConsole';
import { getAddedAdminsData } from './getAddedAdminsData';
import { getCurrentAdminsData } from './getCurrentAdminsData';

const testInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
  },
  learnerName: 'User7 Learner',
  reviewName: 'case capacity',
  addAdminToCalendar: ['UI Admin', 'SUPER ADMIN'],
};

test('test1', async ({ page }) => {
  const receivedData = await getAddedAdminsData(testInitConfig.addAdminToCalendar);
  const receivedCurrentAdminsData = await getCurrentAdminsData(testInitConfig.credential.login);
  console.log(receivedData);
  console.log(receivedCurrentAdminsData);

  await authConsole({ page }, testInitConfig.credential.login, testInitConfig.credential.password); /*possible to send login and password as a props*/
  await page.click(locatorsConsole.navigatePanel.learners);
  await page.hover(locatorsConsole.header.userSettingIcon);
  await page.fill(locatorsConsole.learnersGrig.searchInput, testInitConfig.learnerName);
  await page.click(`//span[text()="${testInitConfig.learnerName}"]`);
  await page.click(locatorsConsole.header.menuItemReviews);
  // await page.click(locatorsConsole.reviewGrid.row.schedule);
  await page.click(`//td//*[text()="${testInitConfig.reviewName}"]/../../td[5]//a`);

  for await (let admin of receivedData) {
    await page.waitForTimeout(700);
    await page.click(locatorsConsole.reviewGrid.scheduledAssistant.addCalendarsButton);
    await page.fill(locatorsConsole.reviewGrid.scheduledAssistant.searchByName, admin.adminFullName);
    const adminFound = await page.locator('//table[@class="ng-star-inserted"]/tbody[1]/tr[1]/td[2]');
    await expect(adminFound).toContainText(`${admin.adminFullName}`);
    await page.click(locatorsConsole.reviewGrid.scheduledAssistant.checkBox);
    await page.click(locatorsConsole.reviewGrid.scheduledAssistant.addCalendarsButton2);
  }

  const adminName = await page.locator(`//tr[3]//img[@alt="user"]/following-sibling::span`);
  await expect(adminName).toContainText(`${receivedCurrentAdminsData[0].adminFullName}`);

  const currentCaseload = await page.locator(`//tr[3]//div/div[2]/span`);
  !receivedCurrentAdminsData[0].adminCurrentCaseLoad
    ? (receivedCurrentAdminsData[0].adminCurrentCaseLoad = '-')
    : (receivedCurrentAdminsData[0].adminCurrentCaseLoad = receivedCurrentAdminsData[0].adminCurrentCaseLoad + '');
  await expect(currentCaseload).toContainText(`${receivedCurrentAdminsData[0].adminCurrentCaseLoad}`);

  const caseLoadCapacity = await page.locator(`//tr[3]//div/div[3]/span`);
  !receivedCurrentAdminsData[0].adminCaseLoadCapacity
    ? (receivedCurrentAdminsData[0].adminCaseLoadCapacity = '-')
    : (receivedCurrentAdminsData[0].adminCaseLoadCapacity = receivedCurrentAdminsData[0].adminCaseLoadCapacity + '');
  await expect(caseLoadCapacity).toContainText(`${receivedCurrentAdminsData[0].adminCaseLoadCapacity}`);

  let row: number = 4;
  for await (let admin of receivedData) {
    // console.log(admin.adminFullName);
    const adminName = await page.locator(`//tr[${row}]//img[@alt="user"]/following-sibling::span`);
    await expect(adminName).toContainText(`${admin.adminFullName}`);

    // console.log(admin.adminCurrentCaseLoad);
    const currentCaseload = await page.locator(`//tr[${row}]//div/div[2]/span`);
    !admin.adminCurrentCaseLoad ? (admin.adminCurrentCaseLoad = '-') : (admin.adminCurrentCaseLoad = admin.adminCurrentCaseLoad + '');
    await expect(currentCaseload).toContainText(`${admin.adminCurrentCaseLoad}`);

    // console.log(admin.adminCaseLoadCapacity);
    const caseLoadCapacity = await page.locator(`//tr[${row}]//div/div[3]/span`);
    !admin.adminCaseLoadCapacity ? (admin.adminCaseLoadCapacity = '-') : (admin.adminCaseLoadCapacity = admin.adminCaseLoadCapacity + '');
    await expect(caseLoadCapacity).toContainText(`${admin.adminCaseLoadCapacity}`);

    await row++;
  }
});
