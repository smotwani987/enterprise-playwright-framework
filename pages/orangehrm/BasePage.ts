import { Locator, Page } from 'playwright';

export class BasePage{

    public userDropdown:Locator;
    public logoutLink:Locator;

  constructor(private page:Page) {
    this.page=page;
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
    await this.page.waitForURL('**/login'); // Verify logout redirected successfully
  }
}