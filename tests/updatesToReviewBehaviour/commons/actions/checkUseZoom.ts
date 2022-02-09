import { expect } from '@playwright/test'
import { createReviewForm } from '../locators'

export const checkUseZoom = async ({ page }, param: boolean) => {
  if (!param) return console.log('param was not received');

  await page.click(createReviewForm.useZoomCheckBox)
  expect(page.locator(createReviewForm.useZoomCheckBox).isChecked())
}