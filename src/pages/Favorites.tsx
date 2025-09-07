import { useEffect, useState } from "react";
import type { CityEntry } from "../types";
import { loadUserCities } from "../utils/storage";
import CityCard from "../components/city/CityCard";

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
      </main>
    );
  }

  return (
    <main>
      <h2>Favorites</h2>
      {favorites.map((c) => (
        <CityCard key={`${c.country}__${c.city}`} data={c} />
      ))}
    </main>
  );
}