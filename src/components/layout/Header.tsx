import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBars } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = { pathname: string };

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

function titleFromPath(pathname: string) {
  if (pathname === "/") return "CLOCKWORLD";
  if (pathname.startsWith("/add")) return "ADD CITY";
  if (pathname.startsWith("/favorites")) return "FAVORITES";
  return "CITY DETAILS";
}

export default function Header({ pathname }: HeaderProps) {
  const title = titleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isDesktop = useIsDesktop();

  // hjälpare att stänga + flytta fokus
  function closeMenu() {
    setOpen(false);
    if (!isDesktop) {
      requestAnimationFrame(() => buttonRef.current?.focus());
    }
  }

  // Close using Escape-button
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside of menu
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current?.contains(t)) return;
      if (buttonRef.current?.contains(t)) return;
      closeMenu();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <header>
      <nav>
        <div className="header-home-wrap">
          <Link to="/" aria-label="Home" title="Home">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </div>

        <div className="header-title">{title}</div>

        <div className="header-menu-wrap">
          <button
            className="header-menu-btn"
            ref={buttonRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="header-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <ul id="header-menu" ref={menuRef} hidden={!open && !isDesktop}>
            <li>
              <Link to="/" onClick={closeMenu}>
                Start
              </Link>
            </li>
            <li>
              <Link to="/add" onClick={closeMenu}>
                Add City
              </Link>
            </li>
            <li>
              <Link to="/favorites" onClick={closeMenu}>
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
