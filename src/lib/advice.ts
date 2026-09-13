/**
 * Weather → action rule engine.
 *
 * Turns a raw forecast payload into something a visitor can act on: what to
 * wear, how to plan the day, what to put in the bag, and — only when the data
 * justifies it — a risk alert that gets pinned above everything else.
 *
 * The copy is deliberately plain-spoken. No meteorological jargon, no "relative
 * humidity 75%", and never a categorical claim where the data only supports a
 * probability ("降水概率较高", not "今天一定下雨"). Items whose condition is not
 * met are simply not rendered, so the panel never turns into a wall of warnings.
 *
 * The attraction is a mountain-and-forest hot spring, so the tips are aimed at
 * that setting: slippery trails, mountain streams, forest mosquitoes, heat at
 * the open soaking pools — rather than beaches or city streets.
 *
 * Pure module: no Node or Cloudflare APIs, so the same code runs at build time,
 * in the edge endpoint and in the browser bundle without drifting apart.
 */
import {
  isAnyRain,
  isClear,
  isCloudy,
  isDrizzle,
  isFog,
  isHeavyRain,
  isLightRain,
  isModerateRain,
  isThunder,
  WIND_GALE_GUST_KMH,
  WIND_GALE_KMH,
  WIND_WINDY_GUST_KMH,
  WIND_WINDY_KMH,
} from './conditions';
import type { WeatherData } from './weather';

export const ADVICE_KEYS = [
  // Risk alerts (highest priority, pinned)
  'riskThunder',
  'riskHeavyRain',
  'riskGale',
  'riskWindy',
  'riskExtremeHeat',
  'riskHeat',
  'riskFog',
  'riskColdSnap',
  'riskUvExtreme',
  // What to wear
  'outfitRain',
  'outfitWind',
  'outfitCold',
  'outfitHot',
  'outfitSwing',
  'outfitMild',
  // How to plan the day
  'planThunder',
  'planHeavyRain',
  'planRainLikely',
  'planDrizzle',
  'planHot',
  'planFog',
  'planUvStrong',
  'planWindSpring',
  'planSpringShade',
  'planSpringCool',
  'planClear',
  'planCloudy',
  'planPleasant',
  // What to bring
  'packRaincoat',
  'packUmbrella',
  'packFoldingUmbrella',
  'packGripShoes',
  'packSun',
  'packWater',
  'packThermal',
  'packLayer',
  'packMosquito',
  'packWindbreaker',
  'packMask',
  'packTowel',
] as const;

export type AdviceKey = (typeof ADVICE_KEYS)[number];

export type AdviceCopy = Record<AdviceKey, string>;

/** Language-neutral icons for the "what to bring" chips. */
export const PACK_ICONS: Record<string, string> = {
  packRaincoat: '🧥',
  packUmbrella: '☂️',
  packFoldingUmbrella: '☂️',
  packGripShoes: '👟',
  packSun: '🧴',
  packWater: '💧',
  packThermal: '🧣',
  packLayer: '🧥',
  packMosquito: '🦟',
  packWindbreaker: '🌬️',
  packMask: '😷',
  packTowel: '🧺',
};

export type AdviceSeverity = 'danger' | 'warn' | 'info';

export interface AdviceItem {
  key: AdviceKey;
  label: string;
  severity: AdviceSeverity;
  icon?: string;
}

export interface AdviceResult {
  /** Only ever populated when the forecast actually warrants a warning. */
  risk: AdviceItem[];
  outfit: AdviceItem[];
  plan: AdviceItem[];
  pack: AdviceItem[];
}

const cap = <T,>(list: T[], max: number): T[] => (list.length > max ? list.slice(0, max) : list);

/** A daily code counts as confirmed once a number backs it up — see below. */
const RAIN_CONFIRM_PROB = 40;
const RAIN_CONFIRM_MM = 1;

export interface AdviceOptions {
  /** Which entry of `data.daily` the advice describes. Defaults to today. */
  focusIndex?: number;
}

/**
 * Builds the advice groups for a payload.
 *
 * Items whose copy is missing are skipped, so a partially translated locale
 * degrades gracefully instead of rendering blank rows.
 */
export function buildAdvice(
  data: WeatherData,
  copy: Partial<AdviceCopy>,
  options: AdviceOptions = {}
): AdviceResult {
  const current = data.current;
  const today = data.daily?.[options.focusIndex ?? 0] ?? data.daily?.[0];

  const tMax = today?.max ?? current.temp;
  const tMin = today?.min ?? current.temp;
  const windMax = Math.max(today?.windMax ?? 0, current.wind);
  const gustMax = Math.max(today?.gustMax ?? 0, current.gust);
  const rainProbDay = Math.max(today?.precipProb ?? 0, current.precipProb);
  const precipSum = today?.precipSum ?? current.precip;
  const uvDay = Math.max(today?.uv ?? 0, current.uv);

  const nowCode = current.code;
  const dayCode = today?.code ?? current.code;

  /*
   * The daily code describes the most significant weather of the whole day. It
   * is a strong signal on its own for severe conditions, but on a marginal one
   * it can disagree with the numbers — telling someone to expect rain under a
   * 2% probability is how a weather panel loses trust. So a "light" daily code
   * only counts when the probability or the expected total backs it up.
   */
  const dayRainConfirmed = rainProbDay >= RAIN_CONFIRM_PROB || precipSum >= RAIN_CONFIRM_MM;
  const dayRainCode = isAnyRain(dayCode);
  const dayRain =
    dayRainCode && (dayRainConfirmed || isThunder(dayCode) || isHeavyRain(dayCode));

  const nowRain = isAnyRain(nowCode);

  const thunder = isThunder(nowCode) || (dayRain && isThunder(dayCode));
  const heavyRain =
    isHeavyRain(nowCode) || (dayRain && isHeavyRain(dayCode)) || (precipSum >= 30 && rainProbDay >= 70);
  const moderateRain = isModerateRain(nowCode) || (dayRain && isModerateRain(dayCode));
  const lightRain = isLightRain(nowCode) || (dayRain && isLightRain(dayCode)) || (dayRain && isDrizzle(dayCode));
  const anyRain = thunder || heavyRain || moderateRain || lightRain || nowRain;
  const wet = anyRain || rainProbDay >= 60 || precipSum >= 5;

  const fog = isFog(nowCode) || isFog(dayCode);
  const gale = gustMax >= WIND_GALE_GUST_KMH || windMax >= WIND_GALE_KMH;
  const windy = !gale && (gustMax >= WIND_WINDY_GUST_KMH || windMax >= WIND_WINDY_KMH);

  const veryHot = tMax >= 38;
  const hot = tMax >= 32;
  const cold = tMax <= 18;
  const coldNight = tMin <= 12;
  const swingBig = tMax - tMin >= 10;
  const uvStrong = uvDay >= 5;
  const uvVeryStrong = uvDay >= 11;

  const risk: AdviceItem[] = [];
  const outfit: AdviceItem[] = [];
  const plan: AdviceItem[] = [];
  const pack: AdviceItem[] = [];

  const add = (bucket: AdviceItem[], key: AdviceKey, severity: AdviceSeverity = 'info', icon?: string) => {
    const label = copy[key];
    if (typeof label === 'string' && label.length > 0) bucket.push({ key, label, severity, icon });
  };

  /* ---------------- risk alerts ---------------- */

  if (thunder) add(risk, 'riskThunder', 'danger');
  if (heavyRain) add(risk, 'riskHeavyRain', 'danger');
  if (gale) add(risk, 'riskGale', 'danger');
  else if (windy) add(risk, 'riskWindy', 'warn');
  if (veryHot) add(risk, 'riskExtremeHeat', 'danger');
  else if (hot && current.apparent >= 38) add(risk, 'riskHeat', 'warn');
  if (uvVeryStrong) add(risk, 'riskUvExtreme', 'warn');
  if (fog) add(risk, 'riskFog', 'warn');
  if (coldNight) add(risk, 'riskColdSnap', 'warn');

  // Danger first. Array#sort is stable, so the authored order holds within a tier.
  const tier: Record<AdviceSeverity, number> = { danger: 2, warn: 1, info: 0 };
  risk.sort((a, b) => tier[b.severity] - tier[a.severity]);

  /* ---------------- what to wear ---------------- */

  if (wet) add(outfit, 'outfitRain');
  if (gale || windy) add(outfit, 'outfitWind');
  if (cold) add(outfit, 'outfitCold');
  if (hot) add(outfit, 'outfitHot');
  if (swingBig) add(outfit, 'outfitSwing');
  if (outfit.length === 0) add(outfit, 'outfitMild');

  /* ---------------- how to plan the day ---------------- */

  if (thunder) add(plan, 'planThunder');
  else if (heavyRain) add(plan, 'planHeavyRain');
  else if (moderateRain || rainProbDay >= 60) add(plan, 'planRainLikely');
  else if (lightRain) add(plan, 'planDrizzle');

  if (hot) add(plan, 'planHot');
  if (fog) add(plan, 'planFog');
  if (uvStrong && current.isDay) add(plan, 'planUvStrong');
  if (gale || windy) add(plan, 'planWindSpring');
  if (tMax >= 28) add(plan, 'planSpringShade');
  if (coldNight) add(plan, 'planSpringCool');

  // Sky-condition advice only makes sense when nothing more pressing is in play.
  if (!anyRain && rainProbDay < 60) {
    if (isClear(dayCode)) add(plan, 'planClear');
    else if (isCloudy(dayCode)) add(plan, 'planCloudy');
  }
  if (plan.length === 0) add(plan, 'planPleasant');

  /* ---------------- what to bring ---------------- */

  if (heavyRain || gale) add(pack, 'packRaincoat', 'info', PACK_ICONS.packRaincoat);
  else if (moderateRain || rainProbDay >= 60) add(pack, 'packUmbrella', 'info', PACK_ICONS.packUmbrella);
  else if (anyRain || precipSum >= 5) add(pack, 'packFoldingUmbrella', 'info', PACK_ICONS.packFoldingUmbrella);

  if (wet) add(pack, 'packGripShoes', 'info', PACK_ICONS.packGripShoes);
  if (uvStrong || hot) add(pack, 'packSun', 'info', PACK_ICONS.packSun);
  if (hot || current.apparent >= 33) add(pack, 'packWater', 'info', PACK_ICONS.packWater);
  if (cold) add(pack, 'packThermal', 'info', PACK_ICONS.packThermal);
  else if (swingBig) add(pack, 'packLayer', 'info', PACK_ICONS.packLayer);
  // Rain and high humidity both drive mosquito activity in the forest.
  if (rainProbDay >= 40 || current.humidity >= 75 || anyRain) {
    add(pack, 'packMosquito', 'info', PACK_ICONS.packMosquito);
  }
  if (gale || windy) add(pack, 'packWindbreaker', 'info', PACK_ICONS.packWindbreaker);
  if (fog) add(pack, 'packMask', 'info', PACK_ICONS.packMask);
  // A towel only matters when the pools are actually usable.
  if (!thunder && !heavyRain) add(pack, 'packTowel', 'info', PACK_ICONS.packTowel);

  return {
    risk,
    outfit: cap(outfit, 3),
    plan: cap(plan, 4),
    pack: cap(pack, 6),
  };
}
