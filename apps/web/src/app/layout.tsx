import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { RouteFocus } from "@/components/route-focus";
import { THEME_SCRIPT, ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tom Mahle",
    template: "%s · Tom Mahle",
  },
  description: "Tom Mahle's portfolio: projects and the thinking behind them.",
};

/** Sections of the home page. Plain links, so browsers scroll and move focus. */
const SECTION_LINKS = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
];

const FOOTER_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tommahle" },
  { label: "GitHub", href: "https://github.com/TomMahle" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // Smooth scrolling for in-page links only; page changes stay instant.
      data-scroll-behavior="smooth"
      // THEME_SCRIPT may set data-theme before React loads.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <RouteFocus />
        <a
          href="#main"
          className="fixed top-2 left-2 z-50 -translate-y-16 rounded-md bg-accent px-4 py-2 font-medium text-on-accent focus:translate-y-0"
        >
          Skip to main content
        </a>
        <header className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight"
            >
              <LeafIcon />
              Tom Mahle
            </Link>
            <nav aria-label="Sections" className="ml-auto">
              <ul role="list" className="flex items-center gap-1">
                {SECTION_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center rounded-md px-2 font-medium text-muted hover:text-foreground sm:px-3"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <main
          id="main"
          tabIndex={-1}
          className="flex flex-1 flex-col focus:outline-none"
        >
          {children}
        </main>
        <footer className="border-t border-border bg-surface">
          <ul
            role="list"
            aria-label="Profiles"
            className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2 px-4 py-4 text-sm text-muted sm:px-6"
          >
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </body>
    </html>
  );
}

/** A leaf whose veins spell T and M. Same drawing as app/icon.svg (the favicon). */
function LeafIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7 text-accent">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2C7 6 4.5 9.6 4.5 13.4A7.5 7.5 0 0 0 11 20.9V22h2v-1.1a7.5 7.5 0 0 0 6.5-7.5C19.5 9.6 17 6 12 2ZM12 4.6C8.2 7.9 6.5 10.7 6.5 13.4a5.5 5.5 0 0 0 11 0C17.5 10.7 15.8 7.9 12 4.6Z"
      />
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19.6V8.3" />
        <path d="M9.8 8.6Q12 7.6 14.2 8.6" />
        <path d="M12 14.8Q10.1 14 8.9 11.6A3.9 3.9 0 0 0 9.5 16.3" />
        <path d="M12 14.8Q13.9 14 15.1 11.6A3.9 3.9 0 0 1 14.5 16.3" />
      </g>
    </svg>
  );
}
