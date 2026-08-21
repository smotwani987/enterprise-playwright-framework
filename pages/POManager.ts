import { Page } from 'playwright';
import { LoginPage } from './orangehrm/LoginPage';
import { DashboardPage } from './orangehrm/DashboardPage';
import { AdminPage } from './orangehrm/AdminPage';
import { LeavePage } from './orangehrm/LeavePage';
import { BasePage } from './orangehrm/BasePage';
import {dynamicTablePage} from './practise/dynamicTablePage';

export class POManager{
  public LoginPage: LoginPage;
  public DashboardPage: DashboardPage;
  public AdminPage: AdminPage;
  public LeavePage: LeavePage;
  public BasePage: BasePage;
public dynamicTablePage:dynamicTablePage;

  constructor(readonly page: Page) {
    this.LoginPage = new LoginPage(this.page);
    this.DashboardPage = new DashboardPage(this.page);
    this.AdminPage = new AdminPage(this.page);
    this.LeavePage = new LeavePage(this.page);
    this.BasePage = new BasePage(this.page);
    this.dynamicTablePage=new dynamicTablePage(this.page);
  }
}
