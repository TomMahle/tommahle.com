import { describe, expect, it } from "vitest";
import { emptyCart, parseCart, subtotalCents, type Cart } from "./cart";

const cart: Cart = {
  items: [
    { sku: "tee", name: "T-shirt", unitPriceCents: 2500, quantity: 2 },
    { sku: "mug", name: "Mug", unitPriceCents: 1200, quantity: 1 },
  ],
  updatedAt: "2026-10-25T12:00:00.000Z",
};

describe("subtotalCents", () => {
  it("sums price times quantity", () => {
    expect(subtotalCents(cart)).toBe(6200);
  });

  it("is zero for an empty cart", () => {
    expect(subtotalCents(emptyCart())).toBe(0);
  });
});

describe("parseCart", () => {
  it("round-trips through JSON", () => {
    expect(parseCart(JSON.parse(JSON.stringify(cart)))).toEqual(cart);
  });

  it("rejects fractional cents and non-positive quantities", () => {
    const bad = (item: object) => ({
      ...cart,
      items: [{ ...cart.items[0], ...item }],
    });
    expect(() => parseCart(bad({ unitPriceCents: 1.5 }))).toThrow();
    expect(() => parseCart(bad({ quantity: 0 }))).toThrow();
  });
});
