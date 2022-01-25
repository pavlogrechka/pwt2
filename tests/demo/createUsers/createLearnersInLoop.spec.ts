import { test, expect } from '@playwright/test';
let startId: number = 18;
const usersList = [];

const generateUsersList = (count) => {
  for (let i = startId; i < count + startId; i++) {
    usersList.push({
      userFirstName: `FirstName${i}`,
      userLastName: `LastName${i}`,
      userEmail: `aptem1211+autoTester${i}@gmail.com`,
    });
  }
};

//set number of users to generate as props
generateUsersList(1);

test.beforeEach(async ({ page }) => {
  await page.goto('https://pavlo-uat.uat.aptem.dev/');
  await page.fill('input[name="userNameOrEmail"]', 'mwsadmin');
  await page.fill('input[name="password"]', '?evDFH7YM5MXz8WVmxrR');
  await page.click('input:has-text("Sign in")');
});

for (let user of usersList) {
  test(`create user ${startId++}`, async ({ page }) => {
    console.log(user);
    await page.goto('https://pavlo-uat.uat.aptem.dev/MWS.ClientAdmin/Users');
    //Create learner
    await page.click('text=Create >> span');
    await page.click('ul[role="menu"] >> text=User');
    await page.click('text=Yes');
    await page.click('input[name="UserInvitationPart.SendInvitation"]');
    await page.fill('[placeholder="firstname"]', user.userFirstName);
    await page.fill('[placeholder="lastname"]', user.userLastName);
    await page.click('input[name="UserBasePart.Gender"]');
    await page.fill('[placeholder="you@youremail.com"]', user.userEmail);
    await page.fill('input[name="UserContactInfoPart.ConfirmEmail"]', user.userEmail);
    // await page.check("li:nth-child(6) .k-mid .k-checkbox-wrapper input");
    await page.click('//input[@value="74"]');
    await Promise.all([page.waitForNavigation(/*{ url: 'https://pavlogrechka.test.aptem.co.uk/MWS.ClientAdmin/Users' }*/), page.click('text=Create')]);
    // Need to checking that the user is really created

    await page.fill('//input[@name="Email"]', `${user.userEmail}`);
    await page.click('//input[@value="Search"]');

    let assert = page.locator('//tbody[@role="rowgroup"]/tr/td[position()="9"]');
    await expect(assert).toHaveText('Invited ');

    await page.click(`//a[text()="${user.userFirstName} ${user.userLastName}"]`);
    console.log(`${user.userFirstName} ${user.userLastName}`);
    assert = page.locator(`span[@id="cphFilters_lblUserName" and contains(text(), ${user.userFirstName} ${user.userLastName})]`);
    await expect(assert);
  });
}
