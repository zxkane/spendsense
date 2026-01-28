# PRD: Spending Dashboard

## Overview

Implement the spending dashboard feature for SpendSense, providing visual insights into spending patterns through charts and summary statistics.

## User Story

As a user, I want to see visual charts of my spending so I can understand my financial habits.

## Requirements

### Functional Requirements

#### 1. Summary Statistics
- **Total Spending This Month**: Sum of all transactions in current month
- **Transaction Count**: Number of transactions this month
- **Top Category**: Category with highest spending

#### 2. Category Pie Chart
- Display spending breakdown by category
- Show percentage and amount for each category
- Interactive: hover to see details
- Use distinct colors for each category

#### 3. Daily Spending Bar Chart
- Show spending for the last 7 days
- X-axis: dates
- Y-axis: amount spent
- Highlight current day

#### 4. Empty State
- Friendly message when no transactions exist
- Call-to-action to add first transaction

### Non-Functional Requirements

- Charts must be responsive (mobile-friendly)
- Charts should animate on load
- Use Recharts library for all visualizations
- Performance: render smoothly with 100+ transactions

## UI/UX Specifications

### Dashboard Layout
```
┌─────────────────────────────────────────────────────┐
│ SpendSense Dashboard                                │
├─────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│ │ Total Spent │ │ Transactions│ │ Top Category│    │
│ │   $1,234    │ │     45      │ │    Food     │    │
│ └─────────────┘ └─────────────┘ └─────────────┘    │
├─────────────────────────────────────────────────────┤
│ ┌──────────────────┐ ┌────────────────────────┐    │
│ │   Pie Chart      │ │    Bar Chart           │    │
│ │   (By Category)  │ │    (Last 7 Days)       │    │
│ │      [PIE]       │ │    ▓▓▓▓▓▓▓▓▓▓▓▓▓      │    │
│ │                  │ │    ▓▓▓  ▓▓▓  ▓▓▓       │    │
│ │ Food: 40%        │ │    Mon Tue Wed ...     │    │
│ │ Transport: 25%   │ │                        │    │
│ │ ...              │ │                        │    │
│ └──────────────────┘ └────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│         📊 No spending data yet                     │
│                                                     │
│    Start tracking your expenses to see             │
│    insights about your spending habits.            │
│                                                     │
│         [Add Your First Transaction]               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Acceptance Criteria

- [ ] Dashboard shows correct total spending for current month
- [ ] Pie chart displays accurate category breakdown
- [ ] Bar chart shows daily spending for last 7 days
- [ ] Charts update when transactions change
- [ ] Empty state displays when no transactions exist
- [ ] Charts are readable on mobile devices
- [ ] Dashboard navigation works from any page

## Technical Implementation

### Files to Create/Modify

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Update from Coming Soon to Dashboard |
| `src/lib/calculations.ts` | Statistics calculation functions |
| `src/components/StatCard.tsx` | Summary statistic card |
| `src/components/CategoryPieChart.tsx` | Pie chart component |
| `src/components/DailyBarChart.tsx` | Bar chart component |
| `src/components/EmptyState.tsx` | Empty state component |

### Calculation Functions

```typescript
// src/lib/calculations.ts
export function calculateMonthlyTotal(transactions: Transaction[]): number
export function calculateCategoryBreakdown(transactions: Transaction[]): CategoryData[]
export function calculateDailySpending(transactions: Transaction[], days: number): DailyData[]
export function getTopCategory(transactions: Transaction[]): string | null
```

### Chart Data Structures

```typescript
interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface DailyData {
  date: string;
  amount: number;
  label: string; // "Mon", "Tue", etc.
}
```

## Test Requirements

### Unit Tests
- `calculateMonthlyTotal`: various transaction sets
- `calculateCategoryBreakdown`: correct percentages
- `calculateDailySpending`: correct date aggregation
- Edge cases: empty data, single transaction, cross-month

### E2E Tests
- Dashboard loads with correct summary stats
- Add transactions → verify charts update
- Empty state → add transaction → verify charts appear
- Mobile responsive: charts render correctly on small screens

## Definition of Done

- [ ] Design canvas at `docs/designs/spending-dashboard.md`
- [ ] Test cases at `docs/test-cases/spending-dashboard.md`
- [ ] All unit tests passing
- [ ] E2E tests passing on Vercel preview
- [ ] PR created with green CI
- [ ] Code review completed

## Dependencies

- Requires Transaction Management feature to be complete
- Uses transactions from LocalStorage

## Out of Scope

- Date range selection (future enhancement)
- Multiple time period comparisons
- Budget goal visualization
- Export charts as images
