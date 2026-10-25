/** Map tile settings. No Leaflet import: safe to use from server-rendered code. */

/**
 * The map background is drawn from two self-hosted vector tile archives in
 * `public/tiles/` (made by `scripts/build-tiles.sh` from Protomaps'
 * OpenStreetMap builds), so no third-party tile server is used:
 *
 * - `overview.pmtiles`: everywhere the map can be panned to, at low zoom
 *   (up to OVERVIEW_MAX_DATA_ZOOM), so zoomed-out views are never blank.
 * - `nyc.pmtiles`: the five boroughs, with street detail
 *   (CITY_MIN_DATA_ZOOM to CITY_MAX_DATA_ZOOM).
 *
 * NEXT_PUBLIC_MAP_TILES_URL can point at a folder with copies of both hosted
 * elsewhere; the host must support HTTP range requests. (NEXT_PUBLIC_ values
 * are read at build time.)
 */
const TILES_URL = process.env.NEXT_PUBLIC_MAP_TILES_URL || "/tiles";
export const OVERVIEW_PMTILES_URL = `${TILES_URL}/overview.pmtiles`;
export const CITY_PMTILES_URL = `${TILES_URL}/nyc.pmtiles`;

/** Keep these in sync with scripts/build-tiles.sh. */
export const OVERVIEW_MAX_DATA_ZOOM = 10;
export const CITY_MIN_DATA_ZOOM = 11;
export const CITY_MAX_DATA_ZOOM = 14;

/**
 * The area nyc.pmtiles covers, as [[south, west], [north, east]]. Keep in
 * sync with `city_bbox` in scripts/build-tiles.sh.
 */
export const TILES_BOUNDS: [[number, number], [number, number]] = [
  [40.49, -74.26],
  [40.92, -73.7],
];

/**
 * How far the map can be panned: a degree past the city, so it never wanders
 * off but can still center parks near its edge (Leaflet keeps the whole view
 * inside these bounds, even when it pans the map itself). overview.pmtiles
 * covers all of it: keep `overview_bbox` in scripts/build-tiles.sh in sync.
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
