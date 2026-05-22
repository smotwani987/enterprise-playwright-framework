import { Page } from 'playwright';

export class DashboardPage {
  
  constructor(private page: Page) {
    this.page = page;
  }
  async verifypageTitle(){
    return (await this.page.getByRole('heading', { name: 'Dashboard' }));
  }

  async verifyMyActionWidget(){
    return (await this.page.getByRole('region',{name:'My Actions'}));
  }
  
}