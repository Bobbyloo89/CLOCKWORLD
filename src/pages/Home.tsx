import { Link } from "react-router-dom";
import citiesData from "../data/cities.json";
import type { SeedCity } from "../types";
import CityCard from "../components/city/CityCard";

export default function Home() {
  const cities = citiesData as SeedCity[];
  const featured = cities.filter(c => c.featured === true);

  return (
    <main>
      <h2>Start</h2>
      {featured.map((c) => (
        <CityCard key={`${c.country}__${c.city}`} data={c} />
      ))}

      <p>
        <Link to="/add">Add City</Link>
      </p>
    </main>
  );
}