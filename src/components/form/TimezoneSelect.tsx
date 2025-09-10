// <select>-element for choosing IANA-timezone
// Used in AddCity-form
// Shows a dropdown-list with timezones matching the country entered in CountrySelect

type Props = {
  timezones: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function TimezoneSelect({ timezones, value, onChange }: Props) {
  return (
    <label>
      <select required value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a timezone…</option>
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </label>
  );
}
