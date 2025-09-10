import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// On every route-change scroll back to top-of-page
// Unless URL includes a hash, then do nothing and let the browser handle jump
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an anchor, let browser scroll to it
    if (hash) return;

    // Otherwise, scroll to top-left on route-change
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
