import { test } from '@playwright/test'
import ITestInitConfig from '../types'
import { createReviewForm, reviewsGrid } from '../commons/selectors'
import { authConsole } from '../../baseSteps/authConsole';
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
    reviewType: 'Tutor&Learner signatures required',
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

test.describe('72841_case1', () => {

  test.only('one', () => {

  })


  test('second', () => {

  })
})