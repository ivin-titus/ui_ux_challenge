import { AuthForm } from "@/components/auth";
import Link from "next/link";
import { getSession } from "@/lib/data/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In | Axis Blog",
  description: "Sign in or create an account to start writing on Axis Blog.",
};

export default async function AuthPage() {
  // If already logged in, redirect to blog
  const session = await getSession();
  if (session) {
    redirect("/blog");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Skip to content */}
      <a
        href="#auth-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-slate-900 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Main content */}
      <main
        id="auth-content"
        className="flex-1 flex items-center justify-center p-4"
      >
        <AuthForm />
      </main>

      {/* Minimal footer */}
      <footer className="py-4 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} Axis
        </p>
      </footer>
    </div>
  );
}
