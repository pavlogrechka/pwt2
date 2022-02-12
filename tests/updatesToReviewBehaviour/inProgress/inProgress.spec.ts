import { test, expect } from '@playwright/test';
import { authConsole } from '../../baseSteps/authConsole';
import { createReviewForm, reviewsGrid } from '../commons/selectors'
import ITestInitConfig from '../types/index'
import {
  scheduleReview,
  setCompletionMode,
  setCompletedBy,
  getDateForName,
  setReviewer,
  checkUseZoom,
  setReviewType
} from '../commons/actions';

export const testInitConfig: ITestInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
    url: 'https://review.test2.aptem.dev/pwa/learners/19766/reviews/upcoming'
  },
  createReview: {
    reviewName: `72852 case#1 ${getDateForName()}`,
    programName: 0, /*0 = delivery/onboarding program, 1 = subProgram*/
    reviewType: '1/19/2022_visibleToAll_adv+participant_sign',
    completionMode: 1, /*0 = All evidence accepted, as default; 1 = Tutor decided */
    instructions: '',
    evidenceRequired: true,
    // completedBy: 'No set date',
    completedBy: 'Day',
    completedByValue: '11', /* if value == date input template == 11-02-2022; else string number*/
    reviewer: 'MWSadmin Test',
    uploadFile: '',
    createTaskFor: '',
    scheduleReview: true,
    scheduleDate: '11-02-2022',
    startTime: '12-00',
    endTime: '13-40',
    useZoom: false, /* single boolean param probably better to send directly in function */
  },
  others: {
    learnerName: 'Review Learner26',
    groupTitle: 'testReview',
    waitForSelectorTimeout: 3000,
  }
}

test('test1', async ({ page }) => {
  await authConsole(
    { page },
    testInitConfig.credential.login,
    testInitConfig.credential.password,
    testInitConfig.credential.url,
  );

  await (await page.waitForSelector(reviewsGrid.createReviewBtn)).click()

  await page.fill(createReviewForm.reviewNameInput, `${testInitConfig.createReview.reviewName}`);

  await setReviewType({ page }, testInitConfig.createReview.reviewType)

  await setCompletionMode({ page }, testInitConfig.createReview.completionMode)

  await setCompletedBy(
    { page },
    testInitConfig.createReview.completedBy,
    testInitConfig.createReview.completedByValue,
  )

  await setReviewer({ page }, testInitConfig.createReview.reviewer)

  await scheduleReview({ page },
    testInitConfig.createReview.scheduleReview,
    testInitConfig.createReview.scheduleDate,
    testInitConfig.createReview.startTime,
    testInitConfig.createReview.endTime
  )

  await checkUseZoom({ page }, testInitConfig.createReview.useZoom)

  await page.click('text=Save')

  // await page.waitForTimeout(3000)

  const learningPlanNavBtn = '//label[text()="Learning Plan"]'
  await page.waitForSelector(learningPlanNavBtn)
  await page.locator(learningPlanNavBtn).click()

  const clearFiltersButton = '//div/button[position()=1]//span[contains(text(),"Filters")]/..//button'
  if (await page.isVisible(clearFiltersButton)) {
    await page.click(clearFiltersButton)
  }

  await page.locator('//button//span[text()=" Expand all"]').click()

  const learningPlanItem = `//button/div/p[text()="${testInitConfig.createReview.reviewName}"]`
  await page.hover(clearFiltersButton)
  await page.locator(learningPlanItem).click()

  expect(page.locator(learningPlanItem)).toHaveText('')
  expect(page.locator(learningPlanItem).isVisible())

  // const learningPlanItemStatus = `//button/div/p[text()="${testInitConfig.createReview.reviewName}"]/../..//div/div[text()="${itemStatus}"]`
  // await page.locator(learningPlanItemStatus).click()


  // const learningPlanItemStatusAddInfoBar = `//review-status-badge/span[text()="In Progress"]`

  // const rescheduleButton = `//review-schedule-state//div/div/button//span`

  // const scheduleButton = `//review-schedule-state/button//span`

  // await page.waitForLoadState('domcontentloaded')

});

