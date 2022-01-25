import { test, expect } from '@playwright/test';
import { locatorsClassic } from '../../../aptem/locators/locatorsClassic.ts';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole.ts';
import credentials from '../../../aptem/authCredentials/credentialsData.json';
import { authConsole } from '../../baseSteps/authConsole.ts';

const testInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
  },
  learners: [
    {
      id: '132',
      login: 'aptem1211+autoTester1@gmail.com',
      email: 'aptem1211+autoTester1@gmail.com',
      programName: 'PreReleaseTest 12/13/2021 Onboarding',
    },
    {
      id: '133',
      login: 'aptem1211+autoTester2@gmail.com',
      email: 'aptem1211+autoTester2@gmail.com',
      programName: 'PreReleaseTest 12/13/2021 Delivery',
    },
    {
      id: '134',
      login: 'aptem1211+autoTester3@gmail.com',
      email: 'aptem1211+autoTester3@gmail.com',
      programName: 'PreReleaseTest 12/13/2021 Delivery',
      SubProgramName: 'PreReleaseTest 12/13/2021 SubProgramme',
    },
  ],
};

const programName = 'PreReleaseTest 12/13/2021 Onboarding';
const users = {
  userFirstName: `FirstName3`,
  userLastName: `LastName3`,
  userEmail: `aptem1211+autoTester3@gmail.com`,
};

let testNumber = 0;
for (let learner of testInitConfig.learners) {
  test(`asd${testNumber}`, async () => {
    console.log(testNumber);
    console.log(learner.email);
    console.log(learner.programName);
    // testNumber++;
  });
  testNumber++;
}

// test.beforeEach(async ({ page }) => {
//   await authConsole({ page }, testInitConfig.admin.login, testInitConfig.admin.password);
// });

// test.only('enroll Onboarding program from Classic', async ({ page }) => {
//   await page.click(locatorsConsole.header.userSettingIcon);
//   await page.click(locatorsConsole.header.switchBtn);
//   expect(await page.innerText('h1')).toBe('Users');
//   await page.waitForTimeout(1000);
//   await page.fill(locatorsClassic.learnersPage.emailSearch, `${users.userEmail}`);
//   await page.click(locatorsClassic.learnersPage.searchButton);
//   await page.click(`//a[text()="${users.userFirstName} ${users.userLastName}"]`);
//   await page.click(locatorsClassic.learnerProfile.applyButton);
//   await page.click(locatorsClassic.learnerProfile.programTypeSelect);
//   await page.click(locatorsClassic.learnerProfile.programTypeOnboarding);
//   await page.click(locatorsClassic.learnerProfile.programSelect);
//   await page.click(`text=${programName}`);
//   await page.waitForTimeout(1000);
//   await page.waitForSelector('//*[@id="apply-program-container"]/form/div[2]/div[1]/table/tbody/tr[4]/td[2]/span[1]/span/input');
//   await page.click('text=Save');
//   await page.click('ul[role="tree"] a:has-text("Programme")');
//   expect(await page.innerText('//*[@id="panelbar"]/li[7]/div/div/table[1]/tbody/tr[2]/th/span')).toBe('PreReleaseTest 12/13/2021 Onboarding');
// });

// test('enroll Delivery program from Classic', async ({ page }) => {
//   await page.click(locatorsConsole.header.userSettingIcon);
//   await page.click(locatorsConsole.header.switchBtn);
//   expect(await page.innerText('h1')).toBe('Users');
//   await page.waitForTimeout(1000);
//   await page.fill(locatorsClassic.learnersPage.emailSearch, `${users.userEmail}`);
//   await page.click(locatorsClassic.learnersPage.searchButton);
//   await page.click(`//a[text()="${users.userFirstName} ${users.userLastName}"]`);
//   await page.click(locatorsClassic.learnerProfile.applyButton);
//   await page.click(locatorsClassic.learnerProfile.programTypeSelect);
//   await page.click(locatorsClassic.learnerProfile.programTypeOnboarding);
//   await page.click(locatorsClassic.learnerProfile.programSelect);
//   await page.click(`text=${programName}`);
//   await page.waitForTimeout(1000);
//   await page.waitForSelector('//*[@id="apply-program-container"]/form/div[2]/div[1]/table/tbody/tr[4]/td[2]/span[1]/span/input');
//   await page.click('text=Save');
//   await page.click('ul[role="tree"] a:has-text("Programme")');
//   expect(await page.innerText('//*[@id="panelbar"]/li[7]/div/div/table[1]/tbody/tr[2]/th/span')).toBe('PreReleaseTest 12/13/2021 Onboarding');
// });

// test('enroll SubProgram with Delivery program from Classic', async ({ page }) => {
//   await page.click(locatorsConsole.header.userSettingIcon);
//   await page.click(locatorsConsole.header.switchBtn);
//   expect(await page.innerText('h1')).toBe('Users');
//   await page.waitForTimeout(1000);
//   await page.fill(locatorsClassic.learnersPage.emailSearch, `${users.userEmail}`);
//   await page.click(locatorsClassic.learnersPage.searchButton);
//   await page.click(`//a[text()="${users.userFirstName} ${users.userLastName}"]`);
//   await page.click(locatorsClassic.learnerProfile.applyButton);
//   await page.click(locatorsClassic.learnerProfile.programTypeSelect);
//   await page.click(locatorsClassic.learnerProfile.programTypeOnboarding);
//   await page.click(locatorsClassic.learnerProfile.programSelect);
//   await page.click(`text=${programName}`);
//   await page.waitForTimeout(1000);
//   await page.waitForSelector('//*[@id="apply-program-container"]/form/div[2]/div[1]/table/tbody/tr[4]/td[2]/span[1]/span/input');
//   await page.click('text=Save');
//   await page.click('ul[role="tree"] a:has-text("Programme")');
//   expect(await page.innerText('//*[@id="panelbar"]/li[7]/div/div/table[1]/tbody/tr[2]/th/span')).toBe('PreReleaseTest 12/13/2021 Onboarding');
// });
