export interface Refinery {
  name: string;
  company: string;
  country: string;
  lat: number;
  lng: number;
  capacity: number; // barrels per day
  region: string;
}

export interface OilField {
  name: string;
  country: string;
  lat: number;
  lng: number;
  production: number; // barrels per day
  type: 'onshore' | 'offshore' | 'deepwater';
  reserves: number; // billion barrels estimated
}

export interface TradeFlow {
  id: string;
  source: { name: string; lat: number; lng: number };
  dest: { name: string; lat: number; lng: number };
  volume: number; // thousand barrels per day
  commodity: 'crude' | 'refined' | 'lng';
  route: 'tanker' | 'pipeline';
}

export interface CountryData {
  name: string;
  code: string;
  production: number; // million barrels per day
  consumption: number; // million barrels per day
  exports: number;
  imports: number;
  reserves: number; // billion barrels
}

export interface NewsEvent {
  id: string;
  title: string;
  summary: string;
  impact: 'bullish' | 'bearish' | 'neutral';
  severity: 1 | 2 | 3 | 4 | 5;
  category: 'geopolitical' | 'supply' | 'demand' | 'policy' | 'weather' | 'conflict';
  region: string;
  date: string;
  priceImpact: string;
  lat?: number;
  lng?: number;
}

export interface PricePoint {
  date: string;
  wti: number;
  brent: number;
  predicted?: boolean;
}

export interface Prediction {
  timeframe: string;
  wtiRange: [number, number];
  brentRange: [number, number];
  probability: number;
  direction: 'up' | 'down' | 'stable';
  rationale: string;
}
