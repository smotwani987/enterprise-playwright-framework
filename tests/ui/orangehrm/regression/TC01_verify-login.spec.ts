import { ENV } from '../../../../config/env';
import {test,expect} from '../../../../fixtures/baseFixture';

test.describe('@regression OrangeHRM Login Test', () => {
  
  test.beforeEach(async ({ poManager }) => {
    await poManager.LoginPage.navigate();
  });

  test('@smokeTC01 - Verify Login', async ({poManager}) => {
    await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
    expect (await poManager.DashboardPage.verifypageTitle()).toBeVisible();
  });
});