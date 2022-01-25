import { test, expect } from '@playwright/test';
import { locatorsClassic } from '../../aptem/locators/locatorsClassic';

const authClassic = async ({ page }, login = 'mwsadmin', password = '?evDFH7YM5MXz8WVmxrR') => {
  console.log(`taken Login is = ${login}`);
  console.log(`taken password is = ${password}`);
  await page.goto('https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/Users');
  await page.fill(locatorsClassic.authPage.inputLogin, login);
  await page.fill(locatorsClassic.authPage.inputPassword, password);
  await page.click(locatorsClassic.authPage.buttonSignIn);
  await expect(page).toHaveURL('https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/Users');
};

export { authClassic };
