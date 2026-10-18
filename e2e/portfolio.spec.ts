import { expect, test } from "./fixtures";

test("the home page lists projects, and Find a Park opens from it", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Tom Mahle");
  await expect(
    page.getByRole("heading", { level: 1, name: "Tom Mahle" }),
  ).toBeVisible();
  const card = page.getByRole("article", { name: "Find a Park" });
  await expect(card).toBeVisible();
  await expect(
    card.getByRole("link", { name: "Source code (Find a Park)" }),
  ).toHaveAttribute("href", "https://github.com/TomMahle/find-a-park");

  await card.getByRole("link", { name: "Try it (Find a Park)" }).click();
  await expect(page).toHaveURL(/\/find-a-park$/);
  await expect(page).toHaveTitle("Find a Park · New York City · Tom Mahle");
  await expect(
    page.getByRole("heading", { name: "Find a park" }),
  ).toBeVisible();
});

test("the site header leads home from Find a Park", async ({ page }) => {
  await page.goto("/find-a-park/parks/prospect-park");
  await expect(page).toHaveTitle("Prospect Park · Find a Park");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Tom Mahle" })
    .click();
  await expect(page).toHaveURL(/\/$/);
});

test("an unknown page returns a real 404 that links home", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Go to the home page" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Tom Mahle" }),
  ).toBeVisible();
});
