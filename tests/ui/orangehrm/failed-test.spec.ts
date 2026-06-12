import {test} from "../../../fixtures/baseFixture"

test("Real Locator Failure", async ({ page }) => {

  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[data-testid="does-not-exist"]').click();
  
});