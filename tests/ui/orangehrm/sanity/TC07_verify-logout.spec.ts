import {test,expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('@sanity OrangeHRM Login Test', () => {

  test('TC07 - Verify Logout', async ({poManager}) => {
    await poManager.LoginPage.navigate();
        await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
    expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
    await poManager.BasePage.logout();
  });
});