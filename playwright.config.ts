import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const testEnv = process.env.TEST_ENV || 'qa';

dotenv.config({
  path: path.resolve(__dirname, `config/.env.${testEnv}`)
});
console.log('CONFIG BASE URL =>', process.env.BASE_URL);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      //use: { ...devices['Desktop Chrome'] },
    }
  ],
  reporter: [['html'],['list']]

});
