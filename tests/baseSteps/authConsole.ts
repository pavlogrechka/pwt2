import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../aptem/locators/locatorsConsole';

const authConsole = async (
  { page },
  login = 'mwsadmin',
  password = '?evDFH7YM5MXz8WVmxrR'
) => {
  console.log(`taken Login is = ${login}`);
  console.log(`taken password is = ${password}`);
  await page.goto('https://pavlo-uat.uat.aptem.dev/pwa');
  await page.fill(locatorsConsole.authPage.inputLogin, login);
  await page.click(locatorsConsole.authPage.buttonNext);
  await page.fill(locatorsConsole.authPage.inputPassword, password);
  await page.click(locatorsConsole.authPage.buttonSignIn);
};

export { authConsole };
