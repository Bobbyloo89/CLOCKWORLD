type Props = {
  timezones: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function TimezoneSelect({ timezones, value, onChange }: Props) {
  return (
    <label>
      {/* Timezone */}
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
