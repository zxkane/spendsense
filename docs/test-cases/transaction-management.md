# Transaction Management Test Cases

## Overview

- **Feature**: F001 - Transaction Management
- **PRD Reference**: [docs/designs/prd-transaction-management.md](../designs/prd-transaction-management.md)
- **Design Document**: [docs/designs/transaction-management.pen](../designs/transaction-management.pen)
- **Date Created**: 2025-01-29
- **Last Updated**: 2025-01-29

## Test Environment

| Environment | URL | Notes |
|------------|-----|-------|
| Local | http://localhost:3000/transactions | Development |
| Preview | Vercel Preview URL | PR Preview |

## Test Data

```typescript
// Valid transaction data
const validTransaction = {
  amount: 4550,  // $45.50 in cents
  description: "Grocery shopping",
  category: "food",
  date: "2025-01-29"
};

// Categories
const categories = ["food", "transport", "entertainment", "shopping", "bills", "other"];
```

---

## Unit Test Scenarios

### TC-TRANS-001: Add Transaction - Happy Path

- **Description**: Successfully add a new transaction with valid data
- **Preconditions**:
  - LocalStorage is accessible
  - No existing transactions (or known state)
- **Test Steps**:
  1. Call `addTransaction({ amount: 4550, description: "Grocery", category: "food", date: "2025-01-29" })`
  2. Verify returned transaction object
  3. Call `getTransactions()` to verify persistence
- **Expected Result**:
  - Returns transaction with generated `id` (UUID) and `createdAt` timestamp
  - Transaction appears in `getTransactions()` result
  - LocalStorage contains the transaction
- **Priority**: P0 (Critical)
- **Type**: Unit

---

### TC-TRANS-002: Get Transactions - Returns Sorted List

- **Description**: Retrieve all transactions sorted by date (newest first)
- **Preconditions**:
  - Multiple transactions exist with different dates
- **Test Steps**:
  1. Add transaction with date "2025-01-27"
  2. Add transaction with date "2025-01-29"
  3. Add transaction with date "2025-01-28"
  4. Call `getTransactions()`
- **Expected Result**:
  - Returns array sorted by date descending
  - Order: 2025-01-29, 2025-01-28, 2025-01-27
- **Priority**: P1 (High)
- **Type**: Unit

---

### TC-TRANS-003: Delete Transaction - Success

- **Description**: Successfully delete an existing transaction
- **Preconditions**:
  - At least one transaction exists
- **Test Steps**:
  1. Add a transaction, capture its ID
  2. Call `deleteTransaction(id)`
  3. Call `getTransactions()`
- **Expected Result**:
  - Transaction no longer in list
  - LocalStorage updated
- **Priority**: P0 (Critical)
- **Type**: Unit

---

### TC-TRANS-004: Delete Transaction - Non-existent ID

- **Description**: Attempt to delete a transaction with invalid ID
- **Preconditions**:
  - Transaction with given ID does not exist
- **Test Steps**:
  1. Call `deleteTransaction("non-existent-id")`
- **Expected Result**:
  - Function completes without error
  - No transactions removed
- **Priority**: P2 (Medium)
- **Type**: Unit

---

### TC-TRANS-005: Get Transactions - Empty State

- **Description**: Retrieve transactions when none exist
- **Preconditions**:
  - LocalStorage is empty or key doesn't exist
- **Test Steps**:
  1. Clear LocalStorage
  2. Call `getTransactions()`
- **Expected Result**:
  - Returns empty array `[]`
  - No errors thrown
- **Priority**: P1 (High)
- **Type**: Unit

---

### TC-TRANS-006: Transaction ID Generation

- **Description**: Verify unique ID generation for each transaction
- **Preconditions**: None
- **Test Steps**:
  1. Add multiple transactions in quick succession
  2. Collect all IDs
- **Expected Result**:
  - All IDs are unique
  - IDs are valid UUID format
- **Priority**: P1 (High)
- **Type**: Unit

---

### TC-TRANS-007: Amount Validation - Positive Number

- **Description**: Validate amount is stored correctly as positive integer (cents)
- **Test Data**:
  - Valid: 100 (=$1.00), 4550 (=$45.50), 1 (=$0.01)
  - Edge: 0 should be rejected
- **Test Steps**:
  1. Add transaction with amount 4550
  2. Retrieve transaction
- **Expected Result**:
  - Amount stored as integer in cents
  - Can be converted to display format ($45.50)
- **Priority**: P1 (High)
- **Type**: Unit

---

### TC-TRANS-008: Description Validation

- **Description**: Validate description field constraints
- **Test Data**:
  - Min: 1 character
  - Max: 100 characters
  - Empty: should fail validation
- **Test Steps**:
  1. Test with single character "A"
  2. Test with 100 characters
  3. Test with empty string
- **Expected Result**:
  - Single char: valid
  - 100 chars: valid
  - Empty: validation error
- **Priority**: P1 (High)
- **Type**: Unit

---

### TC-TRANS-009: Category Validation

- **Description**: Validate category is one of predefined values
- **Test Data**:
  - Valid: "food", "transport", "entertainment", "shopping", "bills", "other"
  - Invalid: "invalid-category", "", null
- **Test Steps**:
  1. Add transaction with each valid category
  2. Attempt with invalid category
- **Expected Result**:
  - Valid categories accepted
  - Invalid categories rejected with error
- **Priority**: P1 (High)
- **Type**: Unit

---

### TC-TRANS-010: Date Format Validation

- **Description**: Validate date is stored as ISO date string
- **Test Data**:
  - Valid: "2025-01-29"
  - Invalid: "01/29/2025", "Jan 29, 2025"
- **Test Steps**:
  1. Add transaction with valid ISO date
  2. Verify date format in storage
- **Expected Result**:
  - Date stored as "YYYY-MM-DD" format
- **Priority**: P1 (High)
- **Type**: Unit

---

### TC-TRANS-011: LocalStorage Persistence

- **Description**: Verify data persists correctly to LocalStorage
- **Preconditions**:
  - LocalStorage available
- **Test Steps**:
  1. Add transaction
  2. Read directly from LocalStorage key "spendsense-transactions"
  3. Parse JSON and verify structure
- **Expected Result**:
  - Data stored under correct key
  - JSON structure matches Transaction interface
- **Priority**: P0 (Critical)
- **Type**: Unit

---

### TC-TRANS-012: LocalStorage Load on Init

- **Description**: Verify transactions load correctly from LocalStorage
- **Preconditions**:
  - LocalStorage contains valid transaction data
- **Test Steps**:
  1. Manually set LocalStorage with test data
  2. Call `getTransactions()`
- **Expected Result**:
  - Returns transactions from LocalStorage
  - Data integrity maintained
- **Priority**: P0 (Critical)
- **Type**: Unit

---

## E2E Test Scenarios

### TC-TRANS-E2E-001: Add Transaction Flow

- **Description**: Complete flow of adding a transaction via UI
- **Preconditions**:
  - App is running
  - On /transactions page
- **Test Steps**:
  1. Navigate to /transactions
  2. Enter amount "45.50" in Amount field
  3. Enter "Grocery shopping" in Description field
  4. Select "Food" from Category dropdown
  5. Select today's date
  6. Click "Add Transaction" button
- **Expected Result**:
  - Transaction appears in list immediately
  - Form fields are cleared
  - Success feedback (optional)
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-TRANS-E2E-002: Delete Transaction Flow

- **Description**: Complete flow of deleting a transaction via UI
- **Preconditions**:
  - At least one transaction exists in list
- **Test Steps**:
  1. Navigate to /transactions
  2. Locate a transaction row
  3. Click the delete (trash) icon
  4. Confirm deletion (if confirmation dialog exists)
- **Expected Result**:
  - Transaction removed from list
  - List updates without page refresh
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-TRANS-E2E-003: Data Persistence After Refresh

- **Description**: Verify transactions persist after page refresh
- **Preconditions**:
  - Transactions exist in the app
- **Test Steps**:
  1. Add a new transaction
  2. Refresh the page (F5)
  3. Verify transaction list
- **Expected Result**:
  - All transactions still visible
  - Data integrity maintained
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-TRANS-E2E-004: Form Validation - Required Fields

- **Description**: Verify form shows validation errors for missing required fields
- **Preconditions**:
  - On /transactions page
- **Test Steps**:
  1. Leave Amount field empty
  2. Leave Description field empty
  3. Click "Add Transaction" button
- **Expected Result**:
  - Form does not submit
  - Error messages displayed for required fields
  - Fields highlighted with error state
- **Priority**: P0 (Critical)
- **Type**: E2E

---

### TC-TRANS-E2E-005: Form Validation - Invalid Amount

- **Description**: Verify form rejects invalid amount values
- **Test Data**:
  - Negative: -50
  - Zero: 0
  - Non-numeric: "abc"
- **Test Steps**:
  1. Enter invalid amount
  2. Fill other fields correctly
  3. Submit form
- **Expected Result**:
  - Form does not submit
  - Error message for amount field
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-TRANS-E2E-006: Empty State Display

- **Description**: Verify empty state UI when no transactions exist
- **Preconditions**:
  - No transactions in LocalStorage
- **Test Steps**:
  1. Clear LocalStorage
  2. Navigate to /transactions
- **Expected Result**:
  - Empty state message displayed: "No transactions yet"
  - CTA button to add first transaction
  - No table/list visible
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-TRANS-E2E-007: Transaction List Sorting

- **Description**: Verify transactions display in correct order (newest first)
- **Preconditions**:
  - Multiple transactions with different dates
- **Test Steps**:
  1. Add transactions with various dates
  2. Observe list order
- **Expected Result**:
  - Most recent date at top
  - Oldest date at bottom
- **Priority**: P1 (High)
- **Type**: E2E

---

### TC-TRANS-E2E-008: Responsive Design - Mobile

- **Description**: Verify UI works on mobile viewport
- **Preconditions**:
  - App running
- **Test Steps**:
  1. Set viewport to mobile (375x667)
  2. Navigate to /transactions
  3. Test add transaction form
  4. Verify list display
- **Expected Result**:
  - All elements accessible
  - Form usable on mobile
  - No horizontal scroll
- **Priority**: P2 (Medium)
- **Type**: E2E

---

### TC-TRANS-E2E-009: Keyboard Navigation

- **Description**: Verify form is accessible via keyboard
- **Preconditions**:
  - On /transactions page
- **Test Steps**:
  1. Tab through form fields
  2. Use Enter to submit
  3. Navigate to delete buttons
- **Expected Result**:
  - All interactive elements focusable
  - Logical tab order
  - Actions triggerable via keyboard
- **Priority**: P2 (Medium)
- **Type**: E2E

---

## Test Coverage Summary

| Test ID | Description | Priority | Type | Automated |
|---------|-------------|----------|------|-----------|
| TC-TRANS-001 | Add Transaction - Happy Path | P0 | Unit | ⬜ |
| TC-TRANS-002 | Get Transactions - Sorted | P1 | Unit | ⬜ |
| TC-TRANS-003 | Delete Transaction - Success | P0 | Unit | ⬜ |
| TC-TRANS-004 | Delete Transaction - Invalid ID | P2 | Unit | ⬜ |
| TC-TRANS-005 | Get Transactions - Empty | P1 | Unit | ⬜ |
| TC-TRANS-006 | ID Generation | P1 | Unit | ⬜ |
| TC-TRANS-007 | Amount Validation | P1 | Unit | ⬜ |
| TC-TRANS-008 | Description Validation | P1 | Unit | ⬜ |
| TC-TRANS-009 | Category Validation | P1 | Unit | ⬜ |
| TC-TRANS-010 | Date Format | P1 | Unit | ⬜ |
| TC-TRANS-011 | LocalStorage Persistence | P0 | Unit | ⬜ |
| TC-TRANS-012 | LocalStorage Load | P0 | Unit | ⬜ |
| TC-TRANS-E2E-001 | Add Transaction Flow | P0 | E2E | ⬜ |
| TC-TRANS-E2E-002 | Delete Transaction Flow | P0 | E2E | ⬜ |
| TC-TRANS-E2E-003 | Data Persistence | P0 | E2E | ⬜ |
| TC-TRANS-E2E-004 | Form Validation - Required | P0 | E2E | ⬜ |
| TC-TRANS-E2E-005 | Form Validation - Invalid | P1 | E2E | ⬜ |
| TC-TRANS-E2E-006 | Empty State | P1 | E2E | ⬜ |
| TC-TRANS-E2E-007 | List Sorting | P1 | E2E | ⬜ |
| TC-TRANS-E2E-008 | Responsive Design | P2 | E2E | ⬜ |
| TC-TRANS-E2E-009 | Keyboard Navigation | P2 | E2E | ⬜ |

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

---

## Notes

- LocalStorage key: `spendsense-transactions`
- Amount stored in cents to avoid floating point issues
- Date stored as ISO string (YYYY-MM-DD) for consistent sorting
- createdAt timestamp for audit purposes
