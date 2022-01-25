import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../aptem/locators/locatorsConsole';

const switchToClassic = async ({ page }) => {
  await expect(page.locator(locatorsConsole.header.userSettingIcon));
  await page.click(locatorsConsole.header.userSettingIcon);
  await expect(page.locator(locatorsConsole.header.switchBtn));
  await page.click(locatorsConsole.header.switchBtn);
  await expect(page).toHaveURL('https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/Users');
  let assertion = await page.textContent('//td/h1');
  await expect(assertion).toBe('Users');
};

export { switchToClassic };
