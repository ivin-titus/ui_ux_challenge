import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} Axis. All rights reserved.
          </p>

          {/* Footer links */}
          <nav
            className="flex items-center gap-6"
            aria-label="Footer navigation"
          >
            <Link
              href="/blog"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
            <span
              className="text-sm text-slate-400 dark:text-slate-500 cursor-default"
              title="Coming soon"
            >
              About
            </span>
            <span
              className="text-sm text-slate-400 dark:text-slate-500 cursor-default"
              title="Coming soon"
            >
              Privacy
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
