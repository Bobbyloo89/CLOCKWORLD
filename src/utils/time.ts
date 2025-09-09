// Helpers for displaying local time and date for a given IANA-timezone
// Locale is "en-GB" for 24hr-format and english abbreviations (and a nice way to display dates)
// Passing in "now" lets us reuse a shared tick without reading system time in each component

// Gives current time in the given timezone in 24hr-format ("00:00")
export function formatTime(now: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(now);
}

// Gives current date in the given timezone in "Wed, 4 Sep"-format
export function formatDate(now: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone,
  }).format(now);
}
