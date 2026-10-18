import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { EARLIER_EXPERIENCE, ROLES } from "@/content/experience";
import { PROJECTS } from "@/content/projects";
import headshot from "@/content/tom-mahle.jpg";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-4 sm:gap-5">
          <Image
            src={headshot}
            alt="Tom Mahle"
            width={96}
            height={96}
            priority
            className="size-20 shrink-0 rounded-[var(--radius-fully-round)] border border-border sm:size-24"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tom Mahle
            </h1>
            <p className="text-lg font-medium">
              Staff Software Engineer · Frontend architecture
            </p>
          </div>
        </div>
        <p className="text-lg text-muted">
          I’ve spent 12+ years building web and mobile frontends. Most recently
          that’s been at Best Buy, where I lead frontend architecture,
          performance and developer tooling. I like owning hard problems end to
          end. That has meant migrating a flagship page to streaming SSR,
          finding out why users wait on the next frame, and making the right way
          to build the easy way, for engineers and AI coding agents alike.
        </p>
        <p className="text-lg text-muted">
          Open to Staff+ roles in frontend architecture and platform.
        </p>
      </section>

      <section aria-labelledby="experience" className="flex flex-col gap-4">
        <h2
          id="experience"
          className="scroll-mt-6 text-2xl font-semibold tracking-tight"
        >
          Experience
        </h2>
        <ol role="list" className="flex flex-col gap-6">
          {ROLES.map((role) => (
            <li key={role.title} className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">
                {role.company} · {role.title}
              </h3>
              <p className="text-sm text-muted">{role.dates}</p>
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="text-muted">
          <span className="font-medium text-foreground">Earlier:</span>{" "}
          {EARLIER_EXPERIENCE}
        </p>
      </section>

      <section aria-labelledby="projects" className="flex flex-col gap-4">
        <h2
          id="projects"
          className="scroll-mt-6 text-2xl font-semibold tracking-tight"
        >
          Projects
        </h2>
        <ul role="list" className="flex flex-col gap-4">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
