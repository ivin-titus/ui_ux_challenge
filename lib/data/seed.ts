// Initial seed data for the blog application

import { User, Post, TopicId } from "../types";

// Helper to generate slug from title
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper to generate excerpt from content
function generateExcerpt(content: string, maxLength: number = 150): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + "...";
}

// Demo avatars - simple gradient SVGs encoded as data URLs
const DEMO_AVATARS = {
  alex: `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#8b5cf6"/></linearGradient></defs><rect fill="url(#g1)" width="100" height="100"/><text x="50" y="62" font-family="system-ui" font-size="40" font-weight="600" fill="white" text-anchor="middle">AC</text></svg>`
  )}`,
  jamie: `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f59e0b"/><stop offset="100%" style="stop-color:#ef4444"/></linearGradient></defs><rect fill="url(#g2)" width="100" height="100"/><text x="50" y="62" font-family="system-ui" font-size="40" font-weight="600" fill="white" text-anchor="middle">JW</text></svg>`
  )}`,
};

// Seed users
export const seedUsers: User[] = [
  {
    id: "user-1",
    email: "alex@example.com",
    username: "alexchen",
    name: "Alex Chen",
    bio: "Full-stack developer passionate about building delightful user experiences. Based in San Francisco.",
    avatar: DEMO_AVATARS.alex,
    password: "password123",
    createdAt: new Date("2025-06-15"),
  },
  {
    id: "user-2",
    email: "jamie@example.com",
    username: "jamiewilson",
    name: "Jamie Wilson",
    bio: "Designer turned developer. I write about the intersection of design and technology.",
    avatar: DEMO_AVATARS.jamie,
    password: "password123",
    createdAt: new Date("2025-08-22"),
  },
  {
    id: "user-3",
    email: "sam@example.com",
    username: "samrivera",
    name: "Sam Rivera",
    bio: "Productivity enthusiast and digital minimalist. Sharing thoughts on intentional living.",
    avatar: null,
    password: "password123",
    createdAt: new Date("2025-10-01"),
  },
];

// Seed posts
const seedPostsData: Array<{
  title: string;
  content: string;
  topicId: TopicId;
  authorId: string;
  authorName: string;
  authorUsername: string;
  daysAgo: number;
  visibility: "public" | "authenticated";
}> = [
  {
    title: "Getting Started with Next.js App Router",
    content: `The App Router in Next.js represents a paradigm shift in how we build React applications. With its file-based routing system and React Server Components support, it offers unprecedented flexibility and performance.

In this post, we'll explore the key concepts that make the App Router special:

**Server Components by Default**
Unlike traditional React applications where everything runs on the client, Next.js App Router treats components as server components by default. This means your components render on the server, sending minimal JavaScript to the client.

**Nested Layouts**
One of the most powerful features is the ability to create nested layouts. Each route segment can define its own layout that wraps its children, making it easy to create consistent UI patterns.

**Loading and Error States**
The App Router provides built-in support for loading and error states through special files like loading.tsx and error.tsx.`,
    topicId: "technology",
    authorId: "user-1",
    authorName: "Alex Chen",
    authorUsername: "alexchen",
    daysAgo: 2,
    visibility: "public" as const,
  },
  {
    title: "The Art of Minimal Design",
    content: `Minimalism in design isn't about removing elements until nothing is left—it's about removing elements until only what matters remains.

**White Space is Your Friend**
The empty space in your design isn't wasted space. It's breathing room that helps users focus on what's important.

**Typography First**
When you strip away decorative elements, typography becomes your primary tool for creating hierarchy and visual interest.

**Intentional Color**
In minimal design, every color choice carries significant weight. Use color to guide attention and create emotional connections.

The goal is clarity. Every element should have a purpose. If you can't explain why something is there, it probably shouldn't be.`,
    topicId: "design",
    authorId: "user-2",
    authorName: "Jamie Wilson",
    authorUsername: "jamiewilson",
    daysAgo: 5,
    visibility: "public" as const,
  },
  {
    title: "Building Better Habits",
    content: `Small changes compound over time. The habits you build today shape the person you become tomorrow.

**Start Ridiculously Small**
Want to read more? Start with one page. Want to exercise? Start with one push-up. The key is making it so easy you can't say no.

**Stack Your Habits**
Link new habits to existing ones. After I pour my morning coffee, I will write for ten minutes. The existing habit becomes a trigger.

**Design Your Environment**
Make good habits easy and bad habits hard. Put the book on your pillow. Put the phone in another room.

Remember: you don't rise to the level of your goals, you fall to the level of your systems.`,
    topicId: "lifestyle",
    authorId: "user-3",
    authorName: "Sam Rivera",
    authorUsername: "samrivera",
    daysAgo: 7,
    visibility: "public" as const,
  },
  {
    title: "Deep Work in a Distracted World",
    content: `The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable.

**Time Block Your Day**
Don't leave your deep work to chance. Schedule it like you would an important meeting.

**Embrace Boredom**
If you always reach for your phone during idle moments, you're training your brain to expect constant stimulation.

**Have a Shutdown Ritual**
Create a clear boundary between work and rest. A simple phrase like "shutdown complete" signals to your brain that work is done.

The deep work hypothesis: the ability to concentrate without distraction on a cognitively demanding task is one of the most valuable skills in our economy.`,
    topicId: "productivity",
    authorId: "user-1",
    authorName: "Alex Chen",
    authorUsername: "alexchen",
    daysAgo: 10,
    visibility: "public" as const,
  },
  {
    title: "Navigating Your First Tech Job",
    content: `Your first job in tech can feel overwhelming. Here's what I wish someone had told me.

**Ask Questions**
Nobody expects you to know everything. Asking questions shows engagement, not weakness.

**Document Everything**
Write down what you learn. Your future self will thank you, and you'll become the go-to person for answers.

**Find a Mentor**
Look for someone whose career path you admire. Most senior developers are happy to share their knowledge.

**Ship Imperfect Work**
Done is better than perfect. You'll learn more from shipping and iterating than from endless polishing.

The first year is about learning, not proving. Give yourself permission to be a beginner.`,
    topicId: "career",
    authorId: "user-2",
    authorName: "Jamie Wilson",
    authorUsername: "jamiewilson",
    daysAgo: 14,
    visibility: "public" as const,
  },
  {
    title: "On Digital Minimalism",
    content: `We didn't sign up for this. The constant notifications, the infinite scroll, the nagging feeling that we're always missing something.

**Technology Should Serve Us**
Every app on your phone should pass a simple test: does this add value to my life?

**Curate Your Inputs**
You are what you consume. Be intentional about the information you let into your mind.

**Create More Than You Consume**
The most fulfilling use of technology is creation. Writing, building, making.

We need a philosophy of technology use. Not abstinence, but intentionality. What do we want from our digital lives?`,
    topicId: "thoughts",
    authorId: "user-3",
    authorName: "Sam Rivera",
    authorUsername: "samrivera",
    daysAgo: 21,
    visibility: "public" as const,
  },
  {
    title: "Behind the Scenes: My Development Setup",
    content: `This is a members-only post where I share the details of my development environment and workflow.

**Hardware**
I use a MacBook Pro M2 with 32GB RAM. The extra memory is worth it for running multiple Docker containers and VMs.

**Editor**
VS Code with a minimal set of extensions. I've learned that too many extensions slow things down.

**Terminal**
iTerm2 with Oh My Zsh. I use tmux for session management when working on remote servers.

**The Key Tools**
- Fig for terminal autocomplete
- Raycast for app launching
- Arc browser for development
- Linear for task tracking

This setup has evolved over years of experimentation. The key is finding what works for you.`,
    topicId: "technology",
    authorId: "user-1",
    authorName: "Alex Chen",
    authorUsername: "alexchen",
    daysAgo: 3,
    visibility: "authenticated" as const,
  },
  {
    title: "My Reading List: Books That Changed My Perspective",
    content: `A curated list of books that have shaped how I think about work, creativity, and life. Members-only content.

**On Work**
- "Deep Work" by Cal Newport
- "The Effective Executive" by Peter Drucker
- "Range" by David Epstein

**On Creativity**
- "Steal Like an Artist" by Austin Kleon
- "The War of Art" by Steven Pressfield
- "Bird by Bird" by Anne Lamott

**On Life**
- "The Obstacle Is the Way" by Ryan Holiday
- "Atomic Habits" by James Clear
- "Essentialism" by Greg McKeown

Each of these books arrived at the right moment and shifted something in how I approach problems.`,
    topicId: "lifestyle",
    authorId: "user-2",
    authorName: "Jamie Wilson",
    authorUsername: "jamiewilson",
    daysAgo: 8,
    visibility: "authenticated" as const,
  },
];

export const seedPosts: Post[] = seedPostsData.map((post, index) => {
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - post.daysAgo);

  return {
    id: `post-${index + 1}`,
    slug: slugify(post.title),
    title: post.title,
    content: post.content,
    excerpt: generateExcerpt(post.content),
    topicId: post.topicId,
    authorId: post.authorId,
    authorName: post.authorName,
    authorUsername: post.authorUsername,
    createdAt,
    visibility: post.visibility,
  };
});
