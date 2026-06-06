import {test,expect} from '../../../../fixtures/baseFixture';

test.describe('@regression OrangeHRM Login Test', () => {

  test('@smoke TC01 - Verify Logout', async ({poManager}) => {
    await poManager.LoginPage.login('Admin', 'admin123');
    expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
    await poManager.BasePage.logout();
  });
});