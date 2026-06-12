import {test,expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('@smoke OrangeHRM Login Test', () => {

  test('TC09 - Verify Logout', async ({poManager}) => {
    await poManager.LoginPage.navigate();
        await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
    expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
    await poManager.BasePage.logout();
  });
});