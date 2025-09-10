import { Link } from "react-router-dom";
import { slugify } from "../../utils/slug";
import DigitalClock from "../clock/DigitalClock";
import AnalogClock from "../clock/AnalogClock";

// Reusable card that shows a city's image (if it has one, not required),
// name, country, analog and digital clock, and local date. Whole card is
// a link to the CityDetail-page for that city.
// Route params are slugified for stable URL:s

type CityLike = {
  city: string;
  country: string;
  tz: string;
  img?: string;
};

type Props = {
  data: CityLike;
};

export default function CityCard({ data }: Props) {
  // Slugified, URL-safe routes
  const countrySlug = slugify(data.country);
  const citySlug = slugify(data.city);
  const imgSrc = data.img ? import.meta.env.BASE_URL + data.img : undefined;

  return (
    <article className="city-card-wrapper">
      {/* Make whole card clickable link to CityDetail-page for city */}
      <Link to={`/${countrySlug}/${citySlug}`}>
        {/* Image optional, skip <img> if not provided */}
        {imgSrc ? (
          <img src={imgSrc} alt={`${data.city}, ${data.country}`} />
        ) : null}
        <h3>{data.city}</h3>
        <h4>{data.country}</h4>
        <AnalogClock tz={data.tz} />
        <DigitalClock tz={data.tz} />
      </Link>
    </article>
  );
}
