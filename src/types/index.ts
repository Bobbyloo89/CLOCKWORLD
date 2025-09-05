export interface SeedCity {
  city: string;
  country: string;
  tz: string;
  img?: string;
  featured?: boolean;
}

export interface CityEntry {
  city: string;
  country: string;
  tz: string;
  favorite: boolean;
}

export interface Country {
  name: string;
}

export interface IanaTz {
  tz: string;
  countries: string[];
}
