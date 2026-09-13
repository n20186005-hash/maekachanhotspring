/**
 * Edge endpoint backing the live weather module.
 *
 * Runs on demand (never prerendered) so the payload stays current, while the
 * response carries a shared-cache directive so repeat visitors are served from
 * the edge instead of re-hitting the upstream data source.
 */
import type { APIRoute } from 'astro';
import { fetchWeather, WEATHER_CACHE_SECONDS } from '../../lib/weather';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const data = await fetchWeather();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': `public, s-maxage=${WEATHER_CACHE_SECONDS}, stale-while-revalidate=${WEATHER_CACHE_SECONDS * 4}`,
        'access-control-allow-origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'weather_unavailable' }), {
      status: 503,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  }
};
