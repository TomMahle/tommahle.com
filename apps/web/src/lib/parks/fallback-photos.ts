import type { Park } from "./types";

export type FallbackPhoto = {
  /** A copy in public/photos (960px wide, as Wikimedia Commons scales it). */
  src: string;
  /** Describes what's in this specific photo. */
  alt: string;
  credit: {
    author: string;
    license: string;
    licenseUrl: string;
    /** The photo's page on Wikimedia Commons. */
    sourceUrl: string;
  };
};

/**
 * Openly licensed photos of real parks, shown only when a park's own listed
 * photos are missing or all fail to load. The park data itself is never
 * changed; this is a local backup, like a CDN fallback.
 *
 * Only add parks you've verified are the real place in the photos: the
 * listing's name must match `parkName` exactly, so a reused id can't show
 * the wrong park. Most parks in the sample data are fictional (no matching
 * real park), so they intentionally have no entry.
 *
 * Photos are copied from Wikimedia Commons into public/photos rather than
 * linked, so visitors' browsers don't load them from Wikimedia's servers.
 * Each one's license requires the credit shown under it.
 */
const FALLBACK_PHOTOS = new Map<
  string,
  { parkName: string; photos: readonly FallbackPhoto[] }
>([
  [
    "prospect-park",
    {
      parkName: "Prospect Park",
      photos: [
        {
          src: "/photos/prospect-park-boathouse.jpg",
          alt: "The Prospect Park Boathouse, a white two-story building with arched windows, reflected in the lake on a sunny spring day",
          credit: {
            author: "Antigng",
            license: "CC BY-SA 4.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
            sourceUrl:
              "https://commons.wikimedia.org/wiki/File:Prospect_park_boathouse,_May_2019.jpg",
          },
        },
        {
          src: "/photos/prospect-park-lake-autumn.jpg",
          alt: "Autumn trees in orange and green reflected in Prospect Park Lake under a cloudy sky",
          credit: {
            author: "Thomas Gosnell",
            license: "CC BY-SA 4.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
            sourceUrl:
              "https://commons.wikimedia.org/wiki/File:Fall_reflections_in_Prospect_Park_Lake.jpg",
          },
        },
      ],
    },
  ],
]);

/** Backup photos for a park, or none if it has no verified entry. */
export function fallbackPhotosFor(
  park: Pick<Park, "id" | "name">,
): readonly FallbackPhoto[] {
  const entry = FALLBACK_PHOTOS.get(park.id);
  return entry && entry.parkName === park.name ? entry.photos : [];
}
