// Simple transliteration borrowed from the internet to simplify usage of slugs without complicated letters and diacritics (konstiga tecken)
export function slugify(input: string): string {
  const specialMap: Record<string, string> = {
    ß: "ss",
    Ø: "o", ø: "o",
    Đ: "d", đ: "d",
    ð: "d",
    Þ: "th", þ: "th",
    Ł: "l", ł: "l",
    Æ: "ae", æ: "ae",
    Œ: "oe", œ: "oe",
  };

  const mapped = Array.from(input)
    .map(ch => specialMap[ch] ?? ch)
    .join("");

  return mapped
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // removes "combinating diacritics"
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")            // transforms whitespaces to -
    .replace(/[^a-z0-9-]/g, "")      // removes additional diacritics to keep slugs simple
    .replace(/--+/g, "-");           // turns multiple -- into a single -
}