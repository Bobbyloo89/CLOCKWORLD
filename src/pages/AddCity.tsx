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

export default function AddCity() {
  const navigate = useNavigate();

  const allCountries = (countriesData as Country[]).map((c) => c.name);
  const iana = tzData as IanaTz[];
  const seeds = seedCities as SeedCity[];

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [tz, setTz] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function isValidCountryName(name: string): boolean {
    const target = slugify(name.trim());
    return allCountries.some((c) => slugify(c) === target);
  }

  // Timezones for chose country (if country exists)
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

  // Reset tz when country changes
  useEffect(() => {
    setTz("");
  }, [country]);

  function existsInSeeds(cn: string, ct: string): boolean {
    const c1 = slugify(cn);
    const c2 = slugify(ct);
    return (seeds as SeedCity[]).some(
      (s) => slugify(s.country) === c1 && slugify(s.city) === c2
    );
  }

  function existsInUser(cn: string, ct: string): boolean {
    const list = loadUserCities();
    const c1 = slugify(cn);
    const c2 = slugify(ct);
    return list.some(
      (s) => slugify(s.country) === c1 && slugify(s.city) === c2
    );
  }

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

    const to = `/${slugify(countryTrim)}/${slugify(cityTrim)}`;
    navigate(to);
  }

  return (
    <main>
      <h2>Add City</h2>

      <form onSubmit={onSubmit}>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City name"
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
          <input
            type="checkbox"
            checked={favorite}
            onChange={(e) => setFavorite(e.target.checked)}
          />
          Add to favorites
        </label>

        <button type="submit">Save</button>
      </form>

      {message ? <p>{message}</p> : null}
    </main>
  );
}
