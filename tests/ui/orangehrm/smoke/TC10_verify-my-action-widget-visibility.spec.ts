import {test, expect} from '../../../../fixtures/baseFixture';

test.describe('@smoke OrangeHRM My Action Widget Visibility Test', () => {

test('TC03 - Verify My Action Widget Visibility', async ({ poManager }) => {
  await poManager.LoginPage.navigate();
  expect (await poManager.DashboardPage.verifyMyActionWidget()).toBeVisible();
});

});