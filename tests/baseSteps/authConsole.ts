import { locatorsConsole } from '../../aptem/locators/locatorsConsole';

const authConsole = async ({ page }, login: string = 'mwsadmin', password: string = '?evDFH7YM5MXz8WVmxrR', url: string = 'playwright.dev') => {
  console.log(`taken Login is = ${login}`);
  console.log(`taken password is = ${password}`);
  console.log(`taken url is = ${url}`);
  await page.goto(url);
  await page.fill(locatorsConsole.authPage.inputLogin, login);
  await page.click(locatorsConsole.authPage.buttonNext);
  await page.fill(locatorsConsole.authPage.inputPassword, password);
  await page.click(locatorsConsole.authPage.buttonSignIn);
};

export { authConsole };
