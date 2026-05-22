import { Page } from 'playwright';

export class LeavePage {
  constructor(public page: Page) {
    this.page = page;
  }
}
