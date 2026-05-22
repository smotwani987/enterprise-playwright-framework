import {test,expect} from '../../../../fixtures/baseFixture';

test.describe('OrangeHRM Login Test', () => {
  
  test.beforeEach(async ({ poManager }) => {
    await poManager.LoginPage.navigate();
  });

  test('@smoke TC01 - Verify Login', async ({poManager}) => {
    await poManager.LoginPage.login('Admin', 'admin123');
    expect (await poManager.DashboardPage.verifypageTitle()).toBeVisible();
  });
});