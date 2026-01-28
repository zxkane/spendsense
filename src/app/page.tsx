import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardContent className="pt-12 pb-12 px-8">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900 p-4">
              <Wallet className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            SpendSense
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Track your spending, understand your habits
          </p>

          <div className="inline-block px-6 py-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
            <span className="text-emerald-700 dark:text-emerald-300 font-medium">
              Coming Soon
            </span>
          </div>

          <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-500">
            A simple personal finance dashboard to help you visualize where your money goes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
