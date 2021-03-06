import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
import { authConsole } from '../../baseSteps/authConsole';
import ITestInitConfig from './types/index'

const testInitConfig: ITestInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
    url: 'https://review.test2.aptem.dev/pwa/'
  },
  createReview: {
    reviewName: 'testReview',
    programName: 0, /*0 = delivery/onboarding program, 1 = subProgram*/
    reviewType: 'Tutor&Learner signatures required',
    completionMode: 1, /*0 = All evidence accepted, as default; 1 = Tutor decided */
    instructions: '',
    evidenceRequired: true,
    completedBy: '',
    completedByValue: '10/10/2022',
    reviewer: 'TestReview Admin',
    uploadFile: '',
    createTaskFor: '',
    scheduleReview: false,
    scheduleDate: '11-10-2022',
    startTime: '10-00',
    endTime: '10-40',
    useZoom: false,
  },
  others: {
    learnerName: 'Review Learner24',
    groupTitle: 'testReview',
    reviewName: 'testReview',
  }
}

test('test1', async ({ page }) => {
  await authConsole({ page },
    testInitConfig.credential.login,
    testInitConfig.credential.password,
    testInitConfig.credential.url
  );

  await page.click('a:nth-child(2) .d-flex .svg-fill svg');
  let assertion = await page.textContent('h1.my-0');
  expect(assertion).toBe('Learners');
  await page.click(locatorsConsole.learnersGrig.filtersButton);
  await page.click(locatorsConsole.learnersGrig.sidePanelFilters.groupsLabel);
  await page.locator(`nz-tree-node-title>span:has-text('${testInitConfig.others.groupTitle}')`).click();
  await page.waitForLoadState('networkidle');

  //user learner search input field
  await page.fill('#learnerOrInsuranceNumberSearch', testInitConfig.others.learnerName);

  await page.locator(`span:has-text('${testInitConfig.others.learnerName}')`).click();
  await page.locator('//nav/ul/li/a/span[2]/label[text()="Reviews"]').click();
  await page.click('button:has-text("Create Review")');

  await page.fill('input[type="text"]', `${testInitConfig.createReview.reviewName}`);
  await page.click('[formcontrolname="reviewType"]');
  await page.click(`text=${testInitConfig.createReview.reviewType}`);

  // select completion mode

  // if (testInitConfig.review.completionMode === 0) {
  //   await page.click('text=All evidence is accepted')
  // }
  if (testInitConfig.createReview.completionMode === 1) {
    await page.click('text=Completion mode *Tutor decides >> :nth-match(span, 5)')
    await page.click('li[role="option"]:has-text("Tutor decides")')
  }

  await page.click('[formcontrolname="lengthUnit"]');
  await page.click('text=Date');
  await page.type('//input[@role="spinbutton"]', `span:has-text("10-10-2022)`);
  await page.click('[formcontrolname="reviewerId"]');
  await page.click(`text=${testInitConfig.createReview.reviewer}`);

  // schedule review if set to schedule = true;
  if (testInitConfig.createReview.scheduleReview) {
    await page.click('text=Schedule Review now')
    await page.click('text=Review date*')
    await page.type(
      'text=Review date*Start Time*End Time* All day event >> [placeholder="null"]',
      testInitConfig.createReview.scheduleDate)
    await page.type(
      'text=Start Time*End Time* All day event >> [placeholder="null"]',
      testInitConfig.createReview.startTime)
    await page.type(
      ':nth-match([placeholder="null"], 4)',
      testInitConfig.createReview.endTime)
  }

  // set UseZoom options (depends of test config)
  if (testInitConfig.createReview.useZoom) {
    await page.click('#isZoomUsedInput')
  }

  await page.click('text=Save')

  if (`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`) {
    await page.click(`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`)
  } else {
    await page.click('[aria-label="Go to the next page"]')
    await page.click(`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`)
  }

  await page.click('//span[text()="Add Calendars"]')

  await page.click('text=testReview[object Text]')

  // const a = await page.$$('nz-tree-node-checkbox')
  const items = page.locator('nz-tree-node-checkbox')

  const texts = await items.allTextContents();
  console.log(texts)
  // console.log(items.length)

  // for (const elem of a) {
  //   if (!elem.classList.contains('ant-select-tree-checkbox-checked')) {
  //     elem.classList.add('ant-select-tree-checkbox-checked')
  //   }
  // }

  await page.waitForTimeout(5000);
});
