import {test, expect} from '../../../../fixtures/baseFixture';

test.describe('@regression Admin Page Validations', () => {
    test('@smoke TC04_Navigate_to_Admin page', async ({poManager})=>{
        await poManager.LoginPage.navigate();
        await poManager.LoginPage.login('Admin','admin123');
        expect (await poManager.DashboardPage.verifypageUrl()).toBeVisible();
        expect (await poManager.AdminPage.navigateToAdminPage());
        expect (await poManager.AdminPage.verifyAdminPageTitle()).toBeVisible();
        expect (await poManager.AdminPage.triggerEmployeeSearch()).toBeVisible();
    });
});
