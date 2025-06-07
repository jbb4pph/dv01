import { test, expect } from '@playwright/test';

test('page loads', async ({ page }) => {
  await page.goto('http://localhost:3033');
  await expect(page.locator('text=dv01')).toBeVisible();
});

test('table loads', async ({ page }) => {
  await page.goto('http://localhost:3033');
  const tableHeader = page.locator('text=Grade 1').first();
  await tableHeader.waitFor();
  await expect(tableHeader).toBeVisible();
});

test('bar chart renders', async ({ page }) => {
  await page.goto('http://localhost:3033');
  const tableHeader = page.locator('text=Total').first();
  await tableHeader.waitFor();
  await expect(tableHeader).toBeVisible();
});

test('filters are selectable', async ({ page }) => {
  await page.goto('http://localhost:3033');
  const select = page.locator('select[name="homeOwnership"]');
  await select.waitFor();
  await select.selectOption({ label: 'RENT' });
  await expect(select).toHaveValue('RENT');
});

test('filters update the table', async ({ page }) => {
  await page.goto('http://localhost:3033');
  let firstCell = page.locator('table tbody tr:nth-child(2) td:first-child');
  await firstCell.waitFor();
  const text = await firstCell.textContent() ?? "";
  const select = page.locator('select[name="homeOwnership"]');
  await select.waitFor();
  await select.selectOption({ label: 'RENT' });
  firstCell = page.locator('table tbody tr:nth-child(2) td:first-child');
  await firstCell.waitFor();
  await expect(firstCell).not.toContainText(text);
});

test('reset button updates the table', async ({ page }) => {
  await page.goto('http://localhost:3033');
  const select = page.locator('select[name="homeOwnership"]');
  await select.waitFor();
  await select.selectOption({ label: 'RENT' });
  let firstCell = page.locator('table tbody tr:nth-child(2) td:first-child');
  await firstCell.waitFor();
  const text = await firstCell.textContent() ?? "";
  const reset = page.locator('button');
  await reset.waitFor();
  await reset.click();
  firstCell = page.locator('table tbody tr:nth-child(2) td:first-child');
  await firstCell.waitFor();
  await expect(firstCell).not.toContainText(text);
});

