// Simple transliteration borrowed from the internet to generate slugs for
// routes like /country/city without complicated letters
// Example: "Côte d'Ivoire" becomes "cote-divoire", "São Paulo" becomes "sao-paulo", etc.
// WARNING: Probably doesn't work for every language, made for english.

export function slugify(input: string): string {
  // Minimal transliteration map for characters
  const specialMap: Record<string, string> = {
    ß: "ss",
    Ø: "o",
    ø: "o",
    Đ: "d",
    đ: "d",
    ð: "d",
    Þ: "th",
    þ: "th",
    Ł: "l",
    ł: "l",
    Æ: "ae",
    æ: "ae",
    Œ: "oe",
    œ: "oe",
  };

  // Apply the special map per Unicode code point (Array.from handles surrogate pairs)
  const mapped = Array.from(input)
    .map((ch) => specialMap[ch] ?? ch)
    .join("");

  return mapped
    .normalize("NFD") // split letters + combining marks
    .replace(/[\u0300-\u036f]/g, "") // remove combining diacritics (accents)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // spaces/tabs/newlines -> single hyphen
    .replace(/[^a-z0-9-]/g, "") // keep only a–z, 0–9 and hyphen
    .replace(/--+/g, "-"); // collapse multiple hyphens
}
