import {test, expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('@regression OrangeHRM My Action Widget Visibility Test', () => {

test('@smoke TC03 - Verify My Action Widget Visibility', async ({ poManager }) => {
  await poManager.LoginPage.navigate();
      await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
  expect (await poManager.DashboardPage.verifyMyActionWidget()).toBeVisible();
});

});