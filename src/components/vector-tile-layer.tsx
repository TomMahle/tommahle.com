"use client";

import { namedFlavor } from "@protomaps/basemaps";
import L from "leaflet";
import { PMTiles } from "pmtiles";
import { labelRules, leafletLayer, paintRules } from "protomaps-leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import {
  CITY_MAX_DATA_ZOOM,
  CITY_MIN_DATA_ZOOM,
  CITY_PMTILES_URL,
  OVERVIEW_MAX_DATA_ZOOM,
  OVERVIEW_PMTILES_URL,
} from "./map-config";

// protomaps-leaflet extends the global Leaflet object instead of importing it.
const globals = globalThis as { L?: typeof L };
globals.L ??= L;

// One copy of each archive for every map on the page, so each directory is
// fetched once.
const overview = new PMTiles(OVERVIEW_PMTILES_URL);
const city = new PMTiles(CITY_PMTILES_URL);

const flavor = namedFlavor("light");
/**
 * Leaflet zooms are one higher than the data zoom they draw from
 * (protomaps-leaflet renders 512px data tiles at 256px), so the city layer
 * starts showing at CITY_MIN_DATA_ZOOM + 1.
 */
const CITY_FROM_ZOOM = CITY_MIN_DATA_ZOOM + 1;

/** Labels come from one layer at a time, so they're never drawn twice. */
const overviewLabels = labelRules(flavor, "en").map((rule) => ({
  ...rule,
  maxzoom: Math.min(rule.maxzoom ?? Infinity, CITY_FROM_ZOOM - 1),
}));
const cityLabels = labelRules(flavor, "en").map((rule) => ({
  ...rule,
  minzoom: Math.max(rule.minzoom ?? 0, CITY_FROM_ZOOM),
}));

/**
 * The map background, drawn in the browser from the self-hosted vector tile
 * archives (see map-config.ts): the low-zoom overview everywhere, with the
 * city's street detail on top from CITY_FROM_ZOOM. The city layer has no
 * background fill, so outside the city the overview shows through instead of
 * blank tiles.
 *
 * protomaps-leaflet only logs failed tile requests (it never fires Leaflet's
 * `tileerror`), so `onError` is called when an archive itself can't be
 * opened, which is how a missing file or a network failure shows up.
 */
export function VectorTileLayer({
  attribution,
  onError,
}: {
  attribution?: string;
  onError?: () => void;
}) {
  const map = useMap();
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  });

  useEffect(() => {
    const overviewLayer = leafletLayer({
      url: overview,
      paintRules: paintRules(flavor),
      labelRules: overviewLabels,
      backgroundColor: flavor.background,
      maxDataZoom: OVERVIEW_MAX_DATA_ZOOM,
      // An empty string keeps protomaps-leaflet's default credit out of maps
      // that show attribution elsewhere (the location preview's caption).
      attribution: attribution ?? "",
    });
    const cityLayer = leafletLayer({
      url: city,
      paintRules: paintRules(flavor),
      labelRules: cityLabels,
      maxDataZoom: CITY_MAX_DATA_ZOOM,
      minZoom: CITY_FROM_ZOOM,
      attribution: "",
    });
    overviewLayer.addTo(map);
    cityLayer.addTo(map);

    let active = true;
    Promise.all([overview.getHeader(), city.getHeader()]).catch(() => {
      if (active) onErrorRef.current?.();
    });
    return () => {
      active = false;
      overviewLayer.remove();
      cityLayer.remove();
    };
  }, [map, attribution]);

  return null;
}
