import type { Metadata } from "next";
import Link from "next/link";
import { PARKS_HOME } from "@/lib/parks/routes";

export const metadata: Metadata = {
  title: {
    default: "Find a Park · New York City",
    template: "%s · Find a Park",
  },
  description:
    "Find a park in New York City: browse the list or the map, then see hours, amenities and directions.",
};

/** Find a Park's own name bar and data notice, inside the site's header and footer. */
export default function FindAParkLayout({
  children,
}: LayoutProps<"/find-a-park">) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-border bg-surface-muted">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6">
          <Link
            href={PARKS_HOME}
            className="flex items-center gap-1.5 rounded-md font-semibold tracking-tight"
          >
            <ParkLeafIcon />
            Find a Park
          </Link>
          <span className="text-sm text-muted">New York City</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
      <p className="mx-auto w-full max-w-7xl px-4 py-4 text-sm text-muted sm:px-6">
        Park listings are sample data for demonstration and may not match real
        parks. Always check with the park before you visit.
      </p>
    </div>
  );
}

/** Find a Park's own leaf (the site's leaf, before its veins spelled T and M). */
function ParkLeafIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 text-accent"
      fill="currentColor"
    >
      <path d="M12 2C7 6 4.5 9.6 4.5 13.4A7.5 7.5 0 0 0 11 20.9V22h2v-1.1a7.5 7.5 0 0 0 6.5-7.5C19.5 9.6 17 6 12 2ZM13 18.9V15.4L14.79 13.61Q15.71 12.69 15.92 11.08Q14.31 11.29 13.39 12.21L13 12.6V9Q13 7.2 12 5.8Q11 7.2 11 9V14.6L10.61 14.21Q9.69 13.29 8.08 13.08Q8.29 14.69 9.21 15.61L11 17.4V18.9A5.5 5.5 0 0 1 6.5 13.4C6.5 10.7 8.2 7.9 12 4.6C15.8 7.9 17.5 10.7 17.5 13.4A5.5 5.5 0 0 1 13 18.9Z" />
    </svg>
  );
}
