import { ENV } from '../../../config/env';
import {test,expect} from '../../../fixtures/baseFixture';

test.describe('@OneOff Dynamic tables', () => {

  test('@OneOffTC01', async ({poManager}) => {
    await poManager.dynamicTablePage.navigateToPractiseSite();
    //get Chrome row's CPU value
    await poManager.dynamicTablePage.findCPUValueforChrome();
  });
});