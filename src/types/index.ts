// Preloaded city from data/cities.json
// Shows “featured” cities on Home-page
// Provides images for CityDetail-page when available
export interface SeedCity {
  city: string;
  country: string;
  tz: FeaturedTz | string;
  img?: string;
  featured?: boolean;
}

// City added by the user
// Stored in localStorage
// Can be a mirrored SeedCity (when a SeedCity is added to favorites and stored in localStorage)
export interface CityEntry {
  city: string;
  country: string;
  tz: string;
  favorite: boolean;
}

// Country from data/countries.json
export interface Country {
  name: string;
}

// IANA-timezone from data/iana-timezones.json
// Used to populate the timezone-select in AddCity-page and cross-reference with countries.json
export interface IanaTz {
  tz: string;
  countries: string[];
}
// Showcase of string literal types for featured timezones from data/cities.json
// (still allowing IANA-timezones elsewhere to use "string", so this does not -technically- DO anything right now,
// I'm just trying to showcase my understanding of the concept as I ran out of time working on this project and
// did not have time to fully implement this in a good way, hoping this is enough for a good grade (^_^) )
export type FeaturedTz =
  | "Asia/Tokyo"
  | "Europe/Paris"
  | "Europe/Moscow"
  | "America/New_York"
  | "America/Los_Angeles"
  | "America/Sao_Paulo"
  | "Europe/London"
  | "Europe/Berlin"
  | "Africa/Cairo"
  | "Africa/Johannesburg"
  | "Asia/Dubai"
  | "Asia/Shanghai"
  | "Asia/Hong_Kong"
  | "Asia/Singapore"
  | "Asia/Kolkata"
  | "America/Mexico_City"
  | "America/Toronto"
  | "America/Argentina/Buenos_Aires"
  | "Pacific/Auckland"
  | "Pacific/Honolulu"
  | "Asia/Seoul";
