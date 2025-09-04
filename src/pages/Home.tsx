import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <h2>Start</h2>
      <p>Placeholder för klockor och grejer</p>
      <p>Testa länkar: 
        <Link to="/add">➕ Add City</Link>
      </p>
      <p>
        Test dynamisk länk:{" "}
        <Link to="/japan/tokyo">/japan/tokyo</Link>
      </p>
    </main>
  );
}