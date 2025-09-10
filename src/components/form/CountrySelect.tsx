// <datalist>-input for quick filtering of countries
// Used in AddCity-form, and validation happens there
// Shows a dropdown-list with countries from data/countries.json
// autoComplete="off" because I prefer it

type Props = {
  countries: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CountrySelect({ countries, value, onChange }: Props) {
  return (
    <label>
      {/* Country-input: free text to make searchable + suggestions via datalist */}
      <input
        list="countries-list"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Choose country…"
        autoComplete="off"
      />
      {/* datalist shows suggestions for the input above, value of selected option is inserted */}
      <datalist id="countries-list">
        {countries.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </label>
  );
}
