import { Page } from 'playwright';
import { BasePage } from './BasePage';
import {errors} from '@playwright/test'

export class DashboardPage {
  private basePage: BasePage;

  constructor(private page: Page) {
    this.page = page;
    this.basePage=new BasePage(page);
  }
  async verifypageUrl() {
    await this.basePage.navigateToIfNotAlreadyThere(
      'Dashboard',
      '/dashboard'
    );
    return (await this.page.url());
  }

  async verifyMyActionWidget() {
    try{
        await this.page.getByRole('region', { name: 'My Actions' })
    }catch(error){
      if(error instanceof errors.TimeoutError){
        console.log('Element was not found on the page within the timeout.');
      }
      await this.basePage.navigateToIfNotAlreadyThere(
      'Dashboard',
      '/dashboard'
    );
    }
    
    return (await this.page.getByRole('region', { name: 'My Actions' }));
  }

}