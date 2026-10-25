/**
 * Checkout state shared by the web and mobile apps. Both validate against
 * the same schema, so a cart saved on one platform is guaranteed to load on
 * the other.
 *
 * Shipped as TypeScript source (no build step): Next compiles it via
 * `transpilePackages`, and Metro compiles workspace packages by default.
 */
export * from "./cart";
