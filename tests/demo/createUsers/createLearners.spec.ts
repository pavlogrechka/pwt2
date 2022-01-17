import { test, expect } from '@playwright/test';

const uatStageBaseULR = 'https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/Users';

const authAdmin = {
  testStage: {
    login: 'mws',
  },
  uatStage: {
    login: 'mws',
  },
};

const newLearners = [
  {
    learnerFirstName: 'AutoTester02',
    learnerLastName: 'Learner',
    // learnerEmail: `aptem1211+${this.learnerFirstName}${this.learnerLastName}@gmail.com`,
  },
  {
    learnerFirstName: 'AutoTester03',
    learnerLastName: 'Learner',
  },
  {
    learnerFirstName: 'AutoTester04',
    learnerLastName: 'Learner',
  },
];

test('Create Learner01', async ({ page }) => {
  await page.goto('https://pavlogrechka.test.aptem.co.uk/Users/Account/AccessDenied?ReturnUrl=%2FMWS.ClientAdmin%2FUsers');
  //LogIn as mwsadmin
  await page.fill('input[name="userNameOrEmail"]', 'mwsadmin');
  await page.fill('input[name="password"]', '?evDFH7YM5MXz8WVmxrR');
  await page.click('input:has-text("Sign in")');
  await expect(page).toHaveURL('https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users');

  //Create learner
  await page.click('text=Create');
  await page.click('ul[role="menu"] >> text=User');
  await page.click('text=Yes');
  await expect(page).toHaveURL('https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users/Create?userType=ClientUser');

  await page.click('input[name="UserInvitationPart.SendInvitation"]');
  await page.fill('[placeholder="firstname"]', newLearners[0].learnerFirstName);
  await page.fill('[placeholder="lastname"]', newLearners[0].learnerLastName);
  await page.click('input[name="UserBasePart.Gender"]');
  await page.fill('[placeholder="you@youremail.com"]', `aptem1211+testStage${newLearners[0].learnerFirstName}${newLearners[0].learnerLastName}@gmail.com`);
  await page.fill('input[name="UserContactInfoPart.ConfirmEmail"]', 'aptem1211+testStageAutoTester01@gmail.com');
  await page.check('li:nth-child(6) .k-mid .k-checkbox-wrapper input');
  await Promise.all([page.waitForNavigation(/*{ url: 'https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users' }*/), page.click('text=Create')]);

  // Need to checking that the user is really created
  await page.fill('//input[@id="FullName"]', `${newLearners[0].learnerFirstName} ${newLearners[0].learnerLastName}`);
  await page.click('//input[@value="Search"]');
  await page.click(`//a[text()="${newLearners[0].learnerFirstName} ${newLearners[0].learnerLastName}"]`);

  const locator = page.locator('//span[@id="cphFilters_lblUserName"]');
  await expect(locator).toHaveText(`${newLearners[0].learnerFirstName} ${newLearners[0].learnerLastName}`);
});

test('Create Learner02', async ({ page }) => {
  await page.goto('https://pavlogrechka.test.aptem.co.uk/Users/Account/AccessDenied?ReturnUrl=%2FMWS.ClientAdmin%2FUsers');
  //LogIn as mwsadmin
  await page.fill('input[name="userNameOrEmail"]', 'mwsadmin');
  await page.fill('input[name="password"]', '?evDFH7YM5MXz8WVmxrR');
  await page.click('input:has-text("Sign in")');
  await expect(page).toHaveURL('https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users');

  //Create learner
  await page.click('text=Create');
  await page.click('ul[role="menu"] >> text=User');
  await page.click('text=Yes');
  await expect(page).toHaveURL('https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users/Create?userType=ClientUser');

  await page.click('input[name="UserInvitationPart.SendInvitation"]');
  await page.fill('[placeholder="firstname"]', newLearners[1].learnerFirstName);
  await page.fill('[placeholder="lastname"]', newLearners[1].learnerLastName);
  await page.click('input[name="UserBasePart.Gender"]');
  await page.fill('[placeholder="you@youremail.com"]', `aptem1211+testStage${newLearners[1].learnerFirstName}${newLearners[1].learnerLastName}@gmail.com`);
  await page.fill('input[name="UserContactInfoPart.ConfirmEmail"]', 'aptem1211+testStageAutoTester01@gmail.com');
  await page.check('li:nth-child(6) .k-mid .k-checkbox-wrapper input');
  await Promise.all([page.waitForNavigation(/*{ url: 'https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users' }*/), page.click('text=Create')]);

  // Need to checking that the user is really created
  await page.fill('//input[@id="FullName"]', `${newLearner[1].learnerFirstName} ${newLearner[1].learnerLastName}`);
  await page.click('//input[@value="Search"]');
  await page.click(`//a[text()="${newLearner[1].learnerFirstName} ${newLearner[1].learnerLastName}"]`);

  const locator = page.locator('//span[@id="cphFilters_lblUserName"]');
  await expect(locator).toHaveText(`${newLearner[1].learnerFirstName} ${newLearner[1].learnerLastName}`);
});
test('Create Learner03', async ({ page }) => {
  await page.goto('https://pavlogrechka.test.aptem.co.uk/Users/Account/AccessDenied?ReturnUrl=%2FMWS.ClientAdmin%2FUsers');
  //LogIn as mwsadmin
  await page.fill('input[name="userNameOrEmail"]', 'mwsadmin');
  await page.fill('input[name="password"]', '?evDFH7YM5MXz8WVmxrR');
  await page.click('input:has-text("Sign in")');
  await expect(page).toHaveURL('https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users');

  //Create learner
  await page.click('text=Create');
  await page.click('ul[role="menu"] >> text=User');
  await page.click('text=Yes');
  await expect(page).toHaveURL('https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users/Create?userType=ClientUser');

  await page.click('input[name="UserInvitationPart.SendInvitation"]');
  await page.fill('[placeholder="firstname"]', newLearners[2].learnerFirstName);
  await page.fill('[placeholder="lastname"]', newLearners[2].learnerLastName);
  await page.click('input[name="UserBasePart.Gender"]');
  await page.fill('[placeholder="you@youremail.com"]', `aptem1211+testStage${newLearners[2].learnerFirstName}${newLearners[2].learnerLastName}@gmail.com`);
  await page.fill('input[name="UserContactInfoPart.ConfirmEmail"]', 'aptem1211+testStageAutoTester01@gmail.com');
  await page.check('li:nth-child(6) .k-mid .k-checkbox-wrapper input');
  await Promise.all([page.waitForNavigation(/*{ url: 'https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users' }*/), page.click('text=Create')]);

  // Need to checking that the user is really created
  await page.fill('//input[@id="FullName"]', `${newLearners[2].learnerFirstName} ${newLearners[2].learnerLastName}`);
  await page.click('//input[@value="Search"]');
  await page.click(`//a[text()="${newLearners[2].learnerFirstName} ${newLearners[2].learnerLastName}"]`);

  const locator = page.locator('//span[@id="cphFilters_lblUserName"]');
  await expect(locator).toHaveText(`${newLearners[2].learnerFirstName} ${newLearners[2].learnerLastName}`);
});
