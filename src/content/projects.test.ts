import { describe, expect, it } from "vitest";
import { PROJECTS } from "./projects";

describe("PROJECTS", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = PROJECTS.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("gives every project a summary and at least one link", () => {
    for (const project of PROJECTS) {
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.links.length).toBeGreaterThan(0);
      for (const link of project.links) {
        expect(link.label).not.toBe("");
        // A path on this site, or a full https URL.
        expect(link.href).toMatch(/^(\/[a-z0-9-]|https:\/\/)/);
      }
    }
  });
});
