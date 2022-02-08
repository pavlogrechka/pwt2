import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
import { authConsole } from '../../baseSteps/authConsole';
import ITestInitConfig from './types/index'

const testInitConfig: ITestInitConfig = {
  credential: {
    login: 'mwsadmin',
    password: '?evDFH7YM5MXz8WVmxrR',
    url: 'https://review.test2.aptem.dev/pwa/learners/19764/reviews/upcoming'
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



  if (`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`) {
    await page.click(`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`)
  } else {
    await page.click('[aria-label="Go to the next page"]')
    await page.click(`//td/p[text()="${testInitConfig.createReview.reviewName}"]/../..//a`)
  }

  await page.click('//span[text()="Add Calendars"]')

  await page.click('text=testReview[object Text]')

  // const a = await page.$$('nz-tree-node-checkbox')
  const items = page.$$('nz-tree-node-checkbox')

  console.log(items)

  // const texts = await items.allTextContents();
  // console.log(texts)
  // console.log(items.length)

  // for (const elem of a) {
  //   if (!elem.classList.contains('ant-select-tree-checkbox-checked')) {
  //     elem.classList.add('ant-select-tree-checkbox-checked')
  //   }
  // }

  await page.waitForTimeout(5000);
});
