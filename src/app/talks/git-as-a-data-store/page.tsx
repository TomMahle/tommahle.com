import type { Metadata } from "next";
import Link from "next/link";
import { GIT_BLOG_DEMO_URL } from "@/content/projects";

export const metadata: Metadata = {
  title: "Git as a Data Store",
  description:
    "A talk and demo: a blog with no server, where the browser commits new posts to git and Netlify rebuilds the site.",
};

const linkClass =
  "font-medium text-accent underline underline-offset-2 hover:text-accent-hover";

export default function GitAsADataStore() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1 rounded-md font-medium text-accent hover:text-accent-hover hover:underline"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>
      </div>

      <header className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted">Talk · Experimental</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Git as a Data Store
        </h1>
        <p className="text-lg text-muted">
          How to stop writing servers, and why you might (not) want to. A
          lightning talk I gave as a senior engineer, with a demo that is
          deliberately a hack.
        </p>
      </header>

      <section aria-labelledby="how" className="flex flex-col gap-3">
        <h2 id="how" className="text-2xl font-semibold tracking-tight">
          How it works
        </h2>
        <p>
          The demo is a blog with no server and no database. Three facts add up:
        </p>
        <ol className="flex list-decimal flex-col gap-2 pl-5">
          <li>
            <a href="https://isomorphic-git.org" className={linkClass}>
              isomorphic-git
            </a>{" "}
            is git written in JavaScript, so it runs in a browser: clone, commit
            and push, with a virtual file system standing in for a disk.
          </li>
          <li>
            A website can be built from a git repo. The blog’s posts are a JSON
            file in that repo.
          </li>
          <li>
            Netlify watches the repo, and every push rebuilds and redeploys the
            site.
          </li>
        </ol>
        <p>
          So the blog’s admin page clones its own repo into the browser, adds
          the new post to the JSON file, commits it and pushes. About a minute
          later, the rebuilt site shows the post. Writing a post is “front-end
          development” only.
        </p>
      </section>

      <section aria-labelledby="when" className="flex flex-col gap-3">
        <h2 id="when" className="text-2xl font-semibold tracking-tight">
          Is this ever useful?
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            Contract work: a blog or small site with only a few admins, who may
            even be happy editing HTML.
          </li>
          <li>
            Quick prototypes that need to save something, without a backend.
          </li>
          <li>
            A personal blog, if you don’t mind what a future employer makes of
            the commit history.
          </li>
        </ul>
      </section>

      <section aria-labelledby="tradeoffs" className="flex flex-col gap-3">
        <h2 id="tradeoffs" className="text-2xl font-semibold tracking-tight">
          Why you might not want to
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            <strong>Credentials in the browser.</strong> Pushing needs a GitHub
            token, typed into the page. Browsers can’t talk to GitHub’s git
            server directly, so requests go through a CORS proxy, which sees
            that token. Only use a fine-grained token limited to the one repo,
            or run your own proxy.
          </li>
          <li>
            <strong>Everyone writes to one file.</strong> Two admins posting at
            once means one push is rejected (or, with a force push, one post is
            lost).
          </li>
          <li>
            <strong>Slow writes.</strong> Each change waits for a full rebuild
            and deploy.
          </li>
          <li>
            <strong>Everything is public.</strong> Every draft and edit stays in
            the repo’s history.
          </li>
        </ul>
        <p>
          That’s why the public demo is read-only: it shows the blog and
          explains the trick, with posting switched off.
        </p>
      </section>

      <section aria-labelledby="links" className="flex flex-col gap-3">
        <h2 id="links" className="text-2xl font-semibold tracking-tight">
          Links
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            <a href={GIT_BLOG_DEMO_URL} className={linkClass}>
              The demo blog
            </a>
          </li>
          <li>
            <a
              href="https://github.com/TomMahle/isomorphicGitHack"
              className={linkClass}
            >
              Source code
            </a>
            : fork it and try it yourself.
          </li>
          <li>
            <a
              href="https://news.ycombinator.com/item?id=22420231"
              className={linkClass}
            >
              The Hacker News post
            </a>{" "}
            by Sammi that inspired it.
          </li>
        </ul>
      </section>
    </article>
  );
}
