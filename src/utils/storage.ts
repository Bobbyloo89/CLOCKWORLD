import type { CityEntry } from "../types";
import { slugify } from "./slug";

const STORAGE_KEY = "clockworld:cities";

// Loads user-added cities from localStorage (only favorites right now)
// Accepts items matching CityEntry via type guard
// Returns empty array on error/unexpected
export function loadUserCities(): CityEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCityEntry);
  } catch {
    // Corrupt JSON or access error -> empty array
    return [];
  }
}

// Saves user-added cities to localStorage as JSON
export function saveUserCities(list: CityEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Narrowing type guard for CityEntry-objects
function isCityEntry(x: any): x is CityEntry {
  return (
    x &&
    typeof x.city === "string" &&
    typeof x.country === "string" &&
    typeof x.tz === "string" &&
    typeof x.favorite === "boolean"
  );
}

// Find user-added city via /country/city-slug
export function findUserCityBySlugs(
  list: CityEntry[],
  countrySlug: string,
  citySlug: string
): CityEntry | undefined {
  return list.find(
    (c) => slugify(c.country) === countrySlug && slugify(c.city) === citySlug
  );
}

// Toggle favorite, creates post if city does not already exist in local storage (used for pre-added cities
// in data/cities.json) and returns updated list
export function toggleFavorite(
  country: string,
  city: string,
  tz: string
): CityEntry[] {
  const list = loadUserCities();
  const idx = list.findIndex(
    (c) =>
      slugify(c.country) === slugify(country) &&
      slugify(c.city) === slugify(city)
  );

  if (idx >= 0) {
    // toggle existing post
    const updated = [...list];
    updated[idx] = { ...updated[idx], favorite: !updated[idx].favorite };
    saveUserCities(updated);
    return updated;
  } else {
    // create new post as favorite
    const created: CityEntry = { country, city, tz, favorite: true };
    const updated = [...list, created];
    saveUserCities(updated);
    return updated;
  }
}
