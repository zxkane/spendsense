# PRD: Transaction Management

## Overview

Implement the core transaction management feature for SpendSense, allowing users to add, view, and delete financial transactions.

## User Story

As a user, I want to add, view, and delete transactions so I can track my daily spending.

## Requirements

### Functional Requirements

#### 1. Transaction Data Model
```typescript
interface Transaction {
  id: string;           // UUID
  amount: number;       // Positive number, stored in cents
  description: string;  // Required, min 1 char
  category: Category;   // Enum of predefined categories
  date: string;         // ISO date string (YYYY-MM-DD)
  createdAt: string;    // ISO timestamp
}

type Category =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'bills'
  | 'other';
```

#### 2. Transaction Form
- **Amount Field**: Number input, required, must be positive
- **Description Field**: Text input, required, max 100 characters
- **Category Field**: Select dropdown with predefined categories
- **Date Field**: Date picker, defaults to today

#### 3. Transaction List
- Display all transactions in a table/list format
- Show: date, description, category, amount
- Each row has a delete button
- Sort by date (newest first)
- Empty state when no transactions

#### 4. Data Persistence
- Store in LocalStorage with key: `spendsense-transactions`
- Load on app initialization
- Save after each add/delete operation

### Non-Functional Requirements

- Form validation with clear error messages
- Responsive design (mobile-friendly)
- Accessible (keyboard navigation, screen reader support)

## UI/UX Specifications

### Transaction Form
```
┌─────────────────────────────────────┐
│ Add Transaction                      │
├─────────────────────────────────────┤
│ Amount*        [$_______________]   │
│ Description*   [________________]   │
│ Category       [Food        ▼]      │
│ Date           [2025-01-28    ]     │
│                                     │
│         [Add Transaction]           │
└─────────────────────────────────────┘
```

### Transaction List
```
┌─────────────────────────────────────────────────────┐
│ Transactions                                         │
├─────────────────────────────────────────────────────┤
│ Date       │ Description    │ Category │ Amount │ X │
│ 2025-01-28 │ Grocery shop   │ Food     │ $45.50 │ 🗑 │
│ 2025-01-27 │ Uber ride      │ Transport│ $12.00 │ 🗑 │
│ ...        │ ...            │ ...      │ ...    │   │
└─────────────────────────────────────────────────────┘
```

## Acceptance Criteria

- [ ] Can add a new transaction with all required fields
- [ ] Transaction appears in list immediately after adding
- [ ] Can delete a transaction from the list
- [ ] Data persists after page refresh
- [ ] Form shows validation errors for invalid input
- [ ] Empty state displays when no transactions exist

## Technical Implementation

### Files to Create/Modify

| File | Purpose |
|------|---------|
| `src/lib/types.ts` | TypeScript interfaces |
| `src/lib/storage.ts` | LocalStorage functions |
| `src/app/transactions/page.tsx` | Transactions page |
| `src/components/TransactionForm.tsx` | Add transaction form |
| `src/components/TransactionList.tsx` | Transaction list table |

### Storage API

```typescript
// src/lib/storage.ts
export function getTransactions(): Transaction[]
export function addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Transaction
export function deleteTransaction(id: string): void
```

## Test Requirements

### Unit Tests (>80% coverage)
- Storage functions (get, add, delete)
- Data validation
- ID generation

### E2E Tests
- Add transaction flow: fill form → submit → verify in list
- Delete transaction flow: click delete → verify removed
- Persistence: add → refresh → verify exists
- Validation: submit empty form → verify error messages

## Definition of Done

- [ ] Design canvas at `docs/designs/transaction-management.md`
- [ ] Test cases at `docs/test-cases/transaction-management.md`
- [ ] All unit tests passing (>80% coverage)
- [ ] E2E tests passing on Vercel preview
- [ ] PR created with green CI
- [ ] Code review completed

## Out of Scope

- Edit existing transactions (future enhancement)
- Bulk import/export
- Search/filter functionality
- Multiple currencies
