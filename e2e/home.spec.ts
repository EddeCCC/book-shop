import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Bookly');
});

test('routes to books', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Show Books' }).click();

  await expect(page).toHaveURL(/books/);
});
