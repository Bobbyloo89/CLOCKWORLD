// Preloaded city from data/cities.json
// Shows “featured” cities on Home-page
// Provides images for CityDetail-page when available
export interface SeedCity {
  city: string;
  country: string;
  tz: string;
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
