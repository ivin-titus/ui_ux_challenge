import { MainLayout } from "@/components/layout";

export const metadata = {
  title: "Terms of Service | Axis",
  description: "Our terms of service",
};

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-slate dark:prose-invert">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Welcome to Axis. By using our platform, you agree to these terms.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            Acceptable Use
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            You agree to use Axis responsibly and not to post content that is
            harmful, offensive, or violates others rights.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            Your Content
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            You retain ownership of content you post. By posting, you grant us a
            license to display and distribute your content on our platform.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            Account Responsibilities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            You are responsible for maintaining the security of your account and
            for all activities under your account.
          </p>

          <p className="text-slate-500 dark:text-slate-500 text-sm mt-12">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
