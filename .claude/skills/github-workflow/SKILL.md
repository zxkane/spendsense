---
name: github-workflow
description: This skill should be used when the user asks to "design a feature", "create UI mockup", "create a PR", "address review comments", "resolve review threads", "retrigger Q review", "/q review", "respond to Amazon Q", "/codex review", "respond to Codex", "handle reviewer findings", "merge PR", "push changes", "check CI status", or mentions design canvas, Pencil tool, PR workflow, code review, reviewer bots, or GitHub Actions checks.
---

# GitHub Development Workflow

This skill provides standardized guidance for the complete GitHub development workflow, including **design canvas creation using Pencil**, branch management, PR creation, CI monitoring, and reviewer bot interaction.

## Development Workflow Overview

Follow this 12-step workflow for all feature development and bug fixes:

```
Step 1: DESIGN CANVAS (Pencil Tool) ← NEW
  - Open/create .pen file for feature design
  - Create UI mockups, wireframes, architecture diagrams
  - Document component structure and data flow
  - Get user approval before proceeding
       ↓
Step 2: CREATE BRANCH
  git checkout -b feat/<name> or fix/<name>
       ↓
Step 3: WRITE TEST CASES (TDD)
  - Create test case document: docs/test-cases/<feature>.md
  - Write unit test skeletons
  - Write E2E test cases if applicable
       ↓
Step 4: IMPLEMENT CHANGES
  - Write code following test cases
  - Write new unit tests for new functionality
  - Update existing tests if behavior changed
       ↓
Step 5: LOCAL VERIFICATION
  - npm run build
  - npm run test
  - Deploy and verify (if applicable)
       ↓
Step 6: CODE SIMPLIFICATION
  - Run code-simplifier agent
  - Address simplification suggestions
  - Mark complete: .claude/hooks/state-manager.sh mark code-simplifier
       ↓
Step 7: COMMIT AND CREATE PR
  - git add && git commit -m "type(scope): description"
  - git push -u origin <branch-name>
  - Create PR via GitHub MCP or gh CLI
  - Include checklist in PR description (see template below)
       ↓
Step 8: PR REVIEW AGENT
  - Run /pr-review-toolkit:review-pr
  - Address findings by severity
  - Mark complete: .claude/hooks/state-manager.sh mark pr-review
       ↓
Step 9: WAIT FOR PR CHECKS
  - Monitor GitHub Actions checks
  - If FAIL → Return to Step 4
  - If PASS → Update PR checklist, proceed to Step 10
       ↓
Step 10: ADDRESS REVIEWER BOT FINDINGS (必须回复+关闭)
  - Review all bot comments (Amazon Q, Codex, etc.)
  - Fix issues OR explain why it's a false positive
  - ⚠️ MUST reply DIRECTLY to EACH comment thread
  - ⚠️ MUST resolve/close EACH conversation (even false positives)
  - Retrigger review: /q review, /codex review
       ↓
Step 11: ITERATE UNTIL NO FINDINGS
  - Check for new bot findings
  - If new findings → Return to Step 10
  - If no findings → Update PR checklist, proceed to Step 12
       ↓
Step 12: E2E TESTS & READY FOR MERGE
  - Run E2E tests using Chrome DevTools MCP
  - Verify on Preview/Staging environment
  - Mark complete: .claude/hooks/state-manager.sh mark e2e-tests
  - Update PR checklist to show all items complete
  - STOP HERE: Report status to user
  - User decides when to merge
```

## Step 1: Design Canvas (Pencil Tool)

**CRITICAL: Always start feature development with a design canvas**

### When to Create Design Canvas

- New UI components or pages
- Feature implementations with user-facing changes
- Architecture decisions that benefit from visualization
- Complex data flows or state management

### Pencil Tool Workflow

1. **Check editor state**:
   ```
   Use get_editor_state() to see if a .pen file is open
   ```

2. **Open or create design file**:
   ```
   Use open_document("docs/designs/<feature>.pen") or open_document("new")
   ```

3. **Get design guidelines** (if needed):
   ```
   Use get_guidelines(topic="landing-page|table|tailwind|code")
   ```

4. **Get style guide** for consistent design:
   ```
   Use get_style_guide_tags() to discover available tags
   Use get_style_guide(tags=["modern", "dashboard"]) for inspiration
   ```

5. **Create design elements**:
   ```
   Use batch_design(operations) to create:
   - UI mockups and wireframes
   - Component hierarchy diagrams
   - Data flow visualizations
   - Architecture diagrams
   ```

6. **Validate design visually**:
   ```
   Use get_screenshot() to verify the design looks correct
   ```

7. **Document design decisions**:
   - Add text annotations explaining choices
   - Include component specifications
   - Note interaction patterns

### Design Canvas Template Structure

```
┌─────────────────────────────────────────┐
│ Feature: <Feature Name>                 │
│ Date: YYYY-MM-DD                        │
│ Status: Draft | In Review | Approved    │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      UI Mockup / Wireframe      │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    Component Architecture       │   │
│  │    - Component tree             │   │
│  │    - Props/State flow           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    Data Flow Diagram            │   │
│  │    - API calls                  │   │
│  │    - State management           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Design Notes:                          │
│  - Key decisions and rationale          │
│  - Accessibility considerations         │
│  - Responsive behavior                  │
└─────────────────────────────────────────┘
```

### Design Approval

Before proceeding to implementation:
1. Present the design canvas to the user
2. Get explicit approval
3. Document any feedback or changes
4. Update design status to "Approved"

## PR Description Template

When creating a PR, include this checklist in the description. Update it as each step completes:

```markdown
## Summary
<1-3 bullet points describing the change>

## Design
- [ ] Design canvas created (`docs/designs/<feature>.pen`)
- [ ] Design approved by user

## Test Plan
- [ ] Test cases documented (`docs/test-cases/<feature>.md`)
- [ ] Build passes (`npm run build`)
- [ ] Unit tests pass (`npm run test`)
- [ ] CI checks pass
- [ ] code-simplifier review passed
- [ ] pr-review agent review passed
- [ ] Reviewer bot findings addressed (no new findings)
- [ ] E2E tests pass

## Checklist
- [ ] New unit tests written for new functionality
- [ ] E2E test cases updated if needed
- [ ] Documentation updated if needed
```

### Update PR Checklist Command

After completing each step, update the PR description:

```bash
# Get current PR body
gh pr view {pr_number} --json body --jq '.body' > /tmp/pr_body.md

# Edit the checklist (mark items as [x])
# Then update the PR
gh pr edit {pr_number} --body "$(cat /tmp/pr_body.md)"
```

Or use the GitHub MCP tool to update the PR body directly.

## PR Check Monitoring

### Monitor CI Status

```bash
# Watch all checks until completion
gh pr checks {pr_number} --watch --interval 30

# Quick status check
gh pr checks {pr_number}
```

### Checks to Monitor

| Check | Description | Action if Failed |
|-------|-------------|------------------|
| CI / build-and-test | Build + unit tests | Fix code or update snapshots |
| Security Scan | SAST, npm audit | Fix security issues |
| Amazon Q Developer | Security review | Address findings, retrigger with `/q review` |
| Codex | AI code review | Address findings, retrigger with `/codex review` |
| Other review bots | Various checks | Address findings, retrigger per bot docs |

## Reviewer Bot Workflow

Multiple review bots can provide automated code review findings on PRs:

| Bot | Trigger Command | Bot Username |
|-----|-----------------|--------------|
| Amazon Q Developer | `/q review` | `amazon-q-developer[bot]` |
| Codex | `/codex review` | `codex[bot]` |
| Other bots | See bot documentation | Varies |

### Handling Bot Review Findings

**⚠️ 必须遵守的规则: 每个 finding 都必须回复并关闭 discussion**

处理流程:

1. **逐一阅读所有 comments** - 仔细理解每个 finding 的内容
2. **判断类型并采取行动**:
   - **有效问题** → 修复代码并 push
   - **误报 (False Positive)** → 回复说明为何这是误报
3. **必须直接回复每个 thread** - 使用 `in_reply_to` 回复，不是 PR 级别的 general comment
4. **必须关闭每个 discussion** - 回复后使用 GraphQL mutation 标记为 resolved
5. **触发重新审查** - 使用对应命令（如 `/q review`、`/codex review`）

### False Positive 处理规范

**即使是误报，也必须:**

1. **回复 comment** - 清楚说明为什么这是误报
2. **关闭 discussion** - 标记 thread 为 resolved

**回复模板:**

```
This is a false positive because {具体原因}.

{详细解释}:
- {理由 1}
- {理由 2}

Marking as resolved.
```

**常见误报场景及回复示例:**

| 场景 | 回复示例 |
|------|----------|
| 安全相关文档 | "This is documentation for authorized operators. Access is controlled by IAM permissions, not documentation obscurity." |
| 测试代码中的硬编码 | "This is a test file using mock data. No real credentials are involved." |
| 框架约定的模式 | "This pattern is required by Next.js App Router conventions. See: {link to docs}" |
| 已有防护措施 | "This is protected by {existing mechanism} at {location}. Additional validation here would be redundant." |

### 回复并关闭 Finding 的完整流程

```bash
# Step 1: 获取所有 review comments
gh api repos/{owner}/{repo}/pulls/{pr}/comments \
  --jq '.[] | {id: .id, path: .path, body: .body[:100]}'

# Step 2: 回复每个 comment (有效问题)
gh api repos/{owner}/{repo}/pulls/{pr}/comments \
  -X POST \
  -f body="Addressed in commit {hash} - {修复说明}" \
  -F in_reply_to=<comment_id>

# Step 2: 回复每个 comment (误报)
gh api repos/{owner}/{repo}/pulls/{pr}/comments \
  -X POST \
  -f body="This is a false positive because {原因}. Marking as resolved." \
  -F in_reply_to=<comment_id>

# Step 3: 获取未关闭的 thread IDs
gh api graphql -f query='
query {
  repository(owner: "{owner}", name: "{repo}") {
    pullRequest(number: {pr}) {
      reviewThreads(first: 50) {
        nodes { id isResolved }
      }
    }
  }
}' --jq '.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false) | .id'

# Step 4: 关闭每个 thread
gh api graphql -f query='
mutation {
  resolveReviewThread(input: {threadId: "<thread_id>"}) {
    thread { isResolved }
  }
}'
```

### 使用脚本批量处理

```bash
# 批量回复并关闭所有 threads
./.claude/skills/github-workflow/scripts/resolve-threads.sh {owner} {repo} {pr_number}
```

### Retrigger Bot Reviews

After addressing findings, trigger a new scan:

```bash
# Amazon Q Developer
gh pr comment {pr_number} --body "/q review"

# Codex
gh pr comment {pr_number} --body "/codex review"
```

Wait 60-90 seconds for the review to complete, then check for new comments.

### Iteration Loop (CRITICAL)

**Repeat until review bots find no more issues:**

1. Address findings (fix code or explain design)
2. Reply to each comment thread
3. Resolve all threads
4. Trigger review command (`/q review`, `/codex review`, etc.)
5. Wait 60-90 seconds
6. Check for new findings
7. **If new findings → repeat from step 1**
8. **Only proceed to merge when no new positive findings appear**

This loop is essential - review bots may find new issues in your fixes.

## Review Thread Management

### Critical Rules

- **Reply DIRECTLY to each comment thread** - NOT a single general PR comment
- **Resolve each conversation after replying**
- **Wrong approach**: `gh pr comment {pr} --body "Fixed all issues"` (doesn't close threads)

### Reply to Review Comments

```bash
# Get comment IDs
gh api repos/{owner}/{repo}/pulls/{pr}/comments \
  --jq '.[] | {id: .id, path: .path, body: .body[:50]}'

# Reply to specific comment
gh api repos/{owner}/{repo}/pulls/{pr}/comments \
  -X POST \
  -f body="Addressed in commit abc123 - <description of fix>" \
  -F in_reply_to=<comment_id>
```

### Resolve Review Threads

```bash
# Get unresolved thread IDs
gh api graphql -f query='
query {
  repository(owner: "{owner}", name: "{repo}") {
    pullRequest(number: {pr}) {
      reviewThreads(first: 50) {
        nodes {
          id
          isResolved
          comments(first: 1) {
            nodes { body }
          }
        }
      }
    }
  }
}' --jq '.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false) | .id'

# Resolve a thread
gh api graphql -f query='
mutation {
  resolveReviewThread(input: {threadId: "<thread_id>"}) {
    thread { isResolved }
  }
}'
```

### Batch Resolve All Threads

Use the `scripts/resolve-threads.sh` script to resolve all unresolved threads at once:

```bash
./.claude/skills/github-workflow/scripts/resolve-threads.sh {owner} {repo} {pr_number}
```

## Common Response Patterns

### For Valid Issues

```
Addressed in commit {hash} - {description of fix}
```

Example:
```
Addressed in commit abc123 - Updated Lambda@Edge handler to use external file pattern
```

### For False Positives

```
This is by design because {explanation}. The {feature} requires {justification}.
```

Example:
```
This is documentation for authorized operators. The commands require IAM permissions that only administrators have. IAM access controls prevent unauthorized access, not documentation obscurity.
```

### For Documentation Concerns

```
The referenced file {filename} exists in the repository at {path}. This is a reference document, not executable code.
```

## Quick Reference

| Task | Command |
|------|---------|
| Create design | Pencil MCP tools |
| Create PR | `gh pr create --title "..." --body "..."` |
| Watch checks | `gh pr checks {pr} --watch` |
| Get comments | `gh api repos/{o}/{r}/pulls/{pr}/comments` |
| Reply to comment | `gh api ... -X POST -F in_reply_to=<id>` |
| Resolve thread | GraphQL `resolveReviewThread` mutation |
| Trigger Q review | `gh pr comment {pr} --body "/q review"` |
| Trigger Codex review | `gh pr comment {pr} --body "/codex review"` |
| Check thread status | GraphQL query for `reviewThreads` |

## Additional Resources

### Reference Files

For detailed commands and conventions, consult:
- **`references/review-commands.md`** - Complete gh CLI and GraphQL command reference
- **`references/commit-conventions.md`** - Branch naming and commit message conventions

### Scripts

Utility scripts in `scripts/`:
- **`reply-to-comments.sh`** - Reply to a specific review comment
- **`resolve-threads.sh`** - Batch resolve all unresolved threads
