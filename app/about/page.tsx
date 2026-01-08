import { MainLayout } from "@/components/layout";

export const metadata = {
  title: "About | Axis",
  description: "About Axis blog platform",
};

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          About Axis
        </h1>

        <div className="prose prose-slate dark:prose-invert space-y-6">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Axis is a modern social blogging platform designed for thoughtful
            writers and readers who value meaningful content.
          </p>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our mission is to create a space where ideas can flourish,
            conversations can happen, and connections can be made between people
            who share common interests.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            Features
          </h2>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>Write and share posts on topics you care about</li>
            <li>Connect with other writers through follows and messages</li>
            <li>Discover content organized by topics</li>
            <li>Build your public profile and portfolio</li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            Built With
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Axis is built with Next.js 15, Tailwind CSS 4, and TypeScript,
            focusing on performance, accessibility, and a delightful user
            experience.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
