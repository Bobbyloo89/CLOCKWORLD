import { useParams, Link } from "react-router-dom";

export default function CityDetail() {
  const { country, city } = useParams<{ country: string; city: string }>();

  return (
    <main>
      <h2>City Detail</h2>
      <p>Här kommer detaljerad info för specifik stad att visas.</p>
      <p>
        Country (slug): <strong>{country}</strong>
      </p>
      <p>
        City (slug): <strong>{city}</strong>
      </p>
      <p>
        <Link to="/">Länk till Start</Link>
      </p>
    </main>
  );
}