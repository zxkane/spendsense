'use client';

import { useState } from 'react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { Transaction, TransactionInput } from '@/lib/types';
import { getTransactions, addTransaction, deleteTransaction } from '@/lib/storage';

export default function TransactionsPage() {
  // Lazy initialization - runs once on mount, client-side only
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window === 'undefined') return [];
    return getTransactions();
  });

  const handleAddTransaction = (input: TransactionInput) => {
    addTransaction(input);
    setTransactions(getTransactions());
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
    setTransactions(getTransactions());
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <nav className="text-sm text-muted-foreground mb-2">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Transactions</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        </header>

        <main className="space-y-8">
          <section className="border rounded-lg p-6">
            <TransactionForm onSubmit={handleAddTransaction} />
          </section>

          <section>
            <TransactionList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
