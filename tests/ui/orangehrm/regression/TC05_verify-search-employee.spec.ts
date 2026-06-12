import {test,expect} from '../../../../fixtures/baseFixture';
import { ENV } from '../../../../config/env';

test.describe('@regression Search Employee Tests',()=>{

    test('@smoke TC05_Search_Employee',async({poManager})=>{
        await poManager.LoginPage.navigate();
            await poManager.LoginPage.login(ENV.USERNAME, ENV.PASSWORD);
        await poManager.AdminPage.navigateToAdminPage();
        expect (await poManager.AdminPage.verifyAdminPageTitle()).toBeVisible();
        expect (await poManager.AdminPage.triggerEmployeeSearch()).toBeVisible();
        expect (await poManager.AdminPage.verifyTotalRowCount()).toBeGreaterThanOrEqual(1);
    });
});