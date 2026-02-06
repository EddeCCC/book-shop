import { expect, test } from '@playwright/test';

test('routes to login', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/login/);
});

test('routes to books', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Book Collection' }).click();

  await expect(page).toHaveURL(/books/);
});

test('shows languages', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Change language' }).click();

  await page.getByRole('menuitem', { name: 'EN' }).isVisible();
});
