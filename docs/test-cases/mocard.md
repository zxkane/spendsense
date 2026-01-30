# 墨卡 (MoCard) - Social Card Generator Test Cases

## Overview

- **Feature**: F001 - MoCard Social Card Generator
- **PRD Reference**: [docs/prd/social-card-generator.md](../prd/social-card-generator.md)
- **Design Document**: [docs/designs/design.pen](../designs/design.pen)
- **Date Created**: 2026-01-30
- **Last Updated**: 2026-01-30

## Test Environment

| Environment | URL | Notes |
|------------|-----|-------|
| Local | http://localhost:3000 | Development |
| Preview | https://spendsense-*.vercel.app | PR Preview |

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

### Theme Test Data

| Theme ID | Theme Name | Background Color | Text Color |
|----------|-----------|------------------|------------|
| ink-smoke | 水墨云烟 | #F7F7F2 | #2C2C2C |
| lucky-red | 红运当头 | #C41E3A | #FFD700 |
| cyber-taoist | 赛博修仙 | #0F172A | #00FFFF |
| retro-shanghai | 复古画报 | #F0E6D2 | #1E3A8A |
| bamboo-green | 竹林清风 | #F0FFF4 | #14532D |

---

## Test Scenarios

### TC-MOCARD-001: Page Render Test

- **Description**: Verify all essential UI elements render correctly
- **Preconditions**:
  - Application is running
- **Test Steps**:
  1. Navigate to homepage
  2. Check for Markdown input textarea
  3. Check for preview card container
  4. Check for 5 theme buttons
  5. Check for download button
- **Expected Result**:
  - `data-testid="markdown-input"` exists and contains default text
  - `data-testid="preview-card"` is visible
  - 5 theme buttons exist with correct test IDs
  - `data-testid="download-btn"` exists
- **Priority**: P0 (Critical)
- **Type**: E2E / Unit

---

### TC-MOCARD-002: Markdown Input Real-time Rendering

- **Description**: Verify Markdown input updates preview in real-time
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Clear textarea content
  2. Enter `# 你好 Agent`
  3. Observe preview card
- **Expected Result**:
  - Preview card renders `<h1>` tag with "你好 Agent"
- **Priority**: P0 (Critical)
- **Type**: E2E / Unit

---

### TC-MOCARD-003: Theme Switch - 水墨云烟 (ink-smoke)

- **Description**: Verify ink-smoke theme applies correctly
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-ink-smoke"`
  2. Check preview card styling
- **Expected Result**:
  - Background color: #F7F7F2
  - Font family includes serif font
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-MOCARD-004: Theme Switch - 红运当头 (lucky-red)

- **Description**: Verify lucky-red theme applies correctly
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-lucky-red"`
  2. Check preview card styling
- **Expected Result**:
  - Background color: #C41E3A
  - Title text color: #FFD700
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-MOCARD-005: Theme Switch - 赛博修仙 (cyber-taoist)

- **Description**: Verify cyber-taoist theme applies correctly with glow effects
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-cyber-taoist"`
  2. Check preview card styling
- **Expected Result**:
  - Background color: #0F172A
  - Text has text-shadow glow effect
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-MOCARD-006: Theme Switch - 复古画报 (retro-shanghai)

- **Description**: Verify retro-shanghai theme applies correctly
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-retro-shanghai"`
  2. Check preview card styling
- **Expected Result**:
  - Background color: #F0E6D2
  - Title font is bold sans-serif
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-MOCARD-007: Theme Switch - 竹林清风 (bamboo-green)

- **Description**: Verify bamboo-green theme applies correctly
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Click `data-testid="theme-btn-bamboo-green"`
  2. Check preview card styling
- **Expected Result**:
  - Background color includes #F0FFF4
  - Text color: #14532D
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-MOCARD-008: Chinese Character Rendering

- **Description**: Verify Chinese characters render correctly across all themes
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Enter Chinese Markdown text
  2. Switch through all 5 themes
  3. Check for character rendering
- **Expected Result**:
  - Chinese characters visible without garbling
  - Font rendering is clear
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-MOCARD-009: PNG Export Function

- **Description**: Verify PNG download functionality
- **Preconditions**:
  - Page is loaded with content
- **Test Steps**:
  1. Click `data-testid="download-btn"`
  2. Monitor download behavior
- **Expected Result**:
  - File download triggered
  - Downloaded file is PNG format
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-MOCARD-010: Markdown Syntax Support

- **Description**: Verify supported Markdown syntax renders correctly
- **Preconditions**:
  - Page is loaded
- **Test Data**:
  - H1: `# Heading`
  - H2: `## Heading`
  - Bold: `**text**`
  - List: `- item`
  - Code Block: ``` code ```
- **Test Steps**:
  1. Enter each Markdown syntax
  2. Verify rendering in preview
- **Expected Result**:
  - Each syntax renders correctly
- **Priority**: P1 (High)
- **Type**: Unit

---

### TC-MOCARD-011: Card Footer Content

- **Description**: Verify card footer displays date and brand
- **Preconditions**:
  - Page is loaded
- **Test Steps**:
  1. Check preview card footer
- **Expected Result**:
  - Current date displayed
  - "墨卡 · 由 AI 驱动" text present
- **Priority**: P1 (High)
- **Type**: Unit

---

## Test Coverage Summary

| Test ID | Description | Priority | Type | Automated |
|---------|-------------|----------|------|-----------|
| TC-MOCARD-001 | Page Render Test | P0 | E2E/Unit | ⬜ |
| TC-MOCARD-002 | Markdown Real-time Rendering | P0 | E2E/Unit | ⬜ |
| TC-MOCARD-003 | Theme: ink-smoke | P1 | E2E | ⬜ |
| TC-MOCARD-004 | Theme: lucky-red | P1 | E2E | ⬜ |
| TC-MOCARD-005 | Theme: cyber-taoist | P1 | E2E | ⬜ |
| TC-MOCARD-006 | Theme: retro-shanghai | P1 | E2E | ⬜ |
| TC-MOCARD-007 | Theme: bamboo-green | P1 | E2E | ⬜ |
| TC-MOCARD-008 | Chinese Character Rendering | P0 | E2E | ⬜ |
| TC-MOCARD-009 | PNG Export Function | P0 | E2E | ⬜ |
| TC-MOCARD-010 | Markdown Syntax Support | P1 | Unit | ⬜ |
| TC-MOCARD-011 | Card Footer Content | P1 | Unit | ⬜ |

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

- Ensure html-to-image or similar library is used for PNG export
- Font fallback for Chinese characters must be configured
- E2E tests require Vercel protection bypass token for preview environments
