export type Category =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'bills'
  | 'other';

export interface Transaction {
  id: string;
  amount: number; // Stored in cents
  description: string;
  category: Category;
  date: string; // ISO date string (YYYY-MM-DD)
  createdAt: string; // ISO timestamp
}

export type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'bills', label: 'Bills' },
  { value: 'other', label: 'Other' },
];
