import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/SpendSense/)
  })

  test('displays coming soon message', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Coming Soon')).toBeVisible()
  })
})
