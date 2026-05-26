import {test,expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('OrangeHRM Login Test', () => {
  
  test.beforeEach(async ({ poManager }) => {
    await poManager.LoginPage.navigate();
  });

  test('@smoke TC01 - Verify Login', async ({poManager}) => {
  await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
    expect (await poManager.DashboardPage.verifypageTitle()).toBeVisible();
  });
});