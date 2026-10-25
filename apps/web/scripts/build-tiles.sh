#!/usr/bin/env bash
# Rebuilds the map tiles in public/tiles/, cut from Protomaps' daily
# OpenStreetMap build (https://maps.protomaps.com/builds/):
#
#   overview.pmtiles  everywhere the map can be panned to, low zoom only
#   nyc.pmtiles       the five boroughs, with street detail
#
# Needs the pmtiles CLI: `brew install pmtiles`, or a release from
# https://github.com/protomaps/go-pmtiles/releases.
#
# Usage: scripts/build-tiles.sh [YYYYMMDD]   (default: today's build, UTC)
set -euo pipefail

build="${1:-$(date -u +%Y%m%d)}"
source="https://build.protomaps.com/${build}.pmtiles"
# west,south,east,north. Keep in sync with src/components/map-config.ts:
# city_bbox is TILES_BOUNDS; overview_bbox must cover MAX_BOUNDS.
city_bbox="-74.26,40.49,-73.70,40.92"
overview_bbox="-75.26,39.49,-72.70,41.92"
# Keep in sync with OVERVIEW_MAX_DATA_ZOOM, CITY_MIN_DATA_ZOOM and
# CITY_MAX_DATA_ZOOM. Each zoom level roughly doubles a file's size; GitHub
# warns about files over 50 MB.
overview_maxzoom=10
city_minzoom=11
city_maxzoom=14

cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
pmtiles extract "$source" "$tmp/overview.pmtiles" \
  --bbox="$overview_bbox" --maxzoom="$overview_maxzoom"
pmtiles extract "$source" "$tmp/nyc.pmtiles" \
  --bbox="$city_bbox" --minzoom="$city_minzoom" --maxzoom="$city_maxzoom"
mv "$tmp/overview.pmtiles" "$tmp/nyc.pmtiles" public/tiles/
ls -lh public/tiles/
