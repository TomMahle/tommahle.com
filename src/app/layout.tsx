import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { RouteFocus } from "@/components/route-focus";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <RouteFocus />
        <a
          href="#main"
          className="fixed top-2 left-2 z-50 -translate-y-16 rounded-md bg-accent px-4 py-2 font-medium text-on-accent focus:translate-y-0"
        >
          Skip to main content
        </a>
        <header className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight"
            >
              <LeafIcon />
              Tom Mahle
            </Link>
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
          <p className="mx-auto max-w-3xl px-4 py-4 text-sm text-muted sm:px-6">
            <a
              href="https://github.com/TomMahle"
              className="underline underline-offset-2 hover:text-foreground"
            >
              GitHub
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

function LeafIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-7 text-accent"
      fill="currentColor"
    >
      {/* Same shape as app/icon.svg (the favicon). */}
      <path d="M12 2C7 6 4.5 9.6 4.5 13.4A7.5 7.5 0 0 0 11 20.9V22h2v-1.1a7.5 7.5 0 0 0 6.5-7.5C19.5 9.6 17 6 12 2ZM13 18.9V15.4L14.79 13.61Q15.71 12.69 15.92 11.08Q14.31 11.29 13.39 12.21L13 12.6V9Q13 7.2 12 5.8Q11 7.2 11 9V14.6L10.61 14.21Q9.69 13.29 8.08 13.08Q8.29 14.69 9.21 15.61L11 17.4V18.9A5.5 5.5 0 0 1 6.5 13.4C6.5 10.7 8.2 7.9 12 4.6C15.8 7.9 17.5 10.7 17.5 13.4A5.5 5.5 0 0 1 13 18.9Z" />
    </svg>
  );
}
