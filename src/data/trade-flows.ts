import { TradeFlow } from '@/lib/types';

export const tradeFlows: TradeFlow[] = [
  // MIDDLE EAST → ASIA (the dominant global flow)
  { id: 'sa-cn', source: { name: 'Saudi Arabia', lat: 25.0, lng: 45.0 }, dest: { name: 'China', lat: 30.0, lng: 121.0 }, volume: 1750, commodity: 'crude', route: 'tanker' },
  { id: 'sa-jp', source: { name: 'Saudi Arabia', lat: 25.0, lng: 45.0 }, dest: { name: 'Japan', lat: 35.0, lng: 137.0 }, volume: 1100, commodity: 'crude', route: 'tanker' },
  { id: 'sa-kr', source: { name: 'Saudi Arabia', lat: 25.0, lng: 45.0 }, dest: { name: 'South Korea', lat: 36.5, lng: 128.0 }, volume: 870, commodity: 'crude', route: 'tanker' },
  { id: 'sa-in', source: { name: 'Saudi Arabia', lat: 25.0, lng: 45.0 }, dest: { name: 'India', lat: 20.0, lng: 78.0 }, volume: 840, commodity: 'crude', route: 'tanker' },
  { id: 'iq-cn', source: { name: 'Iraq', lat: 33.0, lng: 44.0 }, dest: { name: 'China', lat: 30.0, lng: 121.0 }, volume: 1200, commodity: 'crude', route: 'tanker' },
  { id: 'iq-in', source: { name: 'Iraq', lat: 33.0, lng: 44.0 }, dest: { name: 'India', lat: 20.0, lng: 78.0 }, volume: 1050, commodity: 'crude', route: 'tanker' },
  { id: 'uae-jp', source: { name: 'UAE', lat: 24.0, lng: 54.0 }, dest: { name: 'Japan', lat: 35.0, lng: 137.0 }, volume: 720, commodity: 'crude', route: 'tanker' },
  { id: 'uae-in', source: { name: 'UAE', lat: 24.0, lng: 54.0 }, dest: { name: 'India', lat: 20.0, lng: 78.0 }, volume: 600, commodity: 'crude', route: 'tanker' },
  { id: 'uae-kr', source: { name: 'UAE', lat: 24.0, lng: 54.0 }, dest: { name: 'South Korea', lat: 36.5, lng: 128.0 }, volume: 480, commodity: 'crude', route: 'tanker' },
  { id: 'kw-kr', source: { name: 'Kuwait', lat: 29.0, lng: 48.0 }, dest: { name: 'South Korea', lat: 36.5, lng: 128.0 }, volume: 520, commodity: 'crude', route: 'tanker' },
  { id: 'kw-cn', source: { name: 'Kuwait', lat: 29.0, lng: 48.0 }, dest: { name: 'China', lat: 30.0, lng: 121.0 }, volume: 410, commodity: 'crude', route: 'tanker' },
  { id: 'ir-cn', source: { name: 'Iran', lat: 32.0, lng: 53.0 }, dest: { name: 'China', lat: 30.0, lng: 121.0 }, volume: 900, commodity: 'crude', route: 'tanker' },

  // RUSSIA → ASIA & EUROPE
  { id: 'ru-cn', source: { name: 'Russia', lat: 55.0, lng: 82.0 }, dest: { name: 'China', lat: 40.0, lng: 116.0 }, volume: 2100, commodity: 'crude', route: 'pipeline' },
  { id: 'ru-in', source: { name: 'Russia', lat: 55.0, lng: 37.0 }, dest: { name: 'India', lat: 20.0, lng: 78.0 }, volume: 1800, commodity: 'crude', route: 'tanker' },
  { id: 'ru-tr', source: { name: 'Russia', lat: 43.0, lng: 39.0 }, dest: { name: 'Turkey', lat: 39.0, lng: 35.0 }, volume: 350, commodity: 'crude', route: 'tanker' },

  // AMERICAS
  { id: 'ca-us', source: { name: 'Canada', lat: 56.0, lng: -114.0 }, dest: { name: 'USA (Gulf)', lat: 30.0, lng: -93.0 }, volume: 3900, commodity: 'crude', route: 'pipeline' },
  { id: 'mx-us', source: { name: 'Mexico', lat: 19.0, lng: -96.0 }, dest: { name: 'USA (Gulf)', lat: 30.0, lng: -93.0 }, volume: 650, commodity: 'crude', route: 'tanker' },
  { id: 'us-eu', source: { name: 'USA (Gulf)', lat: 29.0, lng: -90.0 }, dest: { name: 'Europe (ARA)', lat: 51.9, lng: 4.5 }, volume: 1400, commodity: 'crude', route: 'tanker' },
  { id: 'us-kr', source: { name: 'USA (Gulf)', lat: 29.0, lng: -90.0 }, dest: { name: 'South Korea', lat: 36.5, lng: 128.0 }, volume: 580, commodity: 'crude', route: 'tanker' },
  { id: 'us-cn', source: { name: 'USA (Gulf)', lat: 29.0, lng: -90.0 }, dest: { name: 'China', lat: 30.0, lng: 121.0 }, volume: 200, commodity: 'crude', route: 'tanker' },
  { id: 'br-cn', source: { name: 'Brazil', lat: -22.0, lng: -40.0 }, dest: { name: 'China', lat: 30.0, lng: 121.0 }, volume: 850, commodity: 'crude', route: 'tanker' },
  { id: 'gy-us', source: { name: 'Guyana', lat: 7.0, lng: -58.0 }, dest: { name: 'USA (Gulf)', lat: 29.0, lng: -90.0 }, volume: 400, commodity: 'crude', route: 'tanker' },
  { id: 'vz-cn', source: { name: 'Venezuela', lat: 10.0, lng: -67.0 }, dest: { name: 'China', lat: 30.0, lng: 121.0 }, volume: 400, commodity: 'crude', route: 'tanker' },

  // AFRICA
  { id: 'ng-eu', source: { name: 'Nigeria', lat: 6.5, lng: 3.4 }, dest: { name: 'Europe (ARA)', lat: 51.9, lng: 4.5 }, volume: 420, commodity: 'crude', route: 'tanker' },
  { id: 'ng-in', source: { name: 'Nigeria', lat: 6.5, lng: 3.4 }, dest: { name: 'India', lat: 20.0, lng: 78.0 }, volume: 380, commodity: 'crude', route: 'tanker' },
  { id: 'ao-cn', source: { name: 'Angola', lat: -8.8, lng: 13.2 }, dest: { name: 'China', lat: 30.0, lng: 121.0 }, volume: 600, commodity: 'crude', route: 'tanker' },
  { id: 'ly-eu', source: { name: 'Libya', lat: 32.0, lng: 13.0 }, dest: { name: 'Europe (Med)', lat: 43.0, lng: 5.0 }, volume: 500, commodity: 'crude', route: 'tanker' },

  // NORWAY / NORTH SEA
  { id: 'no-eu', source: { name: 'Norway', lat: 58.0, lng: 5.0 }, dest: { name: 'Europe (ARA)', lat: 51.9, lng: 4.5 }, volume: 1400, commodity: 'crude', route: 'tanker' },
  { id: 'no-uk', source: { name: 'Norway', lat: 58.0, lng: 5.0 }, dest: { name: 'UK', lat: 51.5, lng: 0.0 }, volume: 600, commodity: 'crude', route: 'pipeline' },

  // CENTRAL ASIA
  { id: 'kz-eu', source: { name: 'Kazakhstan', lat: 46.0, lng: 52.0 }, dest: { name: 'Europe (Med)', lat: 43.0, lng: 5.0 }, volume: 1200, commodity: 'crude', route: 'pipeline' },

  // LNG FLOWS
  { id: 'qa-jp-lng', source: { name: 'Qatar', lat: 25.3, lng: 51.2 }, dest: { name: 'Japan', lat: 35.0, lng: 137.0 }, volume: 700, commodity: 'lng', route: 'tanker' },
  { id: 'qa-kr-lng', source: { name: 'Qatar', lat: 25.3, lng: 51.2 }, dest: { name: 'South Korea', lat: 36.5, lng: 128.0 }, volume: 500, commodity: 'lng', route: 'tanker' },
  { id: 'us-eu-lng', source: { name: 'USA (Gulf)', lat: 29.0, lng: -90.0 }, dest: { name: 'Europe (ARA)', lat: 51.9, lng: 4.5 }, volume: 850, commodity: 'lng', route: 'tanker' },
  { id: 'au-jp-lng', source: { name: 'Australia (NW)', lat: -20.0, lng: 116.0 }, dest: { name: 'Japan', lat: 35.0, lng: 137.0 }, volume: 550, commodity: 'lng', route: 'tanker' },
];
