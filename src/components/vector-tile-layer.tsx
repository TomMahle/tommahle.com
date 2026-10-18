"use client";

import L from "leaflet";
import { PMTiles } from "pmtiles";
import { leafletLayer } from "protomaps-leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { PMTILES_URL, TILES_MAX_DATA_ZOOM } from "./map-config";

// protomaps-leaflet extends the global Leaflet object instead of importing it.
const globals = globalThis as { L?: typeof L };
globals.L ??= L;

// One archive for every map on the page, so its directory is fetched once.
const archive = new PMTiles(PMTILES_URL);

/**
 * The map background, drawn in the browser from the self-hosted vector tile
 * archive.
 *
 * protomaps-leaflet only logs failed tile requests (it never fires Leaflet's
 * `tileerror`), so `onError` is called when the archive itself can't be
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
    const layer = leafletLayer({
      url: archive,
      flavor: "light",
      lang: "en",
      maxDataZoom: TILES_MAX_DATA_ZOOM,
      // An empty string keeps protomaps-leaflet's default credit out of maps
      // that show attribution elsewhere (the location preview's caption).
      attribution: attribution ?? "",
    });
    layer.addTo(map);

    let active = true;
    archive.getHeader().catch(() => {
      if (active) onErrorRef.current?.();
    });
    return () => {
      active = false;
      layer.remove();
    };
  }, [map, attribution]);

  return null;
}
