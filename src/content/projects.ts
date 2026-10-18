export type ProjectLink = {
  label: string;
  /** A path on this site ("/find-a-park") or a full https URL. */
  href: string;
};

export type Project = {
  /** Unique, URL-safe. */
  slug: string;
  title: string;
  /** A short label shown next to the title, e.g. "Experimental". */
  badge?: string;
  /** One or two sentences: what it is and who it's for. */
  summary: string;
  /** Technologies and practices worth calling out, shown as tags. */
  tags: readonly string[];
  /** The first link is the primary action (usually the live site). */
  links: readonly ProjectLink[];
};

/** The Git as a Data Store talk's write-up on this site. */
export const GIT_TALK_PATH = "/talks/git-as-a-data-store";
/** Where the talk's demo blog is deployed (on Netlify, from its own repo). */
export const GIT_BLOG_DEMO_URL = "https://git-blog.tommahle.com";

/** Projects shown on the home page, newest first. */
export const PROJECTS: readonly Project[] = [
  {
    slug: "find-a-park",
    title: "Find a Park",
    summary:
      "A take-home exercise: an accessible NYC park finder with a list, a map and park pages, submitted after 2 hours of my own time. I set the architecture and direction, Claude Code built it, and I reviewed and steered every change. It meets WCAG 2.2 AA, every map feature works by keyboard, and missing data never breaks a page. Automated browser and accessibility tests run in CI. Later, in under half an hour of wall time, I made it a better citizen of the web: map tiles and photos are now self-hosted instead of loaded from OpenStreetMap’s and Wikimedia’s servers, along with a few other tweaks. The full AI conversation logs for the submission are included alongside the source.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "Leaflet",
      "WCAG 2.2 AA",
      "Playwright + axe",
    ],
    links: [
      { label: "Try it", href: "/find-a-park" },
      { label: "Source code", href: "https://github.com/TomMahle/find-a-park" },
      {
        label: "AI conversation logs",
        href: "https://github.com/TomMahle/find-a-park/tree/main/transcripts",
      },
    ],
  },
  {
    slug: "git-as-a-data-store",
    title: "Git as a Data Store",
    badge: "Experimental",
    summary:
      "A talk and a deliberately hacky demo: a blog with no server, whose admin page runs git in the browser to commit a new post and push it, and Netlify rebuilds the site from that push. It asks how far front-end-only development can go, and why you might (not) want to.",
    tags: ["isomorphic-git", "React", "Netlify", "Talk"],
    links: [
      { label: "Read about it", href: GIT_TALK_PATH },
      { label: "Live demo", href: GIT_BLOG_DEMO_URL },
      {
        label: "Source code",
        href: "https://github.com/TomMahle/isomorphicGitHack",
      },
    ],
  },
];
