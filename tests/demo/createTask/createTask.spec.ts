import { test, expect } from '@playwright/test';
import { locatorsConsole } from '../../../aptem/locators/locatorsConsole';
import credentials from '../../../aptem/authCredentials/credentialsData.json';
import { authConsole } from '../../baseSteps/authConsole.ts';
import { switchToClassic } from '../../baseSteps/switchFromConsoleToClassic.ts';
const date = Date.now();

const learnerName = 'Learner01 CreatedByCSV';
const reviewName = `review ${date}`;

test('test1', async ({ page }) => {
  await authConsole({ page });
  await page.click('a:nth-child(2) .d-flex .svg-fill svg');
  let assertion = await page.textContent('h1.my-0');
  await expect(assertion).toBe('Learners');
  await Promise.all([page.waitForNavigation(/*{ url: 'https://pavlo-uat.uat.aptem.dev/pwa/learners/59/dashboard' }*/), page.click(`text=${learnerName}`)]);
  await Promise.all([page.waitForNavigation(/*{ url: 'https://pavlo-uat.uat.aptem.dev/pwa/learners/59/reviews/upcoming' }*/), page.click('text=Reviews')]);
  await page.click('button:has-text("Create Review")');
  await expect(page).toHaveURL('https://pavlo-uat.uat.aptem.dev/pwa/learners/59/reviews/planned-review/create');
  await page.fill('input[type="text"]', `${reviewName}`);
  await page.click('[formcontrolname="reviewType"]');
  await page.click('text=Account programme review');
  await page.click('[formcontrolname="lengthUnit"]');
  await page.click('text=Date');
  await page.click('[aria-label="Toggle calendar"]');
  await page.click('span:has-text("31")');
  await page.click('[formcontrolname="reviewerId"]');
  await page.click('text=AutoTester Admin01');
  await page.click('[formcontrolname="taskUserType"]');
  await page.click('text=Learner & Tutor');
  await page.click('text=Save');
  await Promise.all([page.waitForNavigation(/*{ url: 'https://pavlo-uat.uat.aptem.dev/pwa/learners/59/dashboard' }*/), page.click('text=Save')]);
  await page.click(`//*[text()="${reviewName}"]/../../td/reviews-status-cell/div/a`);
  await page.waitForTimeout(5000);
});

//*[text()="case capacity"]/../../td/reviews-status-cell/div/a
