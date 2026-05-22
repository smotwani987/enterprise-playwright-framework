import {test as base,BrowserContext, Page} from '@playwright/test';
import {POManager} from '../pages/orangehrm/POManager';

type myFixtures={
context: BrowserContext;
page: Page;
poManager: POManager;
}

export const test=base.extend<myFixtures>({
  context: async({browser},use)=>{
    const context=await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true
    })
    await use(context);
    await context.close;
  },

  page:async({context},use)=>{
      const page=await context.newPage();
      await use(page);
  },

  poManager: async({page},use)=>{
    const poManager=new POManager(page);
    await use(poManager);
  }

});
export { expect } from '@playwright/test';