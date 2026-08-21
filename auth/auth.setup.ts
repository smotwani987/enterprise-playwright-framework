import { chromium } from '@playwright/test';
import path from 'path';
import { AuthHelper } from '../utils/AuthHelper';

const storageStatePath = path.resolve(__dirname, 'storageState.json');

async function globalAuthSetup() {

  if (process.env.ENABLE_AUTH !== 'true') {
    console.log('Authentication setup skipped.');
    return;
  }

  const browser = await chromium.launch();

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true
  });

  const token = await AuthHelper.generateAuthToken();

  await AuthHelper.injectTokenIntoBrowserContext(context, token);

  await context.storageState({ path: storageStatePath });

  await browser.close();
}

export default globalAuthSetup;