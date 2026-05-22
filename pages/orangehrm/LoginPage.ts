import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';

export class LoginPage {
  public usernameInput: Locator;
  public passwordInput: Locator;
  public loginButton: Locator;
  private page:Page;
  
  constructor(page:Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: ' Login ' });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  
  async navigate(){
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }
}