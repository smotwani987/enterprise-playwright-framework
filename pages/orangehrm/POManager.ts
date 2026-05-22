import { Page } from 'playwright';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { AdminPage } from './AdminPage';
import { LeavePage } from './LeavePage';
import { BasePage } from './BasePage';

export class POManager{
  public LoginPage: LoginPage;
  public DashboardPage: DashboardPage;
  public AdminPage: AdminPage;
  public LeavePage: LeavePage;
  public BasePage: BasePage;

  constructor(readonly page: Page) {
    this.LoginPage = new LoginPage(this.page);
    this.DashboardPage = new DashboardPage(this.page);
    this.AdminPage = new AdminPage(this.page);
    this.LeavePage = new LeavePage(this.page);
    this.BasePage = new BasePage(this.page);
  }
}
