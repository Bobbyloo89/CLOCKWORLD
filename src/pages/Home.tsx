import { useNavigate } from "react-router-dom";
import citiesData from "../data/cities.json";
import type { SeedCity } from "../types";
import CityCard from "../components/city/CityCard";

export default function Home() {
  const cities = citiesData as SeedCity[];
  const featured = cities.filter(c => c.featured === true);
  const navigate = useNavigate();

  return (
    <main>
      {featured.map((c) => (
        <CityCard key={`${c.country}__${c.city}`} data={c} />
      ))}

      <button type="button" onClick={() => navigate("/add")}>Add City</button>
    </main>
  );
}