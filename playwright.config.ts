import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const testEnv = process.env.TEST_ENV || 'qa';
const now=new Date();
const formatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: false
});
const [{ value: dd },, { value: mm },, { value: yyyy },, { value: hh },, { value: min },, { value: ss }] = formatter.formatToParts(now);
const timestamp = `${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}`;

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
  reporter: [['html'],['list'],['json',{ outputFile: `reports/json/EPF_Report_${timestamp}.json` }]]
});
