import { Link } from "react-router-dom";

type HeaderProps = { pathname: string };

function titleFromPath(pathname: string) {
  if (pathname === "/") return "CLOCKWORLD";
  if (pathname.startsWith("/add")) return "ADD CITY";
  if (pathname.startsWith("/favorites")) return "FAVORITES";
  // Dynamisk detaljvy
  return "CITY DETAILS";
}

export default function Header({ pathname }: HeaderProps) {
  const title = titleFromPath(pathname);

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <div>{title}</div>
        <div>
          <Link to="/add">Add City</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </nav>
    </header>
  );
}