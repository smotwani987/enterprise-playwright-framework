import {test, expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('@smoke OrangeHRM My Action Widget Visibility Test', () => {

test('TC10 - Verify My Action Widget Visibility', async ({ poManager }) => {
  await poManager.LoginPage.navigate();
      await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
  expect (await poManager.DashboardPage.verifyMyActionWidget()).toBeVisible();
});

});