import { createReviewForm } from '../selectors'

export const setReviewType = async ({ page },
  reviewType: string,
) => {
  await page.locator(createReviewForm.reviewTypeDD).click()
  await page.locator(`kendo-popup >> text=${reviewType}`).click()
}