import { Transaction, TransactionInput } from './types';

const STORAGE_KEY = 'spendsense-transactions';

function generateId(): string {
  return crypto.randomUUID();
}

export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const transactions: Transaction[] = JSON.parse(stored);
    // Sort by date descending (newest first)
    return transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

export function addTransaction(input: TransactionInput): Transaction {
  const transaction: Transaction = {
    ...input,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  if (typeof window === 'undefined') {
    return transaction;
  }

  const transactions = getTransactions();
  transactions.push(transaction);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));

  return transaction;
}

export function deleteTransaction(id: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const transactions = getTransactions();
  const filtered = transactions.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
