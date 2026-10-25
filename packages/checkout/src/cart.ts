import { z } from "zod";

export const cartItemSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  /** Integer cents, so totals never pick up floating-point drift. */
  unitPriceCents: z.number().int().nonnegative(),
  quantity: z.number().int().positive(),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  /** ISO 8601. Lets either app tell which copy of a cart is newer. */
  updatedAt: z.iso.datetime(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;

export function emptyCart(now = new Date()): Cart {
  return { items: [], updatedAt: now.toISOString() };
}

export function subtotalCents(cart: Cart): number {
  return cart.items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );
}

/** Parses untrusted input (a request body, storage, a deep link payload). */
export function parseCart(input: unknown): Cart {
  return cartSchema.parse(input);
}
