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

export default function CityDetail() {
  const { country: countrySlug, city: citySlug } = useParams<{
    country: string;
    city: string;
  }>();

  const seeds = seedCities as SeedCity[];
  const [userList, setUserList] = useState<CityEntry[]>(() => loadUserCities());

  // Find match in list of pre-added cities
  const seedMatch = useMemo(
    () =>
      seeds.find(
        (s) =>
          slugify(s.country) === countrySlug && slugify(s.city) === citySlug
      ),
    [seeds, countrySlug, citySlug]
  );

  // Find match in list of user-added cities
  const userMatch = useMemo(
    () => findUserCityBySlugs(userList, countrySlug ?? "", citySlug ?? ""),
    [userList, countrySlug, citySlug]
  );

  // Show error if no match is found
  if (!seedMatch && !userMatch) {
    return (
      <main>
        <h2>City Detail</h2>
        <p>Stad hittades inte.</p>
      </main>
    );
  }

  // Decide what data to show, prioritizing user-added cities where tz/favorite may have changed
  const country = userMatch?.country ?? seedMatch!.country;
  const city = userMatch?.city ?? seedMatch!.city;
  const tz = userMatch?.tz ?? seedMatch!.tz;
  const isFavorite = userMatch?.favorite === true;

  function onToggleFavorite() {
    const updated = toggleFavorite(country, city, tz);
    setUserList(updated);
  }

  return (
    <main>
      <h2>
        {city}, {country}
      </h2>
      <AnalogClock tz={tz} />
      <DigitalClock tz={tz} />
      <button onClick={onToggleFavorite}>
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </main>
  );
}
