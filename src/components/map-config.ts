/** Map tile settings. No Leaflet import: safe to use from server-rendered code. */

/**
 * The map background is a self-hosted vector tile archive of the five
 * boroughs (`public/tiles/nyc.pmtiles`, made by `scripts/build-tiles.sh` from
 * Protomaps' OpenStreetMap builds), so no third-party tile server is used.
 * NEXT_PUBLIC_MAP_PMTILES_URL can point at a copy hosted elsewhere; the host
 * must support HTTP range requests. (NEXT_PUBLIC_ values are read at build
 * time.)
 */
export const PMTILES_URL =
  process.env.NEXT_PUBLIC_MAP_PMTILES_URL || "/tiles/nyc.pmtiles";

/** The archive's highest zoom; closer zooms are drawn from it. */
export const TILES_MAX_DATA_ZOOM = 14;

/**
 * The area the archive covers, as [[south, west], [north, east]]. Keep in
 * sync with `bbox` in scripts/build-tiles.sh.
 */
export const TILES_BOUNDS: [[number, number], [number, number]] = [
  [40.49, -74.26],
  [40.92, -73.7],
];

/**
 * How far the map can be panned: a degree past the archive, so it never
 * wanders off but can still center parks near its edge (Leaflet keeps the
 * whole view inside these bounds, even when it pans the map itself).
 */
const PAN_MARGIN = 1;
export const MAX_BOUNDS: [[number, number], [number, number]] = [
  [TILES_BOUNDS[0][0] - PAN_MARGIN, TILES_BOUNDS[0][1] - PAN_MARGIN],
  [TILES_BOUNDS[1][0] + PAN_MARGIN, TILES_BOUNDS[1][1] + PAN_MARGIN],
];

/** Zoomed out any further, the city would be a speck in an empty map. */
export const MIN_ZOOM = 10;

export const TILE_ATTRIBUTION =
  '<a href="https://protomaps.com">Protomaps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
