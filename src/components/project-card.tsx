import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/** One project on the home page: what it is, what it uses, where to see it. */
export function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 id={headingId} className="text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        {project.badge && (
          <span className="rounded-[var(--radius-fully-round)] border border-border px-2.5 py-0.5 text-sm text-muted">
            {project.badge}
          </span>
        )}
      </div>
      <p>{project.summary}</p>
      <ul role="list" aria-label="Built with" className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-[var(--radius-fully-round)] bg-accent-soft px-2.5 py-0.5 text-sm"
          >
            {tag}
          </li>
        ))}
      </ul>
      <ul role="list" className="flex flex-wrap gap-3 pt-1">
        {project.links.map((link, index) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "inline-flex min-h-11 items-center rounded-md px-4 font-semibold",
                index === 0
                  ? "bg-accent text-on-accent hover:bg-accent-hover"
                  : "border border-border hover:bg-surface-muted",
              )}
            >
              {link.label}
              <span className="sr-only"> ({project.title})</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
