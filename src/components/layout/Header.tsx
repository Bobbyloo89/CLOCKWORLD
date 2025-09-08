import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBars } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = { pathname: string };

function titleFromPath(pathname: string) {
  if (pathname === "/") return "CLOCKWORLD";
  if (pathname.startsWith("/add")) return "ADD CITY";
  if (pathname.startsWith("/favorites")) return "FAVORITES";
  return "CITY DETAILS";
}

export default function Header({ pathname }: HeaderProps) {
  const title = titleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close using Escape-button
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside of menu
  useEffect(() => {
    function onDown(e: MouseEvent) {
      const target = e.target as Node;
      if (!open) return;
      if (menuRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <header>
      <nav>
        <Link to="/" aria-label="Home" title="Home">
          <FontAwesomeIcon icon={faHouse} />
        </Link>

        <div>{title}</div>

        <div>
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="header-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {open ? (
            <div id="header-menu" role="menu" ref={menuRef}>
              <Link role="menuitem" to="/" onClick={() => setOpen(false)}>
                Start
              </Link>
              <Link role="menuitem" to="/add" onClick={() => setOpen(false)}>
                Add City
              </Link>
              <Link
                role="menuitem"
                to="/favorites"
                onClick={() => setOpen(false)}
              >
                Favorites
              </Link>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
