import { useEffect, useState } from "react";
import type { CityEntry } from "../types";
import { loadUserCities } from "../utils/storage";
import CityCard from "../components/city/CityCard";
import { useNavigate } from "react-router-dom";

// Lists all cities that are marked as favorite as CityCard:s
// Reads once from localStorage on mount via loadUserCities()
// NOTE: Does not live-sync if favorites change elsewhere while mounted (like in another tab)

export default function Favorites() {
  const [list, setList] = useState<CityEntry[]>([]);
  const navigate = useNavigate();

  // Load user-added cities when page mounts
  useEffect(() => {
    setList(loadUserCities());
  }, []);

  // Filter to show only cities marked as favorite
  const favorites = list.filter((c) => c.favorite);

  // If no favorites, show message and "Add City"-button
  if (favorites.length === 0) {
    return (
      <main>
        <div className="favorites-wrapper">
          <p>No favorites yet.</p>
          <button
            className="add-city-button"
            type="button"
            onClick={() => navigate("/add")}
          >
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
