import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import countriesData from "../data/countries.json";
import tzData from "../data/iana_timezones.json";
import seedCities from "../data/cities.json";
import type { Country, IanaTz, SeedCity, CityEntry } from "../types";
import { slugify } from "../utils/slug";
import { loadUserCities, saveUserCities } from "../utils/storage";
import CountrySelect from "../components/form/CountrySelect";
import TimezoneSelect from "../components/form/TimezoneSelect";

// Form for adding new city (saved in localStorage)
// City: free text (trimmed)
// Country: have to match item in data/countries.json (provided list)
// Timezone: required, and options are provided from data/iana-timezones.json and filtered by chosen country
// Favorite: Optional checkbox

// NOTE: In current version of the program, when a new city is added the user is taken to the CityDetail-page
// for the new city, but if the user leaves that page, there is no other way to show it again except for:
// if it was added as a favorite, it can be seen on the Favorites-page,
// otherwise the user needs to manually enter the correct URL for the CityDetail-page for that specific city.
// We do not render the full list of user-added cities anywhere else, by choice, for now.

// Validation:
// - Rejects empty fields: city, country or timezone (favorite is optional)
// - Rejects countries not in provided list to prevent typos/non-matches
// - Rejects duplicates if (country, city)-combination already exists in seeds or user-list
// - Timezone-select is empty until country has been entered

export default function AddCity() {
  const navigate = useNavigate();

  // Static data loaded once from JSON
  const allCountries = (countriesData as Country[]).map((c) => c.name);
  const iana = tzData as IanaTz[];
  const seeds = seedCities as SeedCity[];

  // Form state
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [tz, setTz] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Check that entered country matches item in provided list
  // Compare with slugified names to be case/diacritics/whitespace tolerant
  function isValidCountryName(name: string): boolean {
    const target = slugify(name.trim());
    return allCountries.some((c) => slugify(c) === target);
  }

  // Find timezones for chosen country (if country exists)
  // If no/invalid country, return empty list to force country selection first
  // Use Set to avoid duplicates, then sort alphabetically
  const timezonesForCountry = useMemo(() => {
    if (!country || !isValidCountryName(country)) return [];
    const cSlug = slugify(country);
    const set = new Set<string>();
    for (const item of iana) {
      if (item.countries.some((nm) => slugify(nm) === cSlug)) {
        set.add(item.tz);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [iana, country]);

  // Reset tz when country changes to avoid errors
  useEffect(() => {
    setTz("");
  }, [country]);

  // Check if (country, city)-combination already exists in seed-list
  function existsInSeeds(cn: string, ct: string): boolean {
    const c1 = slugify(cn);
    const c2 = slugify(ct);
    return (seeds as SeedCity[]).some(
      (s) => slugify(s.country) === c1 && slugify(s.city) === c2
    );
  }

  // Check if (country, city)-combination already exists in user-list
  function existsInUser(cn: string, ct: string): boolean {
    const list = loadUserCities();
    const c1 = slugify(cn);
    const c2 = slugify(ct);
    return list.some(
      (s) => slugify(s.country) === c1 && slugify(s.city) === c2
    );
  }

  // Basic required-field validation
  // Check: country is from provided list to prevent typos/non-matches
  // Check: (country, city)-combination does not already exist in seed- or user-list
  // Save to localStorage and navigate to the CityDetail-page
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const cityTrim = city.trim();
    const countryTrim = country.trim();

    if (!cityTrim) {
      setMessage("Please enter a city name!");
      return;
    }
    if (!countryTrim) {
      setMessage("Please select a country!");
      return;
    }
    if (!isValidCountryName(countryTrim)) {
      setMessage("Please select a country from the list!");
      return;
    }
    if (!tz) {
      setMessage("Please select a timezone!");
      return;
    }

    if (
      existsInSeeds(countryTrim, cityTrim) ||
      existsInUser(countryTrim, cityTrim)
    ) {
      setMessage("That city in that country already exists!");
      return;
    }

    const newEntry: CityEntry = {
      city: cityTrim,
      country: countryTrim,
      tz,
      favorite,
    };

    const current = loadUserCities();
    const updated = [...current, newEntry];
    saveUserCities(updated);

    // Go to CityDetail-page for the new added city
    const to = `/${slugify(countryTrim)}/${slugify(cityTrim)}`;
    navigate(to);
  }

  return (
    <main>
      <div className="add-city-wrapper">
        <form className="add-city-form" onSubmit={onSubmit}>
          <label>
            {/* City */}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
            />
          </label>

          <CountrySelect
            countries={allCountries}
            value={country}
            onChange={setCountry}
          />

          <TimezoneSelect
            timezones={timezonesForCountry}
            value={tz}
            onChange={setTz}
          />

          <label>
            Add to favorites
            <input
              type="checkbox"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
          </label>

          <button className="add-city-button" type="submit">
            Add city
          </button>
        </form>

        {message ? <p className="form-message">{message}</p> : null}
      </div>
    </main>
  );
}
