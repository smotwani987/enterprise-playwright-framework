import {test,expect} from '../../../../fixtures/baseFixture';

test.describe('@smoke OrangeHRM Login Test', () => {

  test('TC01 - Verify Login', async ({poManager}) => {
    await poManager.LoginPage.login('Admin', 'admin123');
    expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
    await poManager.BasePage.logout();
  });
});