import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CityEntry } from "../types";
import { loadUserCities } from "../utils/storage";
import { slugify } from "../utils/slug";

export default function Favorites() {
  const [list, setList] = useState<CityEntry[]>([]);

  useEffect(() => {
    setList(loadUserCities());
  }, []);

  const favorites = list.filter((c) => c.favorite);

  if (favorites.length === 0) {
    return (
      <main>
        <h2>Favorites</h2>
        <p>No favorites yet.</p>
        <p><Link to="/">Go to Start</Link></p>
      </main>
    );
  }

  return (
    <main>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((c) => {
          const countrySlug = slugify(c.country);
          const citySlug = slugify(c.city);
          return (
            <li key={`${c.country}__${c.city}`}>
              <Link to={`/${countrySlug}/${citySlug}`}>{c.city}, {c.country}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}