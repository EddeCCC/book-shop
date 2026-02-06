import { expect, test } from '@playwright/test';

test('login user', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('textbox', {name: 'First Name'}).fill("Eddy");
  await page.getByRole('textbox', {name: 'Last Name'}).fill("Freddy");
  await page.getByRole('textbox', {name: 'E-Mail'}).fill("ef@example.com");
  await page.getByRole('textbox', { name: 'Birthday' }).fill('2000-01-01');
  await page.getByRole('main').getByRole('button', {name: 'Login'}).click();

  await expect(page.getByRole('heading').getByText("Eddy Freddy")).toBeVisible();
});
