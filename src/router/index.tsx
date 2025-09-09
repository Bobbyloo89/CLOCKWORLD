import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import AddCity from "../pages/AddCity";
import Favorites from "../pages/Favorites";
import CityDetail from "../pages/CityDetail";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/routing/ScrollToTop";

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header pathname={location.pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCity />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/:country/:city" element={<CityDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;
