import { ENV } from 'config/env';
import { test, expect } from '../../../../fixtures/baseFixture';

test.describe('@smoke Admin Page Validations', () => {
    test('TC11_Navigate_to_Admin page', async ({ poManager }) => {
       await poManager.LoginPage.navigate();
    await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
        //expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
        expect(await poManager.AdminPage.navigateToAdminPage());
        expect(await poManager.AdminPage.verifyAdminPageTitle()).toBeVisible();
        expect(await poManager.AdminPage.triggerEmployeeSearch()).toBeVisible();
    });
});
