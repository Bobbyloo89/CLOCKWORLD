import { Link } from "react-router-dom";
import citiesData from "../data/cities.json";
import type { SeedCity } from "../types";
import { slugify } from "../utils/slug";

export default function Home() {
  const cities = citiesData as SeedCity[];
  const featured = cities.filter(c => c.featured === true);

  return (
    <main>
      <h2>Start</h2>
      <p>Utvalda städer/featured=true i data/cities.json:</p>
      <ul>
        {featured.map((c) => {
          const countrySlug = slugify(c.country);
          const citySlug = slugify(c.city);
          return (
            <li key={`${c.country}__${c.city}`}>
              <Link to={`/${countrySlug}/${citySlug}`}>
                {c.city}, {c.country}
              </Link>
            </li>
          );
        })}
      </ul>

      <p>
        <Link to="/add">➕ Add City</Link>
      </p>
    </main>
  );
}