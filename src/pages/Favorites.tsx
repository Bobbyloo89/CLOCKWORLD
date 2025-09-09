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
        <div className="favorites-wrapper">
          <p>No favorites yet.</p>
          <button type="button" onClick={() => navigate("/add")}>
            Add City
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="favorites-wrapper">
        {favorites.map((c) => (
          <CityCard key={`${c.country}__${c.city}`} data={c} />
        ))}
      </div>
      <div className="add-city-button-wrapper">
        <button
          className="add-city-button"
          type="button"
          onClick={() => navigate("/add")}
        >
          Add new city
        </button>
      </div>
    </main>
  );
}
