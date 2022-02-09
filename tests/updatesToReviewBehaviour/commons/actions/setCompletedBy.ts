import { createReviewForm } from '../locators/index'

export const setCompletedBy = async ({ page },
  completedBy: string,
  completedByValue: string,
) => {
  if (completedBy === 'No set date') {
    await page.click(createReviewForm.completedByDD)
    await page.click(`text=${completedBy}`)
    return
  }

  const dayWeekMonthCondition = completedBy === 'Day'
    || completedBy === 'Week'
    || completedBy === 'Month'

  if (dayWeekMonthCondition) {
    await page.click(createReviewForm.completedByDD)
    await page.click(`text=${completedBy}`)
    await page.fill(createReviewForm.completedByInput, completedByValue);
    return
  }

  if (completedBy === 'Date') {
    await page.click(createReviewForm.completedByDD)
    await page.click(`text=${completedBy}`)
    await page.type(createReviewForm.completedByInput, completedByValue);
    return
  }
}