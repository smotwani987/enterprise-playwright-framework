import {test,expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('@smoke @aws-smoke OrangeHRM Login Test', () => {

  test('TC08 - Verify Login', async ({poManager}) => {
    await poManager.LoginPage.navigate();
  await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
   expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
  });
});