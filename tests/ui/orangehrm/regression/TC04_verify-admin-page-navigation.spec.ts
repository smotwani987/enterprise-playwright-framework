import {test, expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('@regression Admin Page Validations', () => {
    test('@smoke TC04_Navigate_to_Admin page', async ({poManager})=>{
await poManager.LoginPage.navigate();
    await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
//expect (await poManager.DashboardPage.verifypageUrl()).toContain('/dashboard');
        expect (await poManager.AdminPage.navigateToAdminPage());
        expect (await poManager.AdminPage.verifyAdminPageTitle()).toBeVisible();
        expect (await poManager.AdminPage.triggerEmployeeSearch()).toBeVisible();
    });
});
