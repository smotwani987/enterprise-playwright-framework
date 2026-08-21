import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { max } from '@xenova/transformers';

export class dynamicTablePage {
  private page: Page;
  public dynTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dynTable = page.locator('#table-description + div');
  }

  async navigateToPractiseSite() {
    await this.page.goto('https://practice.expandtesting.com/dynamic-table');
  }

  async findCPUValueforChrome() {
    console.log("Total Rows are: "+await this.dynTable.getByRole('table').getByRole('row').count());
    const ChromeRow=this.dynTable.getByRole('row').filter({hasText:'Chrome'}).getByRole('cell').filter({hasText:'%'});
    console.log("Chrome Row is: "+await ChromeRow.textContent());
  }
}