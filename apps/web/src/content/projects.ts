export type ProjectLink = {
  label: string;
  /** A path on this site ("/find-a-park") or a full https URL. */
  href: string;
};

/** A bullet: plain text, or text with links mixed in. */
export type Highlight = string | readonly (string | ProjectLink)[];

export type Project = {
  /** Unique, URL-safe. */
  slug: string;
  title: string;
  /** A short label shown next to the title, e.g. "Experimental". */
  badge?: string;
  /** One or two sentences: what it is and who it's for. */
  summary: string;
  /** Details, shown as bullets under the summary. */
  highlights?: readonly Highlight[];
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
    slug: "this-website",
    title: "This website",
    summary:
      "The site you’re on. Fast is a lot easier when things are small and simple.",
    highlights: [
      "100 on Lighthouse, mobile and desktop. Lighthouse shows fireworks when you manage that; if you don’t see them, try an incognito window to rule out extensions, and let me know if there’s still an issue 😁",
      "Started as a copy of the Find a Park repo, history included, so it inherits that project’s simple, blazing fast and super reliable setup: Next.js 16, accessibility tests in both color themes, and CI on every push.",
      "Built with Claude Code under my careful direction.",
      "Runs on Vercel’s free plan, with self-hosted images and map tiles sized to fit.",
    ],
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "WCAG 2.2 AA"],
    links: [
      {
        label: "Source code",
        href: "https://github.com/TomMahle/tommahle.com",
      },
    ],
  },
  {
    slug: "find-a-park",
    title: "Find a Park",
    summary:
      "A take-home exercise: an accessible NYC park finder with a list, a map and park pages, submitted after 2 hours of my own time. Later, in under half an hour of wall time, I made it a better citizen of the web.",
    highlights: [
      "Bigger and more complex than this site, and still 100 on Lighthouse, mobile and desktop. Still nothing compared to enterprise software.",
      "I set the architecture and direction, Claude Code built it, and I reviewed and steered every change.",
      "Meets WCAG 2.2 AA, every map feature works by keyboard, and missing data never breaks a page. Automated browser and accessibility tests run in CI.",
      "Map tiles and photos are self-hosted instead of loaded from OpenStreetMap’s and Wikimedia’s servers.",
      [
        "Self-hosting the tiles was simple: the map asks for only the bytes it needs with ",
        {
          label: "HTTP Range requests",
          href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Range",
        },
        ", and Next.js serves those out of the box.",
      ],
      "The full AI conversation logs for the submission are included alongside the source.",
    ],
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
