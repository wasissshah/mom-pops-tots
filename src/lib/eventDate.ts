// Small helpers to turn API dates ("2026-12-04", "15:00") into the strings the design uses.
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-12-04" -> "04"
export const formatDay = (isoDate: string) => isoDate.slice(8, 10);

// "2026-12-04" -> { weekday: "Fri", monthYear: "Dec 26" }
export function formatWeekdayMonth(isoDate: string) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return {
    weekday: WEEKDAYS[d.getUTCDay()],
    monthYear: `${MONTHS[d.getUTCMonth()]} ${isoDate.slice(2, 4)}`,
  };
}

// "15:00" -> "03:00 PM"
export function formatTime(time24: string) {
  const [h, m] = time24.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-12-04" -> "Dec"
export const formatMonthShort = (isoDate: string) => MONTHS_SHORT[Number(isoDate.slice(5, 7)) - 1];

// first and last date of an event -> "04 - 06" (or just "04" for a single day)
export function formatDayRange(dates: { date: string }[], fallbackDate: string) {
  const first = dates[0]?.date ?? fallbackDate;
  const last = dates[dates.length - 1]?.date ?? first;
  return first === last ? formatDay(first) : `${formatDay(first)} - ${formatDay(last)}`;
}

const WEEKDAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// "2026-10-18" -> "Sunday, 18 October 2026"
export function formatLongDate(isoDate: string) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return `${WEEKDAYS_LONG[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// ("2026-08-21", "14:00", "17:00") -> "Thu, Aug 21 - 2:00 PM to 5:00 PM"
export function formatSession(date: string, start: string, end: string) {
  const { weekday } = formatWeekdayMonth(date);
  const t = (v: string) => formatTime(v).replace(/^0/, "");
  const day = `${weekday}, ${formatMonthShort(date)} ${Number(date.slice(8, 10))}`;
  return end ? `${day} - ${t(start)} to ${t(end)}` : `${day} - ${t(start)}`;
}

const noZero = (v: string) => formatTime(v).replace(/^0/, "");

// ("14:00", "17:30") -> "2:00 PM – 5:30 PM"
export const formatTimeRange = (start: string, end: string) => (end ? `${noZero(start)} – ${noZero(end)}` : noZero(start));

// ("15:00", "21:30") -> "6h 30m"  (empty when there is no end time)
export function formatDuration(start: string, end: string) {
  if (!end) return "";
  const mins = (v: string) => Number(v.slice(0, 2)) * 60 + Number(v.slice(3, 5));
  const total = mins(end) - mins(start);
  if (total <= 0) return "";
  const h = Math.floor(total / 60);
  const m = total % 60;
  return [h ? `${h}h` : "", m ? `${m}m` : ""].filter(Boolean).join(" ");
}

// "2026-12-04" -> "Fri, Dec 4"
export function formatDayLabel(isoDate: string) {
  return `${formatWeekdayMonth(isoDate).weekday}, ${formatMonthShort(isoDate)} ${Number(isoDate.slice(8, 10))}`;
}
