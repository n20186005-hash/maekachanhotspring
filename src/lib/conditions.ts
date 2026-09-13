/**
 * Pure weather-code helpers.
 *
 * Deliberately free of any Node/Cloudflare dependency so the exact same
 * classification runs at build time, inside the edge endpoint, and in the
 * browser bundle without the three drifting apart.
 */

/** WMO weather code → internal condition key. */
export const CODE_KEYS: Record<number, string> = {
  0: 'clear',
  1: 'mainlyClear',
  2: 'partlyCloudy',
  3: 'overcast',
  45: 'fog',
  48: 'fog',
  51: 'drizzle',
  53: 'drizzle',
  55: 'drizzle',
  56: 'drizzle',
  57: 'drizzle',
  61: 'rain',
  63: 'rain',
  65: 'rain',
  66: 'rain',
  67: 'rain',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'showers',
  81: 'showers',
  82: 'showers',
  85: 'snow',
  86: 'snow',
  95: 'thunderstorm',
  96: 'thunderstorm',
  99: 'thunderstorm',
};

/** [day icon, night icon] per condition key. */
export const CONDITION_ICONS: Record<string, [string, string]> = {
  clear: ['☀️', '🌙'],
  mainlyClear: ['🌤️', '🌙'],
  partlyCloudy: ['⛅', '☁️'],
  overcast: ['☁️', '☁️'],
  fog: ['🌫️', '🌫️'],
  drizzle: ['🌦️', '🌦️'],
  rain: ['🌧️', '🌧️'],
  showers: ['🌧️', '🌧️'],
  snow: ['🌨️', '🌨️'],
  thunderstorm: ['⛈️', '⛈️'],
};

export const conditionKey = (code: number): string => CODE_KEYS[code] ?? 'partlyCloudy';

export const conditionIcon = (key: string, isDay = true): string =>
  (CONDITION_ICONS[key] ?? CONDITION_ICONS.partlyCloudy)[isDay ? 0 : 1];

const BEAUFORT_MAX = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117];

/** Beaufort force (0–12) for a wind speed in km/h. */
export function beaufort(kmh: number): number {
  const value = Number.isFinite(kmh) ? kmh : 0;
  for (let i = 0; i < BEAUFORT_MAX.length; i++) {
    if (value <= BEAUFORT_MAX[i]) return i;
  }
  return 12;
}

/**
 * Which forecast day the advice should be written for.
 *
 * Late in the evening there is nothing left of today to plan around, so the
 * advice rolls forward to tomorrow instead of telling a visitor at 23:00 to
 * expect the drizzle that already finished.
 */
export function focusDayIndex(updatedIso: string, dayCount: number): number {
  const match = /T(\d{2}):/.exec(updatedIso ?? '');
  const hour = match ? Number(match[1]) : 12;
  return hour >= 20 && dayCount > 1 ? 1 : 0;
}

/* ---------------- classification ---------------- */

export const isThunder = (code: number) => code === 95 || code === 96 || code === 99;
export const isHeavyRain = (code: number) => code === 65 || code === 82;
export const isModerateRain = (code: number) => code === 63 || code === 66 || code === 67 || code === 81;
export const isLightRain = (code: number) =>
  code === 51 || code === 53 || code === 55 || code === 56 || code === 57 || code === 61 || code === 80;
export const isDrizzle = (code: number) => code === 51 || code === 53 || code === 55 || code === 56 || code === 57;
export const isAnyRain = (code: number) =>
  isThunder(code) || isHeavyRain(code) || isModerateRain(code) || isLightRain(code);
export const isFog = (code: number) => code === 45 || code === 48;
export const isClear = (code: number) => code === 0 || code === 1;
export const isCloudy = (code: number) => code === 2 || code === 3;

/**
 * Wind thresholds in km/h, read straight off the payload.
 * Beaufort 6 ≈ 39 km/h, Beaufort 7 ≈ 50 km/h.
 */
export const WIND_GALE_KMH = 50;
export const WIND_GALE_GUST_KMH = 62;
export const WIND_WINDY_KMH = 39;
export const WIND_WINDY_GUST_KMH = 45;
