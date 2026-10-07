const { test, expect } = require('@playwright/test');
test('home and routes are interactive', async ({page})=>{await page.goto('/');await expect(page.locator('#homeView')).toBeVisible();await page.locator('.hot-build').click();await page.waitForTimeout(1100);await expect(page.locator('#buildView')).toHaveClass(/active/);});
