import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
import { locatorsClassic } from '../../../aptem/locators/locatorsClassic';
import credentials from '../../../aptem/authCredentials/credentialsData.json';
import { authConsole } from '../../baseSteps/authConsole';
import { switchToClassic } from '../../baseSteps/switchToClassic';
// import { getAddedAdminsData } from './getAddedAdminsData';
// import { getCurrentAdminsData } from './getCurrentAdminsData';

const testInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
  },
  learner: [
    {
      id: '132',
      login: 'aptem1211+autoTester1@gmail.com',
      fullName: 'FirstName1 LastName1',
      email: 'aptem1211+autoTester1@gmail.com',
      programName: 'PreReleaseTest 12/13/2021 Onboarding',
    },
  ],
};

test('test1', async ({ page }) => {
  // const receivedData = await getAddedAdminsData(testInitConfig.addAdminToCalendar);
  // const receivedCurrentAdminsData = await getCurrentAdminsData(testInitConfig.credential.login);
  // console.log(receivedData);
  // console.log(receivedCurrentAdminsData);

  await authConsole({ page }, testInitConfig.credential.login, testInitConfig.credential.password); /*possible to send login and password as a props*/
  await switchToClassic({ page });

  await page.fill(locatorsClassic.learnersPage.emailSearch, testInitConfig.learner[0].email);
  await page.click(locatorsClassic.learnersPage.searchButton);
  await page.click(`${locatorsClassic.learnersPage.foundLearnerLinkToProfile}td/a[text()="${testInitConfig.learner[0].fullName}"]`);

  // console.log(testInitConfig.learner.id);

  await expect(page).toHaveURL(`https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/JobSeekerProfile/Index/${testInitConfig.learner[0].id}`);
  let assertion = await page.locator('//table[contains(@class,"SeekersForm ContactDetails")]');
  await expect(assertion).toContainText(`${testInitConfig.learner[0].email}`);

  await page.click(locatorsClassic.learnerProfile.applyButton);
  await page.click(locatorsClassic.learnerProfile.applyProgramForm.programTypeListOpen);

  page.waitForTimeout(1000);
  await page.click(locatorsClassic.learnerProfile.applyProgramForm.programTypeOnboarding);

  await page.fill(locatorsClassic.learnerProfile.applyProgramForm.programSearchInput, testInitConfig.learner[0].programName);
  await page.click(`text=${testInitConfig.learner[0].programName}`);
  page.waitForTimeout(3000);

  await page.click(locatorsClassic.learnerProfile.applyProgramForm.programStatusOpen);
  await page.click(locatorsClassic.learnerProfile.applyProgramForm.programStatusOnboarding);

  await page.click();
});

// test('test', async ({ page }) => {

//   // Go to https://pavlo-uat.uat.aptem.dev/Users/Account/AccessDenied?ReturnUrl=%2FMWS.ClientAdmin%2FJobSeekerProfile%2FIndex%2F132
//   await page.goto('https://pavlo-uat.uat.aptem.dev/Users/Account/AccessDenied?ReturnUrl=%2FMWS.ClientAdmin%2FJobSeekerProfile%2FIndex%2F132');

//   // Click input[name="userNameOrEmail"]
//   await page.click('input[name="userNameOrEmail"]');

//   // Fill input[name="userNameOrEmail"]
//   await page.fill('input[name="userNameOrEmail"]', 'mwsadmin');

//   // Click input:has-text("Sign in")
//   await page.click('input:has-text("Sign in")');
//   await expect(page).toHaveURL('https://pavlo-uat.uat.aptem.dev/Users/Account/LogOn?ReturnUrl=%2FMWS.ClientAdmin%2FJobSeekerProfile%2FIndex%2F132');

//   // Click text=Ok
//   await page.click('text=Ok');

//   // Double click input[name="userNameOrEmail"]
//   await page.dblclick('input[name="userNameOrEmail"]');

//   // Click input[name="userNameOrEmail"]
//   await page.click('input[name="userNameOrEmail"]');

//   // Click input[name="password"]
//   await page.click('input[name="password"]');

//   // Fill input[name="password"]
//   await page.fill('input[name="password"]', '?evDFH7YM5MXz8WVmxrR');

//   // Go to https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/JobSeekerProfile/Index/132
//   await page.goto('https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/JobSeekerProfile/Index/132');

//   // Click ul[role="tree"] a:has-text("Programme")
//   await page.click('ul[role="tree"] a:has-text("Programme")');

//   // Click text=apply
//   await page.click('text=apply');

//   // Click text=Programme Type: Programme: select Programme Status: Start date: End date: >> span[role="option"]
//   await page.click('text=Programme Type: Programme: select Programme Status: Start date: End date: >> span[role="option"]');

//   // Click li[role="option"]:has-text("Onboarding")
//   await page.click('li[role="option"]:has-text("Onboarding")');

//   // Click input[role="textbox"]
//   await page.click('input[role="textbox"]');

//   // Fill input[role="textbox"]
//   await page.fill('input[role="textbox"]', 'PreRelease');

//   // Click text=PreReleaseTest 12/13/2021 Onboarding
//   await page.click('text=PreReleaseTest 12/13/2021 Onboarding');

//   // Click text=Programme Status: Onboarding >> [aria-label="select"] span
//   await page.click('text=Programme Status: Onboarding >> [aria-label="select"] span');

//   // Click text=OnboardingReady to enrolOn probationActiveNon starterUnder reviewOn maternity br >> li[role="option"]
//   await page.click('text=OnboardingReady to enrolOn probationActiveNon starterUnder reviewOn maternity br >> li[role="option"]');

// });
