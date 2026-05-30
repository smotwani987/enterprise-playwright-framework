import {test} from '../../../../fixtures/baseFixture';

test.describe('@regression OrangeHRM Login Test', () => {
  
  test.beforeEach(async ({ poManager }) => {
    await poManager.LoginPage.navigate();
  });

  test('@smoke TC01 - Verify Login', async ({poManager}) => {
    await poManager.LoginPage.login('Admin', 'admin123');
    await poManager.DashboardPage.verifypageTitle();
    await poManager.BasePage.logout();
  });
});