import { ENV } from '../../../../config/env';
import {test,expect} from '../../../../fixtures/baseFixture';

test.describe('@regression OrangeHRM Login Test', () => {

  test('@smokeTC06 - Verify Login', async ({poManager}) => {
    await poManager.LoginPage.navigate();
    await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
    expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
  });
});