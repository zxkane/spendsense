import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getTransactions, addTransaction, deleteTransaction } from './storage';
import { Transaction, TransactionInput } from './types';

const STORAGE_KEY = 'spendsense-transactions';

// Mock crypto.randomUUID
vi.stubGlobal('crypto', {
  randomUUID: vi.fn(() => 'test-uuid-' + Math.random().toString(36).substr(2, 9)),
});

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('getTransactions', () => {
    it('returns empty array when no transactions exist', () => {
      const result = getTransactions();
      expect(result).toEqual([]);
    });

    it('returns empty array when localStorage has invalid JSON', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid json');
      const result = getTransactions();
      expect(result).toEqual([]);
    });

    it('returns transactions sorted by date descending (newest first)', () => {
      const transactions: Transaction[] = [
        {
          id: '1',
          amount: 1000,
          description: 'Oldest',
          category: 'food',
          date: '2025-01-27',
          createdAt: '2025-01-27T10:00:00Z',
        },
        {
          id: '2',
          amount: 2000,
          description: 'Newest',
          category: 'transport',
          date: '2025-01-29',
          createdAt: '2025-01-29T10:00:00Z',
        },
        {
          id: '3',
          amount: 1500,
          description: 'Middle',
          category: 'shopping',
          date: '2025-01-28',
          createdAt: '2025-01-28T10:00:00Z',
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));

      const result = getTransactions();

      expect(result).toHaveLength(3);
      expect(result[0].description).toBe('Newest');
      expect(result[1].description).toBe('Middle');
      expect(result[2].description).toBe('Oldest');
    });

    it('preserves transaction data integrity', () => {
      const transaction: Transaction = {
        id: 'test-id',
        amount: 4550,
        description: 'Test transaction',
        category: 'entertainment',
        date: '2025-01-29',
        createdAt: '2025-01-29T12:00:00Z',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([transaction]));

      const result = getTransactions();

      expect(result[0]).toEqual(transaction);
    });
  });

  describe('addTransaction', () => {
    it('adds a new transaction with generated id and createdAt', () => {
      const input: TransactionInput = {
        amount: 4550,
        description: 'Grocery shopping',
        category: 'food',
        date: '2025-01-29',
      };

      const result = addTransaction(input);

      expect(result.id).toBeTruthy();
      expect(result.id).toMatch(/^test-uuid-/);
      expect(result.createdAt).toBeTruthy();
      expect(result.amount).toBe(4550);
      expect(result.description).toBe('Grocery shopping');
      expect(result.category).toBe('food');
      expect(result.date).toBe('2025-01-29');
    });

    it('persists transaction to localStorage', () => {
      const input: TransactionInput = {
        amount: 1200,
        description: 'Uber ride',
        category: 'transport',
        date: '2025-01-28',
      };

      addTransaction(input);

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].description).toBe('Uber ride');
    });

    it('adds multiple transactions correctly', () => {
      addTransaction({
        amount: 1000,
        description: 'First',
        category: 'food',
        date: '2025-01-27',
      });
      addTransaction({
        amount: 2000,
        description: 'Second',
        category: 'transport',
        date: '2025-01-28',
      });
      addTransaction({
        amount: 3000,
        description: 'Third',
        category: 'shopping',
        date: '2025-01-29',
      });

      const transactions = getTransactions();
      expect(transactions).toHaveLength(3);
    });

    it('generates unique IDs for each transaction', () => {
      const ids = new Set<string>();

      for (let i = 0; i < 10; i++) {
        const result = addTransaction({
          amount: 100 * i,
          description: `Transaction ${i}`,
          category: 'other',
          date: '2025-01-29',
        });
        ids.add(result.id);
      }

      expect(ids.size).toBe(10);
    });
  });

  describe('deleteTransaction', () => {
    it('removes transaction by id', () => {
      const transaction = addTransaction({
        amount: 4550,
        description: 'To be deleted',
        category: 'food',
        date: '2025-01-29',
      });

      deleteTransaction(transaction.id);

      const transactions = getTransactions();
      expect(transactions).toHaveLength(0);
    });

    it('does not throw error when deleting non-existent id', () => {
      addTransaction({
        amount: 1000,
        description: 'Keep this',
        category: 'food',
        date: '2025-01-29',
      });

      expect(() => deleteTransaction('non-existent-id')).not.toThrow();

      const transactions = getTransactions();
      expect(transactions).toHaveLength(1);
    });

    it('only removes the specified transaction', () => {
      const t1 = addTransaction({
        amount: 1000,
        description: 'First',
        category: 'food',
        date: '2025-01-27',
      });
      addTransaction({
        amount: 2000,
        description: 'Second',
        category: 'transport',
        date: '2025-01-28',
      });
      addTransaction({
        amount: 3000,
        description: 'Third',
        category: 'shopping',
        date: '2025-01-29',
      });

      deleteTransaction(t1.id);

      const transactions = getTransactions();
      expect(transactions).toHaveLength(2);
      expect(transactions.find((t) => t.id === t1.id)).toBeUndefined();
    });
  });

  describe('localStorage persistence', () => {
    it('uses correct storage key', () => {
      addTransaction({
        amount: 1000,
        description: 'Test',
        category: 'food',
        date: '2025-01-29',
      });

      expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy();
      expect(localStorage.getItem('wrong-key')).toBeNull();
    });

    it('loads transactions from pre-existing localStorage data', () => {
      const existingData: Transaction[] = [
        {
          id: 'existing-1',
          amount: 5000,
          description: 'Pre-existing',
          category: 'bills',
          date: '2025-01-25',
          createdAt: '2025-01-25T10:00:00Z',
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));

      const transactions = getTransactions();

      expect(transactions).toHaveLength(1);
      expect(transactions[0].id).toBe('existing-1');
    });
  });
});
