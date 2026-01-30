import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/墨卡|MoCard/)
  })

  test('displays main app interface', async ({ page }) => {
    await page.goto('/')

    // Check for markdown editor
    await expect(page.getByTestId('markdown-input')).toBeVisible()

    // Check for preview card
    await expect(page.getByTestId('preview-card')).toBeVisible()
  })
})
