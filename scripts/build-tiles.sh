#!/usr/bin/env bash
# Rebuilds public/tiles/nyc.pmtiles: vector map tiles for the five boroughs,
# cut from Protomaps' daily OpenStreetMap build (https://maps.protomaps.com/builds/).
# Needs the pmtiles CLI: `brew install pmtiles`, or a release from
# https://github.com/protomaps/go-pmtiles/releases.
#
# Usage: scripts/build-tiles.sh [YYYYMMDD]   (default: today's build, UTC)
set -euo pipefail

build="${1:-$(date -u +%Y%m%d)}"
# west,south,east,north. Keep in sync with TILES_BOUNDS in src/components/map-config.ts.
bbox="-74.26,40.49,-73.70,40.92"
# Keep in sync with TILES_MAX_DATA_ZOOM. Zoom 15 would triple the file size.
maxzoom=14

cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
pmtiles extract "https://build.protomaps.com/${build}.pmtiles" "$tmp/nyc.pmtiles" \
  --bbox="$bbox" --maxzoom="$maxzoom"
mv "$tmp/nyc.pmtiles" public/tiles/nyc.pmtiles
ls -lh public/tiles/nyc.pmtiles
