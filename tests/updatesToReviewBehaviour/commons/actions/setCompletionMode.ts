export const setCompletionMode = async ({ page },
  completionMode,
) => {
  if (!completionMode) return

  await page.click('text=Completion mode *Tutor decides >> :nth-match(span, 5)')
  await page.click('li[role="option"]:has-text("Tutor decides")')
}