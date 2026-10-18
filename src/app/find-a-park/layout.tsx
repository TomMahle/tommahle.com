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
            className="rounded-md font-semibold tracking-tight"
          >
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
