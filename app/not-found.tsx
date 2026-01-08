import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Page not found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button>Go home</Button>
          </Link>
          <Link href="/blog">
            <Button variant="secondary">Browse blog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
