export type Role = {
  company: string;
  title: string;
  /** Shown as written, e.g. "2023–2026". */
  dates: string;
  highlights: readonly string[];
};

/** The home page's Experience section, newest first. */
export const ROLES: readonly Role[] = [
  {
    company: "Best Buy",
    title: "Staff Engineer, Unified Presentation Architecture",
    dates: "2026–present",
    highlights: [
      "Made internal developer tooling 10× faster, and cut the time users wait for the next frame by 40–70% across platforms. On one platform, search results finish appearing 8 seconds faster.",
      "Drove Best Buy’s first multi-version production deployment, which routes live traffic across more than 2 versions at once for real-world performance testing.",
      "Wrote architecture docs that both engineers and AI coding agents can follow, so generated code fits the architecture.",
    ],
  },
  {
    company: "Best Buy",
    title: "Staff Engineer, Product Detail Platform",
    dates: "2023–2026",
    highlights: [
      "Designed and personally carried out the flagship Product Detail Page’s move to the Next.js App Router and streaming SSR, which gave big performance gains.",
      "Created the frontend architecture now used for new apps, built to share code between web and mobile.",
      "Reworked how bots access product data, removing thousands of expensive requests per second from core APIs without hurting bot-driven revenue.",
      "Most senior engineer (IC) over the web and app product detail pages, while simultaneously supporting teams under several VPs.",
    ],
  },
  {
    company: "Shipt",
    title: "Staff Engineer",
    dates: "2021–2023",
    highlights: [
      "Extended the personal-shopper app into last-mile delivery for several Fortune 100 retailers.",
      "Built multi-retailer routing, a permanent efficiency gain of more than $3M a year.",
      "Pushed for simple, usable designs for gig workers, and for small, measurable increments.",
    ],
  },
];

/** One line for everything before ROLES. */
export const EARLIER_EXPERIENCE =
  "TempWorks Software, 2016–2021: Web Developer, then Software Architect, then Principal Developer. I led cross-platform React and React Native launches and mentored developers up to tech lead.";
