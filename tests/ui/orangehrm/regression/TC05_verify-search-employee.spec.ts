import {test,expect} from '../../../../fixtures/baseFixture';

test.describe('@regression Search Employee Tests',()=>{
    test.beforeEach(async({poManager})=>{
        await poManager.LoginPage.navigate();
        await poManager.LoginPage.login('Admin','admin123');
    });

    test('@smoke TC05_Search_Employee',async({poManager})=>{
        await poManager.AdminPage.navigateToAdminPage();
        expect (await poManager.AdminPage.verifyAdminPageTitle()).toBeVisible();
        expect (await poManager.AdminPage.triggerEmployeeSearch()).toBeVisible();
        expect (await poManager.AdminPage.verifyTotalRowCount()).toBeGreaterThanOrEqual(1);
    });
});