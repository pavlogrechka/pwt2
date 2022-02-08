import { test, expect } from '@playwright/test';
// import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
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
    reviewName: `Review ${getDate()}`,
    programName: 0, /*0 = delivery/onboarding program, 1 = subProgram*/
    reviewType: 'Tutor&Learner signatures required',
    completionMode: 1, /*0 = All evidence accepted, as default; 1 = Tutor decided */
    instructions: '',
    evidenceRequired: true,
    completedBy: '',
    completedByValue: '10-03-2022',
    reviewer: 'TestReview Admin',
    uploadFile: '',
    createTaskFor: '',
    scheduleReview: true,
    scheduleDate: '11-03-2022',
    startTime: '10-00',
    endTime: '10-40',
    useZoom: false,
  },
  others: {
    learnerName: 'Review Learner24',
    groupTitle: 'testReview',
    waitForSelectorTimeout: 5000,
  }
}

test('test1', async ({ page }) => {

  await authConsole({ page },
    testInitConfig.credential.login,
    testInitConfig.credential.password,
    testInitConfig.credential.url
  );

  const list3 = page.locator('.k-master-row')


  await list3.evaluate(list => console.log('str infoo', list));




});
