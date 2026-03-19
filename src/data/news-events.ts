import { NewsEvent, PricePoint, Prediction } from '@/lib/types';

export const newsEvents: NewsEvent[] = [
  // === IRAN / GULF ATTACKS — CRITICAL MARCH 2026 EVENTS ===
  {
    id: 'iran-strait-hormuz',
    title: 'Iran Threatens to Close Strait of Hormuz After US Carrier Strike Group Deployment',
    summary: 'IRGC Navy commander Gen. Tangsiri warned Iran will blockade the Strait of Hormuz if Western sanctions choke Iranian oil revenues below $30B/year. 21% of global oil (17.3M bpd) transits the 21-mile-wide chokepoint. US deployed USS Eisenhower CSG to Arabian Sea in response. Insurance premiums on Gulf tankers surged 400%.',
    impact: 'bullish',
    severity: 5,
    category: 'conflict',
    region: 'Persian Gulf',
    date: '2026-03-19',
    priceImpact: '+$8-15/bbl if blockade materializes',
    lat: 26.56,
    lng: 56.25,
  },
  {
    id: 'iran-attacks-uae-tanker',
    title: 'IRGC Fast Boats Seize UAE-Flagged Tanker Near Fujairah',
    summary: 'Iran\'s Revolutionary Guard seized the MT Al Fujairah Star carrying 2M barrels of crude near Fujairah port. Third tanker seizure in 2026. UAE activated mutual defense protocol with Saudi Arabia. Lloyd\'s of London raised Gulf war risk premiums to highest since 1988 Tanker War.',
    impact: 'bullish',
    severity: 5,
    category: 'conflict',
    region: 'Persian Gulf',
    date: '2026-03-18',
    priceImpact: '+$3-5/bbl war risk premium',
    lat: 25.12,
    lng: 56.33,
  },
  {
    id: 'iran-drone-saudi-aramco',
    title: 'Iranian-Backed Drone Strike Damages Saudi Aramco Pipeline Near Abqaiq',
    summary: 'A swarm of 18 explosive drones, attributed to Iranian-backed militias in Iraq, struck the critical Abqaiq-Yanbu pipeline infrastructure. Saudi Arabia confirmed 400K bpd temporarily offline. Echoes of the 2019 Abqaiq attack. Saudi air defenses intercepted 12 of 18 drones.',
    impact: 'bullish',
    severity: 5,
    category: 'conflict',
    region: 'Persian Gulf',
    date: '2026-03-17',
    priceImpact: '+$4-7/bbl acute disruption premium',
    lat: 25.94,
    lng: 49.68,
  },
  {
    id: 'iran-iraq-militia-basra',
    title: 'Iran-Backed PMF Militia Threatens Basra Oil Export Terminal',
    summary: 'Kata\'ib Hezbollah, an Iranian proxy militia, warned it would attack Basra\'s Al Faw Grand Port and the Khor al-Amaya oil terminal if US forces don\'t withdraw from Iraq. Basra exports 3.3M bpd — any disruption is catastrophic for global supply.',
    impact: 'bullish',
    severity: 4,
    category: 'conflict',
    region: 'Persian Gulf',
    date: '2026-03-16',
    priceImpact: '+$2-4/bbl threat premium on Iraqi crude',
    lat: 29.68,
    lng: 48.80,
  },
  {
    id: 'iran-us-navy-confrontation',
    title: 'US Navy Fires Warning Shots After IRGC Boats Approach USS Bataan',
    summary: 'Three IRGC fast-attack boats made aggressive approaches within 300 yards of USS Bataan in the Strait of Hormuz. US fired warning flares and shots. Pentagon raised force protection level to FPCON Charlie across all Gulf bases. Oil tanker traffic through Hormuz dropped 15% in 48 hours.',
    impact: 'bullish',
    severity: 5,
    category: 'conflict',
    region: 'Persian Gulf',
    date: '2026-03-15',
    priceImpact: '+$5-8/bbl escalation risk',
    lat: 26.60,
    lng: 56.08,
  },
  {
    id: 'iran-sanctions-crackdown',
    title: 'US Sanctions 50 Entities in Iran Oil Shadow Fleet Crackdown',
    summary: 'Treasury Dept designated 50 entities including 30 tankers, 12 front companies, and 8 port operators enabling Iranian oil smuggling to China. Targeted removal of 1.2M bpd of Iranian crude from market. China\'s teapot refineries scramble for alternatives.',
    impact: 'bullish',
    severity: 5,
    category: 'geopolitical',
    region: 'Global',
    date: '2026-03-14',
    priceImpact: '+$4-6/bbl if enforced',
    lat: 35.69,
    lng: 51.39,
  },
  {
    id: 'iran-nuclear-breakout',
    title: 'IAEA Confirms Iran at 90% Uranium Enrichment — Nuclear Breakout Imminent',
    summary: 'IAEA inspectors confirmed Iran has accumulated 120kg of weapons-grade uranium (90% enriched), enough for 2-3 nuclear devices. Israel placed military on highest alert. US-Israel contingency strike plans leaked. Oil markets pricing in potential military strike on Iranian nuclear facilities.',
    impact: 'bullish',
    severity: 5,
    category: 'geopolitical',
    region: 'Middle East',
    date: '2026-03-12',
    priceImpact: '+$10-20/bbl if military strike occurs',
    lat: 32.65,
    lng: 51.67,
  },

  // === HOUTHI / RED SEA ===
  {
    id: 'red-sea-attacks',
    title: 'Houthi Anti-Ship Missile Sinks Greek Tanker in Red Sea',
    summary: 'Houthi forces sank the MV Sounion carrying 1M barrels of crude oil in the southern Red Sea using anti-ship ballistic missiles. Major environmental disaster unfolding. All major shipping lines have now suspended Red Sea transits indefinitely. Suez Canal revenues down 75%. Rerouting via Cape of Good Hope adds 10-14 days and $1M+ per voyage.',
    impact: 'bullish',
    severity: 5,
    category: 'conflict',
    region: 'Red Sea',
    date: '2026-03-17',
    priceImpact: '+$3-5/bbl freight + insurance premium',
    lat: 13.00,
    lng: 42.50,
  },

  // === OPEC+ / SUPPLY ===
  {
    id: 'opec-emergency-meeting',
    title: 'OPEC+ Calls Emergency Meeting as Gulf Tensions Spike',
    summary: 'Saudi Arabia convened an emergency OPEC+ ministerial meeting amid escalating Iran-Gulf tensions. The cartel is weighing whether to release spare capacity (3.5M bpd available) to stabilize prices or let geopolitical premium support revenues. UAE and Kuwait pushing for strategic reserve deployment.',
    impact: 'neutral',
    severity: 4,
    category: 'supply',
    region: 'Middle East',
    date: '2026-03-19',
    priceImpact: 'Depends on outcome — could be +/- $5/bbl',
    lat: 24.71,
    lng: 46.67,
  },
  {
    id: 'opec-cut-extend',
    title: 'OPEC+ Extends Production Cuts Through Q2 2026',
    summary: 'OPEC+ agreed to maintain current production cuts of 2.2 million bpd through June 2026, with Saudi Arabia signaling willingness to deepen cuts if prices fall below $70.',
    impact: 'bullish',
    severity: 4,
    category: 'supply',
    region: 'Middle East',
    date: '2026-03-12',
    priceImpact: '+$2-3/bbl support floor',
    lat: 24.71,
    lng: 46.67,
  },

  // === RUSSIA ===
  {
    id: 'us-tariffs-march-2026',
    title: 'US Imposes New Tariffs on Russian Energy Exports',
    summary: 'The Biden administration announced expanded sanctions targeting Russian crude oil and refined product exports, restricting shadow fleet tanker operations and imposing secondary sanctions on refineries processing Russian crude.',
    impact: 'bullish',
    severity: 5,
    category: 'geopolitical',
    region: 'Global',
    date: '2026-03-15',
    priceImpact: '+$3-5/bbl on Brent',
    lat: 55.75,
    lng: 37.62,
  },
  {
    id: 'eu-russian-ban',
    title: 'EU Tightens Price Cap Enforcement on Russian Oil',
    summary: 'EU authorities intercepted 12 shadow fleet tankers carrying Russian crude above the $60 price cap. New tracking requirements and port inspections implemented across Mediterranean.',
    impact: 'neutral',
    severity: 3,
    category: 'policy',
    region: 'Europe',
    date: '2026-03-09',
    priceImpact: 'Widens Urals discount to Brent',
    lat: 48.85,
    lng: 2.35,
  },

  // === CHINA / DEMAND ===
  {
    id: 'china-stimulus',
    title: 'China Announces Massive Infrastructure Stimulus Package',
    summary: 'China\'s State Council approved a ¥4 trillion infrastructure stimulus package targeting transportation and industrial development, expected to boost crude oil demand by 500,000 bpd.',
    impact: 'bullish',
    severity: 4,
    category: 'demand',
    region: 'Asia',
    date: '2026-03-10',
    priceImpact: '+$1-2/bbl demand pull',
    lat: 39.90,
    lng: 116.40,
  },
  {
    id: 'china-strategic-stockpiling',
    title: 'China Accelerates Strategic Oil Stockpiling Amid Gulf Crisis',
    summary: 'Satellite imagery shows China filling 12 major strategic reserve sites to capacity. Estimated 200M barrels purchased in March alone. Beijing preparing for potential Hormuz disruption by front-loading crude imports.',
    impact: 'bullish',
    severity: 4,
    category: 'demand',
    region: 'Asia',
    date: '2026-03-18',
    priceImpact: '+$2-3/bbl demand surge',
    lat: 30.0,
    lng: 121.0,
  },

  // === LIBYA / AFRICA ===
  {
    id: 'libya-shutdown',
    title: 'Libya Oil Production Halted Amid Civil Unrest',
    summary: 'Armed groups shut down Libya\'s largest oil export terminals at Es Sider and Ras Lanuf, cutting 500,000 bpd. The rival governments in Tripoli and Benghazi dispute oil revenue distribution.',
    impact: 'bullish',
    severity: 4,
    category: 'conflict',
    region: 'Africa',
    date: '2026-03-16',
    priceImpact: '+$1-2/bbl supply disruption',
    lat: 30.63,
    lng: 18.55,
  },

  // === US / AMERICAS ===
  {
    id: 'us-spr-release',
    title: 'US Strategic Petroleum Reserve at Decade Low',
    summary: 'The US SPR stands at 372 million barrels, its lowest since 1984. The DOE paused refill operations citing budget constraints, reducing the market\'s emergency supply buffer.',
    impact: 'bearish',
    severity: 3,
    category: 'supply',
    region: 'North America',
    date: '2026-03-14',
    priceImpact: 'Removes supply buffer, volatility risk',
    lat: 30.00,
    lng: -93.00,
  },
  {
    id: 'us-shale-decline',
    title: 'US Shale Growth Slows — Permian Basin Rig Count Falls',
    summary: 'Active rig count in the Permian Basin dropped to 285, lowest in 18 months. Operators cite capital discipline and exhaustion of Tier-1 drilling locations. EIA revises 2026 production growth down by 300K bpd.',
    impact: 'bullish',
    severity: 3,
    category: 'supply',
    region: 'North America',
    date: '2026-03-13',
    priceImpact: 'Structural supply constraint',
    lat: 31.95,
    lng: -102.18,
  },

  // === INDIA ===
  {
    id: 'india-refinery-expansion',
    title: 'India\'s Refining Capacity Set to Surge by 1.5M bpd',
    summary: 'India announced plans to add 1.5 million bpd of refining capacity by 2028, with new refineries at Ratnagiri and Barmer. This will increase crude import demand significantly.',
    impact: 'bullish',
    severity: 3,
    category: 'demand',
    region: 'Asia',
    date: '2026-03-11',
    priceImpact: 'Long-term demand support',
    lat: 20.59,
    lng: 78.96,
  },

  // === WEATHER / OTHER ===
  {
    id: 'hurricane-season',
    title: 'Early Hurricane Season Threatens Gulf of Mexico Production',
    summary: 'NOAA forecasts an above-average 2026 Atlantic hurricane season. Early tropical activity in March is unusual and raises risk of Gulf production shutdowns in critical refining corridor.',
    impact: 'bullish',
    severity: 2,
    category: 'weather',
    region: 'North America',
    date: '2026-03-18',
    priceImpact: 'Risk premium on Gulf production',
    lat: 25.76,
    lng: -80.19,
  },
  {
    id: 'ev-adoption-slowdown',
    title: 'Global EV Sales Growth Decelerates to 12% YoY',
    summary: 'EV adoption growth slowed from 35% to 12% year-over-year as subsidy rollbacks in Europe and China bite. Peak oil demand timeline pushed back to 2032 in revised forecasts.',
    impact: 'bullish',
    severity: 2,
    category: 'demand',
    region: 'Global',
    date: '2026-03-07',
    priceImpact: 'Extends oil demand plateau',
  },
];

// === PRICE HISTORY — extended for 1-year lookback + 1-year forward ===
export const priceHistory: PricePoint[] = [
  // Historical — 1 year back
  { date: '2025-03-19', wti: 65.20, brent: 68.80 },
  { date: '2025-04-01', wti: 63.50, brent: 67.00 },
  { date: '2025-04-15', wti: 62.80, brent: 66.30 },
  { date: '2025-05-01', wti: 61.20, brent: 64.50 },
  { date: '2025-05-15', wti: 63.80, brent: 67.20 },
  { date: '2025-06-01', wti: 67.50, brent: 71.00 },
  { date: '2025-06-15', wti: 69.00, brent: 72.50 },
  { date: '2025-07-01', wti: 72.30, brent: 75.80 },
  { date: '2025-07-15', wti: 74.10, brent: 77.60 },
  { date: '2025-08-01', wti: 73.20, brent: 76.70 },
  { date: '2025-08-15', wti: 71.80, brent: 75.30 },
  { date: '2025-09-01', wti: 69.50, brent: 73.00 },
  { date: '2025-09-15', wti: 71.00, brent: 74.50 },
  { date: '2025-10-01', wti: 70.10, brent: 73.50 },
  { date: '2025-10-15', wti: 68.90, brent: 72.20 },
  { date: '2025-11-01', wti: 67.20, brent: 70.80 },
  { date: '2025-11-15', wti: 69.50, brent: 73.10 },
  { date: '2025-12-01', wti: 71.30, brent: 74.90 },
  { date: '2025-12-15', wti: 70.00, brent: 73.60 },
  { date: '2026-01-01', wti: 72.80, brent: 76.40 },
  { date: '2026-01-15', wti: 75.10, brent: 78.50 },
  { date: '2026-02-01', wti: 73.40, brent: 77.00 },
  { date: '2026-02-15', wti: 71.90, brent: 75.30 },
  { date: '2026-03-01', wti: 69.50, brent: 73.10 },
  { date: '2026-03-05', wti: 70.20, brent: 73.80 },
  { date: '2026-03-10', wti: 71.80, brent: 75.40 },
  { date: '2026-03-12', wti: 73.50, brent: 77.10 },
  { date: '2026-03-14', wti: 72.90, brent: 76.50 },
  { date: '2026-03-17', wti: 74.60, brent: 78.20 },
  { date: '2026-03-19', wti: 75.80, brent: 79.40 },

  // Predictions — 1 week out
  { date: '2026-03-21', wti: 76.50, brent: 80.10, predicted: true },
  { date: '2026-03-23', wti: 77.20, brent: 80.80, predicted: true },
  { date: '2026-03-26', wti: 78.00, brent: 81.60, predicted: true },

  // Predictions — 1 month out
  { date: '2026-04-01', wti: 79.50, brent: 83.00, predicted: true },
  { date: '2026-04-08', wti: 80.20, brent: 83.80, predicted: true },
  { date: '2026-04-15', wti: 81.50, brent: 85.00, predicted: true },
  { date: '2026-04-22', wti: 80.80, brent: 84.30, predicted: true },

  // Predictions — 3 months out
  { date: '2026-05-01', wti: 82.00, brent: 85.50, predicted: true },
  { date: '2026-05-15', wti: 84.00, brent: 87.50, predicted: true },
  { date: '2026-06-01', wti: 86.00, brent: 89.50, predicted: true },
  { date: '2026-06-15', wti: 85.00, brent: 88.50, predicted: true },

  // Predictions — 6 months out
  { date: '2026-07-01', wti: 87.00, brent: 90.50, predicted: true },
  { date: '2026-08-01', wti: 88.50, brent: 92.00, predicted: true },
  { date: '2026-09-01', wti: 86.00, brent: 89.50, predicted: true },

  // Predictions — 1 year out
  { date: '2026-10-01', wti: 84.00, brent: 87.50, predicted: true },
  { date: '2026-11-01', wti: 82.00, brent: 85.50, predicted: true },
  { date: '2026-12-01', wti: 80.00, brent: 83.50, predicted: true },
  { date: '2027-01-01', wti: 78.50, brent: 82.00, predicted: true },
  { date: '2027-02-01', wti: 79.50, brent: 83.00, predicted: true },
  { date: '2027-03-01', wti: 81.00, brent: 84.50, predicted: true },
  { date: '2027-03-19', wti: 82.00, brent: 85.50, predicted: true },
];

export type ForecastHorizon = '1W' | '1M' | '1Y';

export function getPriceDataForHorizon(horizon: ForecastHorizon): PricePoint[] {
  const today = '2026-03-19';
  const actual = priceHistory.filter((p) => !p.predicted);
  const predicted = priceHistory.filter((p) => p.predicted);

  let cutoffDate: string;
  let historyStart: string;

  switch (horizon) {
    case '1W':
      cutoffDate = '2026-03-27';
      historyStart = '2026-02-01';
      break;
    case '1M':
      cutoffDate = '2026-04-25';
      historyStart = '2025-12-01';
      break;
    case '1Y':
      cutoffDate = '2027-03-20';
      historyStart = '2025-03-19';
      break;
  }

  const filteredActual = actual.filter((p) => p.date >= historyStart);
  const filteredPredicted = predicted.filter((p) => p.date <= cutoffDate);

  return [...filteredActual, ...filteredPredicted];
}

export const predictions: Record<ForecastHorizon, Prediction[]> = {
  '1W': [
    {
      timeframe: '1 Week (Mar 19-26)',
      wtiRange: [74.00, 80.00],
      brentRange: [77.50, 83.50],
      probability: 0.72,
      direction: 'up',
      rationale: 'Iran-Gulf confrontation at crisis level: tanker seizures, Abqaiq drone strike, Hormuz closure threats. OPEC+ emergency meeting could swing either way. Red Sea shipping suspended. Near-term risk overwhelmingly to the upside. Key risk: surprise diplomacy or OPEC+ spare capacity release.',
    },
  ],
  '1M': [
    {
      timeframe: '1 Month Base Case',
      wtiRange: [76.00, 85.00],
      brentRange: [79.50, 88.50],
      probability: 0.55,
      direction: 'up',
      rationale: 'Base case assumes Gulf tensions remain elevated but no direct Iran-US military exchange. Sanctions enforcement removes ~800K bpd Iranian crude. Libya offline. OPEC+ maintains discipline. China stockpiling drives spot demand.',
    },
    {
      timeframe: '1 Month Bull Case',
      wtiRange: [85.00, 100.00],
      brentRange: [88.50, 103.50],
      probability: 0.25,
      direction: 'up',
      rationale: 'Hormuz partial blockade or US/Israel strike on Iranian nuclear facilities. Cascading supply disruptions. Insurance markets freeze Gulf tanker coverage. Panic buying drives spot premiums to $10+/bbl.',
    },
    {
      timeframe: '1 Month Bear Case',
      wtiRange: [68.00, 75.00],
      brentRange: [71.50, 78.50],
      probability: 0.20,
      direction: 'down',
      rationale: 'Surprise diplomatic breakthrough with Iran. OPEC+ releases spare capacity to cool prices. China demand disappoints (PMI below 49). US shale responds with rapid well completions.',
    },
  ],
  '1Y': [
    {
      timeframe: '1 Year Base Case (Mar 2027)',
      wtiRange: [75.00, 88.00],
      brentRange: [78.50, 91.50],
      probability: 0.45,
      direction: 'up',
      rationale: 'Structural supply deficit persists: US shale plateau, OPEC+ discipline, and underinvestment in new capacity. Demand grows ~1M bpd from non-OECD. Iran tensions create persistent risk premium. EV transition slower than expected.',
    },
    {
      timeframe: '1 Year Bull Case (Superspike)',
      wtiRange: [95.00, 130.00],
      brentRange: [98.50, 133.50],
      probability: 0.15,
      direction: 'up',
      rationale: 'Prolonged Gulf conflict disrupts 5M+ bpd. OPEC+ spare capacity exhausted. Global SPR drawdowns insufficient. China and India compete for scarce barrels. Oil supercycle thesis validated.',
    },
    {
      timeframe: '1 Year Bear Case (Recession)',
      wtiRange: [50.00, 65.00],
      brentRange: [53.50, 68.50],
      probability: 0.15,
      direction: 'down',
      rationale: 'Global recession triggered by rate shock. China property crisis deepens. OPEC+ discipline collapses amid revenue pressure. Iran deal reached, flooding 2M bpd back to market. AI-driven efficiency reduces transport fuel demand faster than expected.',
    },
    {
      timeframe: '1 Year Stability Case',
      wtiRange: [70.00, 80.00],
      brentRange: [73.50, 83.50],
      probability: 0.25,
      direction: 'stable',
      rationale: 'Gulf tensions de-escalate. OPEC+ manages gradual production increases matching demand growth. US shale stabilizes at 13M bpd. China demand grows moderately. Market finds equilibrium in $75-80 Brent range.',
    },
  ],
};
