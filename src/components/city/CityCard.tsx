import { Link } from "react-router-dom";
import { slugify } from "../../utils/slug";
import DigitalClock from "../clock/DigitalClock";
import AnalogClock from "../clock/AnalogClock";

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
  const countrySlug = slugify(data.country);
  const citySlug = slugify(data.city);
  const imgSrc = data.img ? import.meta.env.BASE_URL + data.img : undefined;

  return (
    <article className="city-card-wrapper">
      <Link to={`/${countrySlug}/${citySlug}`}>
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
