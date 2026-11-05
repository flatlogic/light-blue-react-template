const { test, expect } = require('@playwright/test');

test('layout renders dashboard, navigation and authentication pages', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => { errors.push(error.message); console.error(error.message); });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Login to your Web App' })).toBeVisible();
  await page.getByRole('button', { name: /Login$/ }).click();
  await expect(page).toHaveURL(/#\/app\/main\/dashboard$/);
  await expect(page.locator('main')).toContainText('Dashboard');
  await expect(page.locator('main svg').first()).toBeVisible();
  await page.screenshot({ path: 'test-results/dashboard.png', fullPage: true });
  await page.locator('a[href="#/app/tables"]').click();
  await expect(page.locator('main table').first()).toBeVisible();
  await page.locator('a[href="#/app/typography"]').click();
  await expect(page.locator('main')).toContainText('Typography');
  await page.goto('/#/app/components/charts');
  await expect(page.locator('main svg').first()).toBeVisible();
  await expect(page.locator('main')).toContainText('Charts');
  const echartsWidget = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Echarts Line Chart' }) });
  await expect(echartsWidget.locator('canvas, svg').first()).toBeVisible();
  await expect(echartsWidget.locator('[data-zr-dom-id]')).toHaveAttribute('width', /^[1-9]\d*$/);
  await page.getByRole('link', { name: 'Logout', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Login to your Web App' })).toBeVisible();
  expect(errors).toEqual([]);
});
