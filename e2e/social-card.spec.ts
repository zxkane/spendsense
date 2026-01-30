import { test, expect } from '@playwright/test'

test.describe('Social Card Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // TC-CARD-001: Page Render Test
  test('renders page with all required elements', async ({ page }) => {
    // Check markdown input exists with default text
    const markdownInput = page.getByTestId('markdown-input')
    await expect(markdownInput).toBeVisible()
    await expect(markdownInput).not.toBeEmpty()

    // Check preview card exists
    const previewCard = page.getByTestId('preview-card')
    await expect(previewCard).toBeVisible()

    // Check all 5 theme buttons exist
    const themes = ['ink-smoke', 'lucky-red', 'cyber-taoist', 'retro-shanghai', 'bamboo-green']
    for (const theme of themes) {
      await expect(page.getByTestId(`theme-btn-${theme}`)).toBeVisible()
    }
  })

  // TC-CARD-002: Markdown Input Interaction
  test('markdown input updates preview in real-time', async ({ page }) => {
    const markdownInput = page.getByTestId('markdown-input')
    const previewCard = page.getByTestId('preview-card')

    // Clear and type new content
    await markdownInput.clear()
    await markdownInput.fill('# 你好 Agent')

    // Verify preview renders the heading
    await expect(previewCard.locator('h1')).toContainText('你好 Agent')
  })

  // TC-CARD-003: Theme Switch - ink-smoke
  test('ink-smoke theme applies correctly', async ({ page }) => {
    await page.getByTestId('theme-btn-ink-smoke').click()

    const previewCard = page.getByTestId('preview-card')

    // Check background color (rice paper white)
    await expect(previewCard).toHaveCSS('background-color', /rgb\(247, 247, 242\)|#f7f7f2/i)
  })

  // TC-CARD-004: Theme Switch - lucky-red
  test('lucky-red theme applies correctly', async ({ page }) => {
    await page.getByTestId('theme-btn-lucky-red').click()

    const previewCard = page.getByTestId('preview-card')

    // Check background contains Chinese red
    const bgColor = await previewCard.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    )
    expect(bgColor).toMatch(/rgb\(196, 30, 58\)|#c41e3a/i)
  })

  // TC-CARD-005: Theme Switch - cyber-taoist
  test('cyber-taoist theme applies correctly', async ({ page }) => {
    await page.getByTestId('theme-btn-cyber-taoist').click()

    const previewCard = page.getByTestId('preview-card')

    // Check dark background
    const bgColor = await previewCard.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    )
    expect(bgColor).toMatch(/rgb\(15, 23, 42\)|#0f172a/i)
  })

  // TC-CARD-006: Theme Switch - retro-shanghai
  test('retro-shanghai theme applies correctly', async ({ page }) => {
    await page.getByTestId('theme-btn-retro-shanghai').click()

    const previewCard = page.getByTestId('preview-card')

    // Check vintage paper background
    const bgColor = await previewCard.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    )
    expect(bgColor).toMatch(/rgb\(240, 230, 210\)|#f0e6d2/i)
  })

  // TC-CARD-007: Theme Switch - bamboo-green
  test('bamboo-green theme applies correctly', async ({ page }) => {
    await page.getByTestId('theme-btn-bamboo-green').click()

    const previewCard = page.getByTestId('preview-card')

    // Check light green background
    const bgColor = await previewCard.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    )
    expect(bgColor).toMatch(/rgb\(240, 255, 244\)|#f0fff4/i)
  })

  // TC-CARD-008: Chinese Character Rendering
  test('chinese characters render correctly across themes', async ({ page }) => {
    const markdownInput = page.getByTestId('markdown-input')
    const previewCard = page.getByTestId('preview-card')

    // Input Chinese content
    await markdownInput.fill('# 中文标题\n\n这是中文内容测试')

    // Verify Chinese text is visible
    await expect(previewCard).toContainText('中文标题')
    await expect(previewCard).toContainText('这是中文内容测试')

    // Switch through all themes and verify text remains visible
    const themes = ['ink-smoke', 'lucky-red', 'cyber-taoist', 'retro-shanghai', 'bamboo-green']
    for (const theme of themes) {
      await page.getByTestId(`theme-btn-${theme}`).click()
      await expect(previewCard).toContainText('中文标题')
    }
  })

  // TC-CARD-009: PNG Export Functionality
  test('download button triggers file download', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download')

    await page.getByTestId('download-btn').click()

    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.png$/i)
  })

  // TC-CARD-010: Markdown Syntax Support
  test('markdown syntax renders correctly', async ({ page }) => {
    const markdownInput = page.getByTestId('markdown-input')
    const previewCard = page.getByTestId('preview-card')

    await markdownInput.fill(`# Heading 1
## Heading 2
**Bold text**
- List item 1
- List item 2
\`inline code\``)

    // Verify elements render
    await expect(previewCard.locator('h1')).toBeVisible()
    await expect(previewCard.locator('h2')).toBeVisible()
    await expect(previewCard.locator('strong')).toContainText('Bold text')
    await expect(previewCard.locator('li').first()).toBeVisible()
    await expect(previewCard.locator('code')).toContainText('inline code')
  })

  // TC-CARD-011: Card Footer Display
  test('card footer shows date and branding', async ({ page }) => {
    const previewCard = page.getByTestId('preview-card')

    // Check for branding text
    await expect(previewCard).toContainText('墨卡')
    await expect(previewCard).toContainText('AI')
  })
})
