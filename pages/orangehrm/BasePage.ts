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
   async getCurrentRoute(): Promise<string> {
    return new URL(this.page.url()).pathname;
}
async navigateToIfNotAlreadyThere(
    pageName: string,
    urlFragment: string
) {
    if (!this.page.url().includes(urlFragment)) {
        console.log("Let's Navigate to Dashboard Page First!");
        await this.page.getByRole('link', { name: pageName }).click();
        await this.page.url().endsWith(`${urlFragment}/index`);
        console.log("Target Page Navigation Complete");
    }
}
}