import { Card, CardContent } from "@/components/ui/card";
import { FileImage } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardContent className="pt-12 pb-12 px-8">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-4">
              <FileImage className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Social Card Generator
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Transform Markdown into shareable cards
          </p>

          <div className="inline-block px-6 py-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Coming Soon
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
