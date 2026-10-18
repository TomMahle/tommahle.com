export type ProjectLink = {
  label: string;
  /** A path on this site ("/find-a-park") or a full https URL. */
  href: string;
};

export type Project = {
  /** Unique, URL-safe. */
  slug: string;
  title: string;
  /** One or two sentences: what it is and who it's for. */
  summary: string;
  /** Technologies and practices worth calling out, shown as tags. */
  tags: readonly string[];
  /** The first link is the primary action (usually the live site). */
  links: readonly ProjectLink[];
};

/** Projects shown on the home page, newest first. */
export const PROJECTS: readonly Project[] = [
  {
    slug: "find-a-park",
    title: "Find a Park",
    summary:
      "An accessible park finder for New York City residents: browse a list or a map, search, and open a park for its hours, amenities, photos and directions. Built as a take-home exercise with Claude Code; it runs here, on this site.",
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
];
