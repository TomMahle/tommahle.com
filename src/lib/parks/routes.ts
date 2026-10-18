/** Where Find a Park lives inside the site. */
export const PARKS_HOME = "/find-a-park";

/** A park's details page. */
export function parkPath(id: string) {
  return `${PARKS_HOME}/parks/${id}`;
}
