/**
 * Server-side weather data layer.
 *
 * Fetches a normalised current-conditions + 7-day forecast payload for the
 * spring's coordinates. Runs either at build time (to render the first paint)
 * or inside the edge function that serves /api/weather.
 *
 * The upstream request is memoised per isolate and additionally cached at the
 * edge for 15 minutes, so a busy day never turns into a burst of upstream calls.
 */
import { attraction } from '../config';

export interface WeatherCurrent {
  temp: number;
  apparent: number;
  humidity: number;
  wind: number;
  gust: number;
  precip: number;
  precipProb: number;
  uv: number;
  code: number;
  isDay: boolean;
}

export interface WeatherDay {
  date: string;
  code: number;
  max: number;
  min: number;
  precipProb: number;
  precipSum: number;
  windMax: number;
  gustMax: number;
  uv: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  /** ISO timestamp of the observation, in the site's local timezone. */
  updated: string;
  current: WeatherCurrent;
  daily: WeatherDay[];
}

const ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const CACHE_TTL_SECONDS = 900;
const REQUEST_TIMEOUT_MS = 6000;

let memo: { at: number; data: WeatherData } | null = null;

const num = (value: unknown, fallback = 0): number => {
  const n = typeof value === 'string' ? Number.parseFloat(value) : (value as number);
  return Number.isFinite(n) ? n : fallback;
};

const str = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);

function buildUrl(): string {
  const params = new URLSearchParams({
    latitude: String(attraction.latitude),
    longitude: String(attraction.longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m',
    hourly: 'precipitation_probability,uv_index',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max,sunrise,sunset',
    timezone: 'Asia/Bangkok',
    forecast_days: '7',
    wind_speed_unit: 'kmh',
  });
  return `${ENDPOINT}?${params.toString()}`;
}

/**
 * Index of the hourly slot that matches "now" in the payload's own timezone.
 * Falls back to the first slot when the timestamps cannot be matched.
 */
function currentHourIndex(times: string[]): number {
  if (!Array.isArray(times) || times.length === 0) return 0;
  const now = Date.now();
  let best = 0;
  let bestDelta = Number.POSITIVE_INFINITY;
  for (let i = 0; i < times.length; i++) {
    const t = Date.parse(`${times[i]}:00+07:00`);
    if (!Number.isFinite(t)) continue;
    const delta = Math.abs(t - now);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = i;
    }
  }
  return best;
}

export function normalise(payload: any): WeatherData {
  const cur = payload?.current ?? {};
  const hourly = payload?.hourly ?? {};
  const daily = payload?.daily ?? {};

  const hourIndex = currentHourIndex(hourly.time ?? []);

  const days: WeatherDay[] = (daily.time ?? []).map((date: string, i: number) => ({
    date: str(date),
    code: num(daily.weather_code?.[i]),
    max: num(daily.temperature_2m_max?.[i]),
    min: num(daily.temperature_2m_min?.[i]),
    precipProb: num(daily.precipitation_probability_max?.[i]),
    precipSum: num(daily.precipitation_sum?.[i]),
    windMax: num(daily.wind_speed_10m_max?.[i]),
    gustMax: num(daily.wind_gusts_10m_max?.[i]),
    uv: num(daily.uv_index_max?.[i]),
    sunrise: str(daily.sunrise?.[i]),
    sunset: str(daily.sunset?.[i]),
  }));

  return {
    updated: cur.time ? `${cur.time}:00+07:00` : new Date().toISOString(),
    current: {
      temp: num(cur.temperature_2m),
      apparent: num(cur.apparent_temperature),
      humidity: num(cur.relative_humidity_2m),
      wind: num(cur.wind_speed_10m),
      gust: num(cur.wind_gusts_10m),
      precip: num(cur.precipitation),
      // `current` has no probability/UV fields, so read the matching hourly slot.
      precipProb: num(hourly.precipitation_probability?.[hourIndex], days[0]?.precipProb ?? 0),
      uv: num(hourly.uv_index?.[hourIndex], days[0]?.uv ?? 0),
      code: num(cur.weather_code),
      isDay: num(cur.is_day, 1) === 1,
    },
    daily: days,
  };
}

export interface FetchOptions {
  /** Skip the per-isolate memo (used by the endpoint for a hard refresh). */
  fresh?: boolean;
}

export async function fetchWeather(options: FetchOptions = {}): Promise<WeatherData> {
  if (!options.fresh && memo && Date.now() - memo.at < CACHE_TTL_SECONDS * 1000) {
    return memo.data;
  }

  const response = await fetch(buildUrl(), {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    // Cloudflare-specific: cache the upstream subrequest at the edge.
    cf: { cacheTtl: CACHE_TTL_SECONDS, cacheEverything: true },
  } as RequestInit);

  if (!response.ok) {
    throw new Error(`Upstream weather request failed with ${response.status}`);
  }

  const data = normalise(await response.json());
  memo = { at: Date.now(), data };
  return data;
}

export const WEATHER_CACHE_SECONDS = CACHE_TTL_SECONDS;

/* ------------------------------------------------------------------ */
/* Re-exports                                                            */
/*                                                                       */
/* The pure classification helpers live in ./conditions so the browser    */
/* bundle can use them without pulling in this module's config import.    */
/* ------------------------------------------------------------------ */

export {
  CODE_KEYS,
  CONDITION_ICONS,
  conditionKey,
  conditionIcon,
  beaufort,
  isThunder,
  isHeavyRain,
  isModerateRain,
  isLightRain,
  isDrizzle,
  isAnyRain,
  isFog,
  isClear,
  isCloudy,
  WIND_GALE_KMH,
  WIND_GALE_GUST_KMH,
  WIND_WINDY_KMH,
  WIND_WINDY_GUST_KMH,
} from './conditions';
