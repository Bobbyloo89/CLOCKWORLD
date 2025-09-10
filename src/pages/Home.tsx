import { useNavigate } from "react-router-dom";
import citiesData from "../data/cities.json";
import type { SeedCity } from "../types";
import CityCard from "../components/city/CityCard";

// Shows featured seed-cities as cards and a button to add a new city
// Seed-cities come from data/cities.json
// Only items with "featured: true" are shown
// No user-added cities here, they are only shown in Favorites-page
// Clicking a card takes you to that city's CityDetail-page

export default function Home() {
  // Static list of preloaded cities, typed for clarity
  const cities = citiesData as SeedCity[];
  // Only display cities with "featured: true"
  const featured = cities.filter((c) => c.featured === true);
  // For navigating to the AddCity-page
  const navigate = useNavigate();

  return (
    <main>
      <div className="home-wrapper">
        {featured.map((c) => (
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
