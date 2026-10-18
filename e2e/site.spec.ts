import { expect, test } from "./fixtures";

const darkModeButton = (page: import("@playwright/test").Page) =>
  page.getByRole("banner").getByRole("button", { name: "Dark mode" });

const background = (page: import("@playwright/test").Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("theme button", () => {
  test.describe("on a device set to light", () => {
    test.use({ colorScheme: "light" });

    test("starts light, switches to dark, and remembers it", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(darkModeButton(page)).toHaveAttribute(
        "aria-pressed",
        "false",
      );
      const light = await background(page);

      await darkModeButton(page).click();
      await expect(darkModeButton(page)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      expect(await background(page)).not.toBe(light);

      // Applied before the page is drawn, on reload and on other pages.
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await page.goto("/find-a-park");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expect(darkModeButton(page)).toHaveAttribute(
        "aria-pressed",
        "true",
      );

      await darkModeButton(page).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      expect(await background(page)).toBe(light);
    });
  });

  test.describe("on a device set to dark", () => {
    test.use({ colorScheme: "dark" });

    test("starts dark without a stored choice", async ({ page }) => {
      await page.goto("/");
      await expect(darkModeButton(page)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(page.locator("html")).not.toHaveAttribute("data-theme", /./);
    });
  });
});

test.describe("section links in the header", () => {
  for (const name of ["Experience", "Projects"]) {
    test(`“${name}” scrolls to its section on the home page`, async ({
      page,
    }) => {
      await page.goto("/");
      await page
        .getByRole("navigation", { name: "Sections" })
        .getByRole("link", { name })
        .click();
      await expect(page).toHaveURL(new RegExp(`/#${name.toLowerCase()}$`));
      await expect(
        page.getByRole("heading", { level: 2, name }),
      ).toBeInViewport();
    });
  }

  test("work from other pages too", async ({ page }) => {
    await page.goto("/find-a-park");
    await page
      .getByRole("navigation", { name: "Sections" })
      .getByRole("link", { name: "Experience" })
      .click();
    await expect(page).toHaveURL(/\/#experience$/);
    await expect(
      page.getByRole("heading", { level: 2, name: "Experience" }),
    ).toBeInViewport();
  });
});
