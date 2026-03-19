import { OilField } from '@/lib/types';

export const oilFields: OilField[] = [
  // SAUDI ARABIA
  { name: 'Ghawar', country: 'Saudi Arabia', lat: 25.37, lng: 49.21, production: 3800000, type: 'onshore', reserves: 75 },
  { name: 'Safaniyah', country: 'Saudi Arabia', lat: 28.10, lng: 48.74, production: 1500000, type: 'offshore', reserves: 37 },
  { name: 'Shaybah', country: 'Saudi Arabia', lat: 22.52, lng: 54.00, production: 1000000, type: 'onshore', reserves: 14 },
  { name: 'Khurais', country: 'Saudi Arabia', lat: 25.07, lng: 48.15, production: 1200000, type: 'onshore', reserves: 20 },
  { name: 'Manifa', country: 'Saudi Arabia', lat: 27.64, lng: 48.98, production: 900000, type: 'offshore', reserves: 13 },
  { name: 'Abqaiq', country: 'Saudi Arabia', lat: 25.94, lng: 49.68, production: 400000, type: 'onshore', reserves: 6 },

  // KUWAIT
  { name: 'Burgan', country: 'Kuwait', lat: 28.93, lng: 47.97, production: 1700000, type: 'onshore', reserves: 66 },

  // IRAQ
  { name: 'Rumaila', country: 'Iraq', lat: 30.60, lng: 47.30, production: 1450000, type: 'onshore', reserves: 17 },
  { name: 'West Qurna', country: 'Iraq', lat: 31.00, lng: 47.10, production: 480000, type: 'onshore', reserves: 21 },
  { name: 'Majnoon', country: 'Iraq', lat: 31.15, lng: 47.40, production: 240000, type: 'onshore', reserves: 12 },
  { name: 'Kirkuk', country: 'Iraq', lat: 35.47, lng: 44.39, production: 350000, type: 'onshore', reserves: 9 },

  // IRAN
  { name: 'Ahvaz-Asmari', country: 'Iran', lat: 31.32, lng: 48.69, production: 750000, type: 'onshore', reserves: 25 },
  { name: 'Marun', country: 'Iran', lat: 31.70, lng: 49.20, production: 520000, type: 'onshore', reserves: 22 },
  { name: 'South Pars', country: 'Iran', lat: 26.10, lng: 52.10, production: 400000, type: 'offshore', reserves: 51 },

  // UAE
  { name: 'Zakum', country: 'UAE', lat: 24.85, lng: 53.70, production: 600000, type: 'offshore', reserves: 16 },
  { name: 'Bu Hasa', country: 'UAE', lat: 23.50, lng: 53.30, production: 550000, type: 'onshore', reserves: 10 },

  // RUSSIA
  { name: 'Samotlor', country: 'Russia', lat: 61.18, lng: 76.68, production: 400000, type: 'onshore', reserves: 14 },
  { name: 'Priobskoye', country: 'Russia', lat: 61.03, lng: 68.60, production: 750000, type: 'onshore', reserves: 5 },
  { name: 'Romashkino', country: 'Russia', lat: 54.74, lng: 51.39, production: 300000, type: 'onshore', reserves: 3 },
  { name: 'Vankor', country: 'Russia', lat: 67.83, lng: 83.52, production: 440000, type: 'onshore', reserves: 3.5 },
  { name: 'Sakhalin-1', country: 'Russia', lat: 52.50, lng: 143.50, production: 220000, type: 'offshore', reserves: 2.3 },

  // USA
  { name: 'Permian Basin', country: 'USA', lat: 31.95, lng: -102.18, production: 6200000, type: 'onshore', reserves: 46 },
  { name: 'Eagle Ford Shale', country: 'USA', lat: 28.70, lng: -98.70, production: 1100000, type: 'onshore', reserves: 6 },
  { name: 'Bakken Formation', country: 'USA', lat: 47.95, lng: -103.50, production: 1100000, type: 'onshore', reserves: 7.4 },
  { name: 'Prudhoe Bay', country: 'USA', lat: 70.30, lng: -148.73, production: 200000, type: 'onshore', reserves: 2 },
  { name: 'Thunder Horse', country: 'USA', lat: 28.19, lng: -88.50, production: 250000, type: 'deepwater', reserves: 1.5 },
  { name: 'Mars-Ursa Basin', country: 'USA', lat: 28.17, lng: -89.22, production: 150000, type: 'deepwater', reserves: 1.2 },

  // VENEZUELA
  { name: 'Orinoco Belt', country: 'Venezuela', lat: 8.50, lng: -64.50, production: 650000, type: 'onshore', reserves: 235 },
  { name: 'Bolivar Coastal', country: 'Venezuela', lat: 10.50, lng: -71.50, production: 300000, type: 'onshore', reserves: 30 },

  // BRAZIL
  { name: 'Tupi/Lula (Pre-salt)', country: 'Brazil', lat: -25.50, lng: -42.50, production: 1000000, type: 'deepwater', reserves: 8 },
  { name: 'Buzios (Pre-salt)', country: 'Brazil', lat: -24.10, lng: -41.90, production: 600000, type: 'deepwater', reserves: 10 },

  // LIBYA
  { name: 'Sharara', country: 'Libya', lat: 27.00, lng: 12.50, production: 300000, type: 'onshore', reserves: 3 },
  { name: 'El Feel (Elephant)', country: 'Libya', lat: 27.50, lng: 13.50, production: 130000, type: 'onshore', reserves: 2 },

  // NIGERIA
  { name: 'Agbami', country: 'Nigeria', lat: 4.20, lng: 4.80, production: 240000, type: 'deepwater', reserves: 1 },
  { name: 'Bonga', country: 'Nigeria', lat: 4.45, lng: 4.55, production: 200000, type: 'deepwater', reserves: 1.3 },

  // ANGOLA
  { name: 'Dalia', country: 'Angola', lat: -7.20, lng: 11.50, production: 240000, type: 'deepwater', reserves: 1 },
  { name: 'Girassol', country: 'Angola', lat: -7.50, lng: 11.80, production: 200000, type: 'deepwater', reserves: 0.8 },

  // KAZAKHSTAN
  { name: 'Kashagan', country: 'Kazakhstan', lat: 46.20, lng: 51.40, production: 400000, type: 'offshore', reserves: 13 },
  { name: 'Tengiz', country: 'Kazakhstan', lat: 46.22, lng: 53.33, production: 600000, type: 'onshore', reserves: 6 },

  // CANADA
  { name: 'Athabasca Oil Sands', country: 'Canada', lat: 57.00, lng: -111.50, production: 3200000, type: 'onshore', reserves: 166 },
  { name: 'Hibernia', country: 'Canada', lat: 46.75, lng: -48.78, production: 120000, type: 'offshore', reserves: 1.4 },

  // NORWAY
  { name: 'Johan Sverdrup', country: 'Norway', lat: 58.83, lng: 2.53, production: 755000, type: 'offshore', reserves: 2.7 },
  { name: 'Troll', country: 'Norway', lat: 60.64, lng: 3.72, production: 180000, type: 'offshore', reserves: 1.3 },

  // GUYANA
  { name: 'Stabroek Block (Liza)', country: 'Guyana', lat: 7.60, lng: -57.00, production: 640000, type: 'deepwater', reserves: 11 },

  // CHINA
  { name: 'Daqing', country: 'China', lat: 46.60, lng: 125.00, production: 700000, type: 'onshore', reserves: 4 },
  { name: 'Changqing', country: 'China', lat: 37.80, lng: 108.80, production: 900000, type: 'onshore', reserves: 5 },
];
