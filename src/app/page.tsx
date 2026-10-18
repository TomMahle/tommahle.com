import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/content/projects";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tom Mahle
        </h1>
        {/* TODO(Tom): replace with your own intro. */}
        <p className="text-lg text-muted">
          I build web apps. Here are some projects I’ve worked on.
        </p>
      </section>
      <section aria-labelledby="projects" className="flex flex-col gap-4">
        <h2 id="projects" className="text-2xl font-semibold tracking-tight">
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
