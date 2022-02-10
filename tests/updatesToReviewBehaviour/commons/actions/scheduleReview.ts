import { createReviewForm } from '../selectors'

export const scheduleReview = async ({ page },
  param: boolean,
  scheduleDate: string,
  startTime: string,
  endTime: string,
) => {
  if (!param) return;

  await page.click(createReviewForm.scheduleReviewCheckBox);
  await page.click(createReviewForm.reviewDateLabel);
  await page.type(createReviewForm.startTimeInput, scheduleDate);
  await page.click(createReviewForm.startTimeLabel);
  await page.type(createReviewForm.startTimeInput, startTime);
  await page.click(createReviewForm.endTimeLabel);
  await page.type(createReviewForm.endTimeInput, endTime);
}