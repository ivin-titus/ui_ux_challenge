import { MainLayout } from "@/components/layout";

export const metadata = {
  title: "Privacy Policy | Axis",
  description: "Our privacy policy",
};

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-slate dark:prose-invert">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            At Axis, we value your privacy and are committed to protecting your
            personal information.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We collect information you provide directly, such as your name,
            email, and profile information when you create an account.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Your information is used to provide and improve our services,
            personalize your experience, and communicate with you.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            Data Security
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We implement appropriate security measures to protect your personal
            information from unauthorized access or disclosure.
          </p>

          <p className="text-slate-500 dark:text-slate-500 text-sm mt-12">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
