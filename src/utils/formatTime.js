export function formatReadableDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    weekday: "short",   // e.g. Sun
    year: "numeric",    // 2025
    month: "short",     // Aug
    day: "numeric",     // 24
    hour: "numeric",    // 9
    minute: "2-digit",  // 57
    second: "2-digit",  // 36
    hour12: true        // AM/PM
  });
}
