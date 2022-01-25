import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
import credentials from '../../../aptem/authCredentials/credentialsData.json';
import { authConsole } from '../../baseSteps/authConsole';
// import { getAddedAdminsData } from './getAddedAdminsData';
// import { getCurrentAdminsData } from './getCurrentAdminsData';

const testInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
  },
  learner: {
    id: '68',
    login: 'aptem1211+uatCsvLearner10@gmail.com',
    fullName: 'Learner10 CreatedByCSV',
    email: 'aptem1211+uatCsvLearner10@gmail.com',
    programName: 'PreReleaseTest 12/13/2021 Onboarding',
  },
};

test('test1', async ({ page }) => {
  authConsole({ page }, testInitConfig.credential.login, testInitConfig.credential.password);

  await page.click(locatorsConsole.navigatePanel.learners);
  await page.fill(locatorsConsole.learnersGrig.searchInput, testInitConfig.learner.fullName);
  await page.click(`//tr/td//span[text()="${testInitConfig.learner.fullName}"]`);

  await page.click(locatorsConsole.learnerDashboard.learnerProfileButton);
  await page.click(locatorsConsole.learnerDashboard.addProgrammeButton);
  await page.click('span[role="listbox"] span');
  await page.click('li[role="option"]:has-text("Onboarding")');
  await page.click('input[role="combobox"]');
  await page.click(`text=${testInitConfig.learner.programName}`);
  await page.click('text=Enrol');

  let assert = await page.locator('//span[contains(@class,"text-navy text-capitalize")]').textContent();
  expect(assert).toBe(testInitConfig.learner.programName);
});
