import { test, expect } from '@playwright/test';
import { authConsole } from '../../baseSteps/authConsole';
import ITestInitConfig from '../types/index'

const getDate = () => {
  const date = new Date()
  const created = 'created:' + date.toLocaleDateString('en-gb')
  const reviewId = 'id:' + date.getTime()
  const currentDate = created + ' ' + reviewId
  return currentDate
}

const testInitConfig: ITestInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
    url: 'https://review.test2.aptem.dev/pwa/learners/19766/reviews/upcoming'
  },
  createReview: {
    reviewName: `72852 case#2 ${getDate()}`,
    programName: 0, /*0 = delivery/onboarding program, 1 = subProgram*/
    reviewType: 'Tutor&Learner signatures required',
    completionMode: 0, /*0 = All evidence accepted, as default; 1 = Tutor decided */
    instructions: '',
    evidenceRequired: true,
    completedBy: '',
    completedByValue: '10-02-2022',
    reviewer: 'TestReview Admin',
    uploadFile: '',
    createTaskFor: '',
    scheduleReview: true,
    scheduleDate: '11-03-2022',
    startTime: '10-00',
    endTime: '10-40',
    useZoom: true,
  },
  others: {
    learnerName: 'Review Learner26',
    groupTitle: 'testReview',
    waitForSelectorTimeout: 5000,
  }
}

test('72852case2', async ({ page }) => {
  await authConsole({ page },
    testInitConfig.credential.login,
    testInitConfig.credential.password,
    testInitConfig.credential.url
  );

  const createReviewBtn = 'button:has-text("Create Review")';
  await page.waitForSelector(createReviewBtn)
  await page.click(createReviewBtn);

  await page.fill('input[type="text"]', `${testInitConfig.createReview.reviewName}`);
  await page.click('[formcontrolname="reviewType"]');
  await page.click(`text=${testInitConfig.createReview.reviewType}`);

  // set completion mode
  if (testInitConfig.createReview.completionMode === 1) {
    await page.click('text=Completion mode *Tutor decides >> :nth-match(span, 5)')
    await page.click('li[role="option"]:has-text("Tutor decides")')
  }

  // set completed by
  await page.click('[formcontrolname="lengthUnit"]');
  await page.click('text=Date');
  await page.type('//input[@role="spinbutton"]',
    `span:has-text("${testInitConfig.createReview.completedByValue}")`);

  // set Reviewer
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

  // set UseZoom options true = check UseZoom
  if (testInitConfig.createReview.useZoom) {
    await page.click('#isZoomUsedInput')
  }

  await page.click('text=Save')

  const startReviewBtn = `//tr/td/p[text()="${testInitConfig.createReview.reviewName}"]/../../td//button[text()="Start"]`
  await (await page.waitForSelector(startReviewBtn, { timeout: testInitConfig.others.waitForSelectorTimeout })).click()

  await page.waitForTimeout(testInitConfig.others.waitForSelectorTimeout)
  const startZoomMeetingBtn = page.locator('//button[text()=" Start Meeting "]')
  await expect(startZoomMeetingBtn).toBeHidden()

});
