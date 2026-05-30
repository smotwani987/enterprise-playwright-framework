import {test, expect} from '../../../../fixtures/baseFixture';

test.describe('@regression OrangeHRM My Action Widget Visibility Test', () => {
  test.beforeEach(async ({poManager}) => { 
    await poManager.LoginPage.navigate();
  });

test('@smoke TC03 - Verify My Action Widget Visibility', async ({ poManager }) => {
  expect (await poManager.DashboardPage.verifyMyActionWidget()).toBeVisible();
});

});