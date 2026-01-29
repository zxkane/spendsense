import { test, expect } from '@playwright/test'

test.describe('Transaction Management', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/transactions')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('displays empty state when no transactions', async ({ page }) => {
    await page.goto('/transactions')

    await expect(page.getByText('No transactions yet')).toBeVisible()
    await expect(page.getByText('Start tracking your spending')).toBeVisible()
  })

  test('can add a new transaction', async ({ page }) => {
    await page.goto('/transactions')

    // Fill out the form
    await page.getByLabel('Amount').fill('45.50')
    await page.getByLabel('Description').fill('Grocery shopping')
    await page.getByLabel('Category').click()
    await page.getByRole('option', { name: 'Food' }).click()

    // Submit the form
    await page.getByRole('button', { name: 'Add Transaction' }).click()

    // Verify transaction appears in list
    await expect(page.getByText('Grocery shopping')).toBeVisible()
    await expect(page.getByText('$45.50')).toBeVisible()
    // Use table-specific locator to avoid matching dropdown
    await expect(page.getByRole('table').getByText('Food')).toBeVisible()
  })

  test('shows validation errors for invalid input', async ({ page }) => {
    await page.goto('/transactions')

    // Submit empty form
    await page.getByRole('button', { name: 'Add Transaction' }).click()

    // Verify error messages
    await expect(page.getByText('Amount must be a positive number')).toBeVisible()
    await expect(page.getByText('Description is required')).toBeVisible()
  })

  test('can delete a transaction', async ({ page }) => {
    await page.goto('/transactions')

    // Add a transaction first
    await page.getByLabel('Amount').fill('25.00')
    await page.getByLabel('Description').fill('Test transaction')
    await page.getByRole('button', { name: 'Add Transaction' }).click()

    // Verify it's visible
    await expect(page.getByText('Test transaction')).toBeVisible()

    // Delete the transaction
    await page.getByRole('button', { name: /Delete transaction/ }).click()

    // Verify it's gone and empty state shows
    await expect(page.getByText('Test transaction')).not.toBeVisible()
    await expect(page.getByText('No transactions yet')).toBeVisible()
  })

  test('persists transactions after page reload', async ({ page }) => {
    await page.goto('/transactions')

    // Add a transaction
    await page.getByLabel('Amount').fill('99.99')
    await page.getByLabel('Description').fill('Persistent test')
    await page.getByRole('button', { name: 'Add Transaction' }).click()

    // Verify it's visible
    await expect(page.getByText('Persistent test')).toBeVisible()

    // Reload the page
    await page.reload()

    // Verify transaction still exists
    await expect(page.getByText('Persistent test')).toBeVisible()
    await expect(page.getByText('$99.99')).toBeVisible()
  })

  test('sorts transactions by date (newest first)', async ({ page }) => {
    await page.goto('/transactions')

    // Add transactions with different dates
    // Transaction 1 - older date
    await page.getByLabel('Amount').fill('10.00')
    await page.getByLabel('Description').fill('First transaction')
    await page.getByLabel('Date').fill('2025-01-01')
    await page.getByRole('button', { name: 'Add Transaction' }).click()

    // Transaction 2 - newer date
    await page.getByLabel('Amount').fill('20.00')
    await page.getByLabel('Description').fill('Second transaction')
    await page.getByLabel('Date').fill('2025-01-15')
    await page.getByRole('button', { name: 'Add Transaction' }).click()

    // Get all transaction rows
    const rows = page.locator('tbody tr')

    // First row should be the newer transaction
    await expect(rows.first()).toContainText('Second transaction')
    await expect(rows.last()).toContainText('First transaction')
  })
})
