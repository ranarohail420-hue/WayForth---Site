const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/WAYFORTH/i);
});

test('primary pages load', async ({ page }) => {
  for (const path of ['/build.html', '/trucking.html', '/media.html', '/quote.html']) {
    const response = await page.goto(path);
    expect(response && response.ok()).toBeTruthy();
  }
});
