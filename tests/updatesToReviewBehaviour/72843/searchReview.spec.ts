import { test, expect, chromium } from '@playwright/test';
import { authConsole } from '../../baseSteps/authConsole';
import ITestInitConfig from '../types/index'

const testInitConfig: ITestInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
    url: 'https://review.test2.aptem.dev/pwa/learners/19766/reviews/upcoming'
  },
  createReview: {
    reviewName: 'AllSection',
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
  }
}

test('test2', async ({ page }) => {

  await authConsole({ page },
    testInitConfig.credential.login,
    testInitConfig.credential.password,
    testInitConfig.credential.url
  );

  await page.hover('p:has-text("testReview")')

  const currentReview = page.locator(`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`)
  console.log(!!currentReview.isVisible())

  while (!currentReview.isVisible()) {
    await page.click('[aria-label="Go to the next page"]')
  }

  // if (`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`) {
  //   await page.click(`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`)
  // } else {
  //   await page.click('[aria-label="Go to the next page"]')
  //   await page.click(`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`)
  // }

})