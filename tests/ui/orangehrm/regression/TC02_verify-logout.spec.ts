import {test,expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('@regression OrangeHRM Login Test', () => {

  test('@smoke TC02 - Verify Logout', async ({poManager}) => {
    await poManager.LoginPage.navigate();
    await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
    expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
    await poManager.BasePage.logout();
  });
});