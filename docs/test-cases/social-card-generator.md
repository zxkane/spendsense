# 墨卡 (MoCard) - Social Card Generator Test Cases

## Overview

- **Feature**: F01 - Markdown Social Card Generator
- **PRD Reference**: [docs/prd/social-card-generator.md](../prd/social-card-generator.md)
- **Design Document**: [docs/designs/design.pen](../designs/design.pen)
- **Date Created**: 2026-01-30
- **Last Updated**: 2026-01-30

## Test Environment

| Environment | URL | Notes |
|------------|-----|-------|
| Local | http://localhost:3000 | Development |
| Preview | Vercel Preview URL | PR Preview |

## Test Data

### Default Markdown Content
```markdown
# 🎨 欢迎使用墨卡

> 让文字，变成艺术

### 功能特性
- **实时预览** - 所见即所得
- **国风主题** - 水墨、故宫、赛博修仙...
- **一键导出** - 下载高清 PNG 图片

*墨卡 · 由 AI 驱动*
```

### Theme IDs
- `ink-smoke` - 水墨云烟
- `lucky-red` - 红运当头
- `cyber-taoist` - 赛博修仙
- `retro-shanghai` - 复古画报
- `bamboo-green` - 竹林清风

---

## Test Scenarios

### TC-CARD-001: Page Render Test

- **Description**: Verify page basic elements render correctly
- **Preconditions**:
  - Application is running
  - No prior localStorage state
- **Test Steps**:
  1. Navigate to homepage
  2. Check for markdown input element
  3. Check for preview card element
  4. Check for 5 theme buttons
- **Expected Result**:
  - `data-testid="markdown-input"` exists and has default text
  - `data-testid="preview-card"` is visible
  - All 5 theme buttons exist (`data-testid="theme-btn-{themeName}"`)
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-CARD-002: Markdown Input Interaction

- **Description**: Verify Markdown input real-time rendering
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Clear the input textarea
  2. Type `# 你好 Agent`
  3. Observe preview card
- **Expected Result**:
  - Preview Card renders `<h1>你好 Agent</h1>` tag
  - Change is reflected in real-time
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-CARD-003: Theme Switch - 水墨云烟 (ink-smoke)

- **Description**: Verify ink-smoke theme applies correctly
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-ink-smoke"`
  2. Inspect preview card styles
- **Expected Result**:
  - Background color is `#F7F7F2` (or contains gradient)
  - Font-family includes serif (e.g., `Noto Serif SC`)
  - Accent color `#B22222` used for borders/bullets
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-CARD-004: Theme Switch - 红运当头 (lucky-red)

- **Description**: Verify lucky-red theme applies correctly
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-lucky-red"`
  2. Inspect preview card styles
- **Expected Result**:
  - Background color is `#C41E3A` (Chinese red)
  - Title text color is `#FFD700` (gold)
  - Golden border visible (2px)
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-CARD-005: Theme Switch - 赛博修仙 (cyber-taoist)

- **Description**: Verify cyber-taoist theme with neon glow effects
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-cyber-taoist"`
  2. Inspect preview card styles
- **Expected Result**:
  - Background color is `#0F172A` (dark)
  - Text has `text-shadow` glow effect
  - Neon cyan `#00FFFF` or magenta `#FF00FF` accents
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-CARD-006: Theme Switch - 复古画报 (retro-shanghai)

- **Description**: Verify retro-shanghai vintage style
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-retro-shanghai"`
  2. Inspect preview card styles
- **Expected Result**:
  - Background color is `#F0E6D2` (vintage paper)
  - Title font is bold sans-serif
  - Text color is faded blue `#1E3A8A`
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-CARD-007: Theme Switch - 竹林清风 (bamboo-green)

- **Description**: Verify bamboo-green fresh theme
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-bamboo-green"`
  2. Inspect preview card styles
- **Expected Result**:
  - Background contains light green `#F0FFF4`
  - Text color is deep forest green `#14532D`
  - Minimal shadows, clean style
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-CARD-008: Chinese Character Rendering

- **Description**: Verify Chinese characters render correctly across all themes
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Input Chinese Markdown text
  2. Switch through all 5 themes
  3. Verify text visibility in each theme
- **Expected Result**:
  - Chinese characters visible and clear (no garbled text)
  - Font rendering is crisp (no jagged edges)
  - Proper font fallback works
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-CARD-009: PNG Export Functionality

- **Description**: Verify PNG export downloads an image
- **Preconditions**:
  - Page is loaded with content
- **Test Steps**:
  1. Click `data-testid="download-btn"`
  2. Monitor download trigger
- **Expected Result**:
  - File download is triggered
  - Downloaded file is PNG format
  - Image contains the card content
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-CARD-010: Markdown Syntax Support

- **Description**: Verify required Markdown syntax renders correctly
- **Preconditions**:
  - Page is loaded
- **Test Data**:
  ```markdown
  # Heading 1
  ## Heading 2
  **Bold text**
  - List item 1
  - List item 2
  `inline code`
  ```
- **Test Steps**:
  1. Input test markdown content
  2. Verify each element renders
- **Expected Result**:
  - H1 renders as large heading
  - H2 renders as smaller heading
  - Bold text is bold
  - List renders with bullets
  - Code block has monospace font
- **Priority**: P0 (Critical)
- **Type**: Unit / E2E

---

### TC-CARD-011: Card Footer Display

- **Description**: Verify card footer shows date and branding
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Observe preview card footer area
- **Expected Result**:
  - Current date is displayed
  - "墨卡 · 由 AI 驱动" text is present
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-CARD-012: Responsive Layout

- **Description**: Verify layout adapts to different screen sizes
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. View on desktop (1440px width)
  2. View on tablet (768px width)
  3. View on mobile (375px width)
- **Expected Result**:
  - Desktop: Side-by-side editor and preview
  - Mobile: Stacked layout (editor above preview)
  - All elements remain functional
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-CARD-013: Empty Input Handling

- **Description**: Verify behavior with empty markdown input
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Clear all input text
  2. Observe preview card
- **Expected Result**:
  - Preview card shows empty state or placeholder
  - No errors in console
  - Export button still functional (exports empty card)
- **Priority**: P2 (Medium)
- **Type**: Unit

---

### TC-CARD-014: Long Content Handling

- **Description**: Verify handling of very long markdown content
- **Preconditions**:
  - Page is loaded
- **Test Data**:
  - 500+ characters of markdown
  - Multiple sections and lists
- **Test Steps**:
  1. Input long markdown content
  2. Observe preview card
- **Expected Result**:
  - Content is contained within card bounds
  - Overflow handling (scroll or truncation)
  - Export still works correctly
- **Priority**: P2 (Medium)
- **Type**: Unit / E2E

---

### TC-CARD-015: Theme Persistence (Optional Enhancement)

- **Description**: Verify selected theme persists across page refresh
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Select a non-default theme
  2. Refresh the page
  3. Check which theme is active
- **Expected Result**:
  - Selected theme is remembered (localStorage)
  - OR defaults to first theme (acceptable)
- **Priority**: P3 (Low)
- **Type**: E2E

---

## Test Coverage Summary

| Test ID | Description | Priority | Type | Automated |
|---------|-------------|----------|------|-----------|
| TC-CARD-001 | Page Render | P0 | E2E | ⬜ |
| TC-CARD-002 | Markdown Input | P0 | E2E | ⬜ |
| TC-CARD-003 | Theme: ink-smoke | P1 | E2E | ⬜ |
| TC-CARD-004 | Theme: lucky-red | P1 | E2E | ⬜ |
| TC-CARD-005 | Theme: cyber-taoist | P1 | E2E | ⬜ |
| TC-CARD-006 | Theme: retro-shanghai | P1 | E2E | ⬜ |
| TC-CARD-007 | Theme: bamboo-green | P1 | E2E | ⬜ |
| TC-CARD-008 | Chinese Character Rendering | P0 | E2E | ⬜ |
| TC-CARD-009 | PNG Export | P0 | E2E | ⬜ |
| TC-CARD-010 | Markdown Syntax | P0 | Unit/E2E | ⬜ |
| TC-CARD-011 | Card Footer | P1 | E2E | ⬜ |
| TC-CARD-012 | Responsive Layout | P1 | E2E | ⬜ |
| TC-CARD-013 | Empty Input | P2 | Unit | ⬜ |
| TC-CARD-014 | Long Content | P2 | Unit/E2E | ⬜ |
| TC-CARD-015 | Theme Persistence | P3 | E2E | ⬜ |

Legend:
- ✅ Automated and passing
- ⬜ Not yet automated
- 🔄 In progress

---

## Acceptance Criteria

- [ ] All P0 tests pass
- [ ] All P1 tests pass
- [ ] Unit test coverage >80%
- [ ] E2E tests pass on preview environment
- [ ] No console errors during E2E testing
- [ ] Chinese characters render correctly in all themes

---

## Notes

- PNG export uses `html-to-image` library
- Markdown parsing uses `react-markdown` library
- All test IDs follow pattern: `data-testid="xxx"`
- Theme names must match exactly for button selection
