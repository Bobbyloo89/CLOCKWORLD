import type { CityEntry, SeedCity } from "../types";
import { slugify } from "./slug";

const STORAGE_KEY = "clockworld:cities";

export function loadUserCities(): CityEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCityEntry);
  } catch {
    return [];
  }
}

export function saveUserCities(list: CityEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function isCityEntry(x: any): x is CityEntry {
  return (
    x &&
    typeof x.city === "string" &&
    typeof x.country === "string" &&
    typeof x.tz === "string" &&
    typeof x.favorite === "boolean"
  );
}

// Find user-added city via country+city-slug
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
// in cities.JSON) and returns updated list
export function toggleFavorite(
  country: string,
  city: string,
  tz: string
): CityEntry[] {
  const list = loadUserCities();
  const idx = list.findIndex(
    (c) => slugify(c.country) === slugify(country) && slugify(c.city) === slugify(city)
  );

  if (idx >= 0) {
    // toggle existing
    const updated = [...list];
    updated[idx] = { ...updated[idx], favorite: !updated[idx].favorite };
    saveUserCities(updated);
    return updated;
  } else {
    // create new as favorite
    const created: CityEntry = { country, city, tz, favorite: true };
    const updated = [...list, created];
    saveUserCities(updated);
    return updated;
  }
}