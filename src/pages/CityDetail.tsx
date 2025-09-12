import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import seedCities from "../data/cities.json";
import type { SeedCity, CityEntry } from "../types";
import { slugify } from "../utils/slug";
import {
  loadUserCities,
  findUserCityBySlugs,
  toggleFavorite,
} from "../utils/storage";
import DigitalClock from "../components/clock/DigitalClock";
import AnalogClock from "../components/clock/AnalogClock";

// Showing details for a single city
// In the current version of the program it looks almost identical to a CityCard
// We do not use CityCard here, because we want the option to customize this view further in the future
// Data comes from seed-list (data/cities.json) or user-list (from localStorage)
// If a user-added entry exists, prefer it over a seeded entry, otherwise use seed entry

export default function CityDetail() {
  // Route params are slugified country/city, ex. "/sweden/stockholm"
  const { country: countrySlug, city: citySlug } = useParams<{
    country: string;
    city: string;
  }>();

  const seeds = seedCities as SeedCity[];

  // Load once on mount
  const [userList, setUserList] = useState<CityEntry[]>(() => loadUserCities());

  // Look for match in list of pre-added cities using slugified names
  const seedMatch = useMemo(
    () =>
      seeds.find(
        (s) =>
          slugify(s.country) === countrySlug && slugify(s.city) === citySlug
      ),
    [seeds, countrySlug, citySlug]
  );

  // Look for match in list of user-added cities in localStorage using slugified names
  const userMatch = useMemo(
    () => findUserCityBySlugs(userList, countrySlug ?? "", citySlug ?? ""),
    [userList, countrySlug, citySlug]
  );

  // Show error if no match is found in either list
  if (!seedMatch && !userMatch) {
    return (
      <main>
        <p>City not found.</p>
      </main>
    );
  }

  // Decide what data to show, prefer user-added cities where tz/favorite may have changed
  const country = userMatch?.country ?? seedMatch!.country;
  const city = userMatch?.city ?? seedMatch!.city;
  const tz = userMatch?.tz ?? seedMatch!.tz;
  const imgSrc = seedMatch?.img
    ? import.meta.env.BASE_URL + seedMatch.img
    : undefined;
  const isFavorite = userMatch?.favorite === true;

  // Toggle favorite in localStorage and update local state
  function onToggleFavorite() {
    const updated = toggleFavorite(country, city, tz);
    setUserList(updated);
  }

  return (
    <main>
      <div className="city-details-wrapper">
        <h2>{city}</h2>
        <h3>{country}</h3>
        <AnalogClock tz={tz} />
        <DigitalClock tz={tz} />
        <button className="add-city-button" onClick={onToggleFavorite}>
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </button>
        {imgSrc ? <img src={imgSrc} alt={`${city}, ${country}`} /> : null}
      </div>
    </main>
  );
}
