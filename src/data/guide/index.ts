/**
 * Long-form editorial content for the visitor-guide sections of the home page.
 *
 * Kept out of the i18n JSON bundles because these blocks are large and only the
 * home page needs them.
 *
 * Factual grounding for the copy:
 *  - Location, water temperature, opening hours, side-by-side layout, facilities:
 *    Wiang Pa Pao / Mae Chedi Mai subdistrict administration record and the
 *    Chiang Rai provincial administrative organisation tourism directory.
 *  - Oral history ("Pong Din", caravan rest stop): as recorded by the subdistrict
 *    administration from the elders of Ban Pong Nam Ron.
 *  - Climate normals: WMO 1991–2020 normals for Chiang Rai.
 *  - Geology: standard literature on northern Thailand's fault-controlled springs.
 */
import type { Lang } from '../../i18n/ui';
import type { AdviceKey } from '../../lib/advice';
import { th } from './th';
import { zh } from './zh';
import { en } from './en';

export interface GuideSection {
  title: string;
  subtitle: string;
}

/**
 * Headings and framing copy for the auto-generated weather advice panel.
 *
 * The rule copy itself is keyed by `AdviceKey` so a locale cannot silently ship
 * a partially translated advice library — TypeScript will flag the gap.
 */
export interface WeatherAdviceCopy {
  groupLabel: string;
  groupOutfit: string;
  groupPlan: string;
  groupPack: string;
  riskTitle: string;
  noRisk: string;
  riskNote: string;
  copy: Record<AdviceKey, string>;
}

export interface WeatherStrings {
  title: string;
  subtitle: string;
  nowLabel: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  windUnit: string;
  /** Beaufort force suffix, e.g. 级 / Bft / บิวฟอร์ต. */
  scaleUnit: string;
  rain: string;
  uv: string;
  updated: string;
  forecastTitle: string;
  high: string;
  low: string;
  loading: string;
  unavailable: string;
  retry: string;
  footnote: string;
  advice: WeatherAdviceCopy;
}

export interface SeasonRow {
  season: string;
  months: string;
  weather: string;
  water: string;
  ecology: string;
  advice: string;
}

export interface SeasonsBlock extends GuideSection {
  columns: { season: string; months: string; weather: string; water: string; ecology: string; advice: string };
  rows: SeasonRow[];
  source: string;
  note: string;
}

export interface Itinerary {
  badge: string;
  name: string;
  duration: string;
  summary: string;
  stops: { time: string; text: string }[];
  bestFor: string;
}

export interface ItinerariesBlock extends GuideSection {
  items: Itinerary[];
}

export interface Profile {
  icon: string;
  name: string;
  audience: string;
  plan: string;
  highlights: string[];
  cautions: string;
}

export interface ProfilesBlock extends GuideSection {
  highlightsLabel: string;
  cautionsLabel: string;
  items: Profile[];
}

export interface ServiceItem {
  icon: string;
  name: string;
  status: string;
  detail: string;
}

export interface ServicesBlock extends GuideSection {
  note: string;
  items: ServiceItem[];
}

export interface ScienceBlock extends GuideSection {
  blocks: { icon: string; title: string; text: string }[];
}

export interface ResponsibilityBlock extends GuideSection {
  items: { icon: string; title: string; text: string }[];
}

export interface HeritageBlock extends GuideSection {
  intro: string;
  chapters: { title: string; text: string }[];
  timelineTitle: string;
  timeline: { period: string; text: string }[];
}

export interface GuideContent {
  weather: WeatherStrings;
  seasons: SeasonsBlock;
  itineraries: ItinerariesBlock;
  profiles: ProfilesBlock;
  services: ServicesBlock;
  science: ScienceBlock;
  responsibility: ResponsibilityBlock;
  heritage: HeritageBlock;
}

const content: Record<string, GuideContent> = { th, zh, en };

export function getGuide(lang: Lang | string): GuideContent {
  return content[lang] ?? content.th;
}
