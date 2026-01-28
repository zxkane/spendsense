# SpendSense - Personal Finance Dashboard

## Project Overview

SpendSense is a personal finance dashboard that helps users track their spending and visualize where their money goes. Built to demonstrate Claude Code's autonomous development workflow.

## Tech Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | Next.js 14 (App Router) | Modern React with server components |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI development with consistent design |
| Charts | Recharts | Lightweight, React-native charting |
| Testing | Vitest + Playwright | Fast unit tests + reliable E2E |
| Data | LocalStorage | Zero backend complexity for demo |

## Development Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run E2E tests

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # TypeScript type check
npm run build            # Production build
```

## Project Structure

```
src/
├── app/                 # Next.js pages
│   ├── page.tsx         # Dashboard (home)
│   ├── transactions/    # Transaction management
│   └── layout.tsx       # Root layout
├── components/
│   ├── ui/              # shadcn/ui components
│   └── ...              # App components
├── lib/
│   ├── utils.ts         # Utility functions
│   ├── types.ts         # TypeScript interfaces
│   ├── storage.ts       # LocalStorage functions
│   └── calculations.ts  # Chart calculations
└── test/
    └── setup.ts         # Test setup

e2e/                     # Playwright E2E tests
docs/
├── designs/             # PRD documents
└── test-cases/          # Test case documents
```

## Data Model

```typescript
interface Transaction {
  id: string;
  amount: number;        // In cents
  description: string;
  category: Category;
  date: string;          // YYYY-MM-DD
  createdAt: string;
}

type Category = 'food' | 'transport' | 'entertainment' | 'shopping' | 'bills' | 'other';
```

## LocalStorage Keys

| Key | Description |
|-----|-------------|
| `spendsense-transactions` | Array of Transaction objects |

## Development Workflow

This project follows the Claude Code autonomous development workflow:

1. **Design Canvas** → Create/update `docs/designs/<feature>.md`
2. **Test Cases** → Write `docs/test-cases/<feature>.md`
3. **Implementation** → Build the feature
4. **Unit Tests** → Achieve >80% coverage
5. **E2E Tests** → Verify on preview environment
6. **PR Review** → Create PR with green CI

## Feature Roadmap

### Phase 1 (Current)
- [x] Project setup with CI/CD
- [x] Coming Soon landing page

### Phase 2 (Autonomous)
- [ ] Transaction Management (add/view/delete)
- [ ] Spending Dashboard (charts and stats)

## Security Notes

- No backend - all data stored locally in browser
- No authentication required
- No sensitive data handling
