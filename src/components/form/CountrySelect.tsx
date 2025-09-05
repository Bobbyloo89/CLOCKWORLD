type Props = {
  countries: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CountrySelect({ countries, value, onChange }: Props) {
  return (
    <label>
      Country
      <input
        list="countries-list"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing a country…"
        autoComplete="off"
      />
      <datalist id="countries-list">
        {countries.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </label>
  );
}
