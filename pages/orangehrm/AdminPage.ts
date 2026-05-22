import { Locator, Page } from 'playwright';

export class AdminPage {
  public userRoleDD: Locator;
  public adminDDValue: Locator;
  public searchBtn: Locator;
  public rows: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.userRoleDD = this.page.locator(
      'xpath=//label[contains(normalize-space(.), "User Role")]/following::div[contains(@class, "oxd-select-text")][1]'
    );
    this.adminDDValue = this.page.getByRole('option', { name: 'Admin' });
    this.searchBtn = this.page.getByRole('button', { name: 'Search' });
    this.rows = this.page.getByRole('row').getByText('Admin');
  }

  async navigateToAdminPage() {
    const [adminClick] = await Promise.all([
      this.page.locator('aside>>a').getByText('Admin').click(),
      this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers'),
    ]);
  }
  async verifyAdminPageTitle() {
    await this.page.waitForLoadState('networkidle');
     return (await this.page.getByRole('heading', { name: 'System Users' }));
  };

  async triggerEmployeeSearch() {
    await this.userRoleDD.click();
    await this.adminDDValue.waitFor({ state: 'visible', timeout: 5000 });
    await this.adminDDValue.click();
    await this.searchBtn.click();

    await Promise.all([
      this.page.waitForResponse(
        response => response.url().includes('/api/v2/admin/users') && response.status() === 200,
        { timeout: 20000 } // Adjust maximum wait time if needed
      )
    ]);
    const updatedRows = this.page.locator('.orangehrm-container');
    return updatedRows;
  }

  async verifyTotalRowCount(){
    const count = await this.rows.count();
    await console.log('Total Rows: ' + count);
    return count;
  }
}