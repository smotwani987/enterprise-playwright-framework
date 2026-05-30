import { ENV } from 'config/env';
import {test, expect} from '../../../../fixtures/baseFixture';

test.describe('@smoke Admin Page Validations', () => {
    
    test.beforeEach(async ({poManager}) => {
        await poManager.LoginPage.navigate();
        await poManager.LoginPage.login(ENV.USERNAME,ENV.PASSWORD);
    });

    test('TC04_Navigate_to_Admin page', async ({poManager})=>{
        expect (await poManager.DashboardPage.verifypageTitle()).toBeVisible();
        expect (await poManager.AdminPage.navigateToAdminPage());
        expect (await poManager.AdminPage.verifyAdminPageTitle()).toBeVisible();
        expect (await poManager.AdminPage.triggerEmployeeSearch()).toBeVisible();
    });
});
