import { useEffect, useState } from "react";
import type { CityEntry } from "../types";
import { loadUserCities } from "../utils/storage";
import CityCard from "../components/city/CityCard";
import { useNavigate } from "react-router-dom";


export default function Favorites() {
  const [list, setList] = useState<CityEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setList(loadUserCities());
  }, []);

  const favorites = list.filter((c) => c.favorite);

  if (favorites.length === 0) {
    return (
      <main>
        <h2>Favorites</h2>
        <p>No favorites yet.</p>
        <button type="button" onClick={() => navigate("/add")}>Add City</button>
      </main>
    );
  }

  return (
    <main>
      <h2>Favorites</h2>
      {favorites.map((c) => (
        <CityCard key={`${c.country}__${c.city}`} data={c} />
      ))}
      <button type="button" onClick={() => navigate("/add")}>Add City</button>
    </main>
  );
}