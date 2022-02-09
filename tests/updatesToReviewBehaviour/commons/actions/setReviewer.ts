import { createReviewForm } from '../locators'

export const setReviewer = async ({ page }, reviewer: string | null) => {
  await page.click(createReviewForm.reviewerDD)
  await page.click(`text=${reviewer}`)
}