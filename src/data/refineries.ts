import { Refinery } from '@/lib/types';

export const refineries: Refinery[] = [
  // INDIA
  { name: 'Jamnagar Refinery', company: 'Reliance Industries', country: 'India', lat: 22.47, lng: 70.07, capacity: 1240000, region: 'Asia' },
  { name: 'Jamnagar SEZ Refinery', company: 'Reliance Industries', country: 'India', lat: 22.44, lng: 70.02, capacity: 580000, region: 'Asia' },
  { name: 'Mangalore Refinery', company: 'MRPL', country: 'India', lat: 12.92, lng: 74.82, capacity: 310000, region: 'Asia' },
  { name: 'Koyali Refinery', company: 'IOCL', country: 'India', lat: 22.34, lng: 73.18, capacity: 274000, region: 'Asia' },
  { name: 'Panipat Refinery', company: 'IOCL', country: 'India', lat: 29.39, lng: 76.97, capacity: 300000, region: 'Asia' },
  { name: 'Paradip Refinery', company: 'IOCL', country: 'India', lat: 20.26, lng: 86.61, capacity: 300000, region: 'Asia' },
  { name: 'Mumbai Refinery', company: 'BPCL', country: 'India', lat: 19.02, lng: 72.85, capacity: 240000, region: 'Asia' },
  { name: 'Visakhapatnam Refinery', company: 'HPCL', country: 'India', lat: 17.69, lng: 83.22, capacity: 166000, region: 'Asia' },

  // SOUTH KOREA
  { name: 'Ulsan Refinery', company: 'SK Innovation', country: 'South Korea', lat: 35.55, lng: 129.31, capacity: 840000, region: 'Asia' },
  { name: 'Yeosu Refinery', company: 'GS Caltex', country: 'South Korea', lat: 34.74, lng: 127.74, capacity: 800000, region: 'Asia' },
  { name: 'Onsan Refinery', company: 'S-Oil', country: 'South Korea', lat: 35.45, lng: 129.35, capacity: 669000, region: 'Asia' },
  { name: 'Daesan Refinery', company: 'Hyundai Oilbank', country: 'South Korea', lat: 36.95, lng: 126.35, capacity: 520000, region: 'Asia' },

  // VENEZUELA
  { name: 'Paraguana Refinery Complex', company: 'PDVSA', country: 'Venezuela', lat: 11.75, lng: -70.21, capacity: 940000, region: 'LatAm' },
  { name: 'Puerto La Cruz Refinery', company: 'PDVSA', country: 'Venezuela', lat: 10.22, lng: -64.63, capacity: 200000, region: 'LatAm' },

  // UAE
  { name: 'Ruwais Refinery', company: 'ADNOC', country: 'UAE', lat: 24.11, lng: 52.73, capacity: 837000, region: 'MiddleEast' },
  { name: 'Jebel Ali Refinery', company: 'ENOC', country: 'UAE', lat: 25.01, lng: 55.06, capacity: 210000, region: 'MiddleEast' },

  // SAUDI ARABIA
  { name: 'Ras Tanura Refinery', company: 'Saudi Aramco', country: 'Saudi Arabia', lat: 26.64, lng: 50.15, capacity: 550000, region: 'MiddleEast' },
  { name: 'Yanbu Refinery', company: 'Saudi Aramco', country: 'Saudi Arabia', lat: 24.09, lng: 38.06, capacity: 400000, region: 'MiddleEast' },
  { name: 'Jubail Refinery (SATORP)', company: 'Saudi Aramco/Total', country: 'Saudi Arabia', lat: 27.01, lng: 49.66, capacity: 400000, region: 'MiddleEast' },
  { name: 'Riyadh Refinery', company: 'Saudi Aramco', country: 'Saudi Arabia', lat: 24.63, lng: 46.72, capacity: 120000, region: 'MiddleEast' },
  { name: 'Jazan Refinery', company: 'Saudi Aramco', country: 'Saudi Arabia', lat: 16.89, lng: 42.57, capacity: 400000, region: 'MiddleEast' },

  // USA
  { name: 'Port Arthur Refinery', company: 'Motiva (Aramco)', country: 'USA', lat: 29.87, lng: -93.93, capacity: 636000, region: 'NorthAm' },
  { name: 'Garyville Refinery', company: 'Marathon Petroleum', country: 'USA', lat: 30.06, lng: -90.62, capacity: 596000, region: 'NorthAm' },
  { name: 'Galveston Bay Refinery', company: 'Marathon Petroleum', country: 'USA', lat: 29.37, lng: -94.90, capacity: 593000, region: 'NorthAm' },
  { name: 'Baytown Refinery', company: 'ExxonMobil', country: 'USA', lat: 29.73, lng: -94.99, capacity: 584000, region: 'NorthAm' },
  { name: 'Baton Rouge Refinery', company: 'ExxonMobil', country: 'USA', lat: 30.50, lng: -91.19, capacity: 520000, region: 'NorthAm' },
  { name: 'Whiting Refinery', company: 'BP', country: 'USA', lat: 41.68, lng: -87.50, capacity: 435000, region: 'NorthAm' },
  { name: 'Lake Charles Refinery', company: 'Phillips 66', country: 'USA', lat: 30.24, lng: -93.26, capacity: 260000, region: 'NorthAm' },
  { name: 'Deer Park Refinery', company: 'Pemex/Shell', country: 'USA', lat: 29.71, lng: -95.12, capacity: 340000, region: 'NorthAm' },
  { name: 'Beaumont Refinery', company: 'ExxonMobil', country: 'USA', lat: 30.08, lng: -94.10, capacity: 369000, region: 'NorthAm' },
  { name: 'Wood River Refinery', company: 'Phillips 66', country: 'USA', lat: 38.86, lng: -90.10, capacity: 314000, region: 'NorthAm' },
  { name: 'Billings Refinery', company: 'Phillips 66', country: 'USA', lat: 45.78, lng: -108.51, capacity: 62000, region: 'NorthAm' },
  { name: 'Anacortes Refinery', company: 'Marathon', country: 'USA', lat: 48.51, lng: -122.61, capacity: 119000, region: 'NorthAm' },
  { name: 'El Segundo Refinery', company: 'Chevron', country: 'USA', lat: 33.91, lng: -118.42, capacity: 269000, region: 'NorthAm' },

  // CHINA
  { name: 'Zhenhai Refinery', company: 'Sinopec', country: 'China', lat: 29.95, lng: 121.72, capacity: 460000, region: 'Asia' },
  { name: 'Dalian PetroChina Refinery', company: 'PetroChina', country: 'China', lat: 38.92, lng: 121.60, capacity: 410000, region: 'Asia' },
  { name: 'Maoming Refinery', company: 'Sinopec', country: 'China', lat: 21.66, lng: 110.92, capacity: 350000, region: 'Asia' },
  { name: 'Qingdao Refinery', company: 'Sinopec', country: 'China', lat: 36.07, lng: 120.38, capacity: 240000, region: 'Asia' },
  { name: 'Guangzhou Refinery', company: 'Sinopec', country: 'China', lat: 23.13, lng: 113.26, capacity: 300000, region: 'Asia' },
  { name: 'Quanzhou Refinery', company: 'Sinochem', country: 'China', lat: 24.87, lng: 118.68, capacity: 280000, region: 'Asia' },
  { name: 'Jinling Refinery', company: 'Sinopec', country: 'China', lat: 32.06, lng: 118.78, capacity: 360000, region: 'Asia' },
  { name: 'Hengli Petrochemical', company: 'Hengli Group', country: 'China', lat: 39.15, lng: 122.48, capacity: 400000, region: 'Asia' },

  // JAPAN
  { name: 'Negishi Refinery', company: 'ENEOS', country: 'Japan', lat: 35.40, lng: 139.64, capacity: 270000, region: 'Asia' },
  { name: 'Chiba Refinery', company: 'ENEOS', country: 'Japan', lat: 35.56, lng: 140.09, capacity: 129000, region: 'Asia' },
  { name: 'Mizushima Refinery', company: 'ENEOS', country: 'Japan', lat: 34.52, lng: 133.73, capacity: 205000, region: 'Asia' },
  { name: 'Sakai Refinery', company: 'Cosmo Oil', country: 'Japan', lat: 34.57, lng: 135.45, capacity: 100000, region: 'Asia' },

  // EUROPE
  { name: 'Shell Pernis Refinery', company: 'Shell', country: 'Netherlands', lat: 51.88, lng: 4.39, capacity: 404000, region: 'Europe' },
  { name: 'Antwerp Refinery', company: 'TotalEnergies', country: 'Belgium', lat: 51.24, lng: 4.30, capacity: 360000, region: 'Europe' },
  { name: 'Fos-sur-Mer Refinery', company: 'Esso (ExxonMobil)', country: 'France', lat: 43.44, lng: 4.94, capacity: 210000, region: 'Europe' },
  { name: 'Schwedt Refinery', company: 'PCK', country: 'Germany', lat: 53.06, lng: 14.28, capacity: 233000, region: 'Europe' },
  { name: 'Leuna Refinery', company: 'TotalEnergies', country: 'Germany', lat: 51.32, lng: 12.01, capacity: 240000, region: 'Europe' },
  { name: 'Göteborg Refinery', company: 'Preem', country: 'Sweden', lat: 57.69, lng: 11.81, capacity: 220000, region: 'Europe' },
  { name: 'Mongstad Refinery', company: 'Equinor', country: 'Norway', lat: 60.81, lng: 5.03, capacity: 200000, region: 'Europe' },
  { name: 'Grangemouth Refinery', company: 'Petroineos', country: 'UK', lat: 56.02, lng: -3.72, capacity: 210000, region: 'Europe' },
  { name: 'Sicilian Refinery', company: 'Eni', country: 'Italy', lat: 37.20, lng: 15.23, capacity: 320000, region: 'Europe' },
  { name: 'Aliaga Refinery (STAR)', company: 'SOCAR/BP', country: 'Turkey', lat: 38.80, lng: 26.96, capacity: 214000, region: 'Europe' },

  // SINGAPORE
  { name: 'Jurong Island Refinery', company: 'ExxonMobil', country: 'Singapore', lat: 1.27, lng: 103.70, capacity: 605000, region: 'Asia' },
  { name: 'Pulau Bukom Refinery', company: 'Shell', country: 'Singapore', lat: 1.23, lng: 103.76, capacity: 500000, region: 'Asia' },

  // IRAN
  { name: 'Abadan Refinery', company: 'NIOC', country: 'Iran', lat: 30.34, lng: 48.30, capacity: 450000, region: 'MiddleEast' },
  { name: 'Isfahan Refinery', company: 'NIOC', country: 'Iran', lat: 32.65, lng: 51.67, capacity: 375000, region: 'MiddleEast' },
  { name: 'Bandar Abbas Refinery', company: 'NIOC', country: 'Iran', lat: 27.19, lng: 56.27, capacity: 320000, region: 'MiddleEast' },
  { name: 'Tehran Refinery', company: 'NIOC', country: 'Iran', lat: 35.64, lng: 51.25, capacity: 250000, region: 'MiddleEast' },

  // IRAQ
  { name: 'Baiji Refinery', company: 'North Refineries Co', country: 'Iraq', lat: 34.93, lng: 43.49, capacity: 310000, region: 'MiddleEast' },
  { name: 'Basra Refinery', company: 'South Refineries Co', country: 'Iraq', lat: 30.51, lng: 47.81, capacity: 210000, region: 'MiddleEast' },

  // RUSSIA
  { name: 'Omsk Refinery', company: 'Gazprom Neft', country: 'Russia', lat: 54.97, lng: 73.37, capacity: 420000, region: 'Europe' },
  { name: 'Kirishi Refinery', company: 'Surgutneftegas', country: 'Russia', lat: 59.45, lng: 32.02, capacity: 387000, region: 'Europe' },
  { name: 'Ryazan Refinery', company: 'Rosneft', country: 'Russia', lat: 54.62, lng: 39.70, capacity: 340000, region: 'Europe' },
  { name: 'Novokuibyshevsk Refinery', company: 'Rosneft', country: 'Russia', lat: 53.10, lng: 49.91, capacity: 310000, region: 'Europe' },
  { name: 'Angarsk Refinery', company: 'Rosneft', country: 'Russia', lat: 52.53, lng: 103.89, capacity: 230000, region: 'Asia' },

  // CANADA
  { name: 'Saint John Refinery', company: 'Irving Oil', country: 'Canada', lat: 45.25, lng: -66.06, capacity: 320000, region: 'NorthAm' },
  { name: 'Edmonton Refinery', company: 'Imperial Oil', country: 'Canada', lat: 53.55, lng: -113.49, capacity: 191000, region: 'NorthAm' },
  { name: 'Montreal Refinery', company: 'Suncor', country: 'Canada', lat: 45.58, lng: -73.50, capacity: 137000, region: 'NorthAm' },

  // BRAZIL
  { name: 'REPLAN Refinery', company: 'Petrobras', country: 'Brazil', lat: -22.77, lng: -47.13, capacity: 434000, region: 'LatAm' },
  { name: 'RLAM Refinery', company: 'Acelen', country: 'Brazil', lat: -12.77, lng: -38.47, capacity: 333000, region: 'LatAm' },
  { name: 'REDUC Refinery', company: 'Petrobras', country: 'Brazil', lat: -22.72, lng: -43.25, capacity: 242000, region: 'LatAm' },

  // TAIWAN
  { name: 'Mailiao Refinery', company: 'Formosa Petrochemical', country: 'Taiwan', lat: 23.79, lng: 120.21, capacity: 540000, region: 'Asia' },
  { name: 'Kaohsiung Refinery', company: 'CPC', country: 'Taiwan', lat: 22.62, lng: 120.31, capacity: 270000, region: 'Asia' },

  // INDONESIA
  { name: 'Balikpapan Refinery', company: 'Pertamina', country: 'Indonesia', lat: -1.27, lng: 116.83, capacity: 260000, region: 'Asia' },
  { name: 'Cilacap Refinery', company: 'Pertamina', country: 'Indonesia', lat: -7.73, lng: 109.01, capacity: 348000, region: 'Asia' },

  // NIGERIA
  { name: 'Dangote Refinery', company: 'Dangote Group', country: 'Nigeria', lat: 6.45, lng: 3.39, capacity: 650000, region: 'Africa' },
  { name: 'Port Harcourt Refinery', company: 'NNPC', country: 'Nigeria', lat: 4.77, lng: 7.01, capacity: 210000, region: 'Africa' },

  // EGYPT
  { name: 'El-Nasr Refinery', company: 'EGPC', country: 'Egypt', lat: 29.87, lng: 32.36, capacity: 146000, region: 'Africa' },

  // KUWAIT
  { name: 'Al Ahmadi Refinery', company: 'KNPC', country: 'Kuwait', lat: 29.08, lng: 48.09, capacity: 466000, region: 'MiddleEast' },
  { name: 'Al Zour Refinery', company: 'KNPC', country: 'Kuwait', lat: 28.73, lng: 48.28, capacity: 615000, region: 'MiddleEast' },

  // MEXICO
  { name: 'Dos Bocas Refinery', company: 'Pemex', country: 'Mexico', lat: 18.43, lng: -93.22, capacity: 340000, region: 'LatAm' },
  { name: 'Tula Refinery', company: 'Pemex', country: 'Mexico', lat: 20.05, lng: -99.35, capacity: 315000, region: 'LatAm' },
  { name: 'Salina Cruz Refinery', company: 'Pemex', country: 'Mexico', lat: 16.17, lng: -95.20, capacity: 330000, region: 'LatAm' },

  // THAILAND
  { name: 'Map Ta Phut Refinery', company: 'PTT GC', country: 'Thailand', lat: 12.71, lng: 101.15, capacity: 280000, region: 'Asia' },
  { name: 'Sriracha Refinery', company: 'Thai Oil', country: 'Thailand', lat: 13.12, lng: 100.93, capacity: 275000, region: 'Asia' },

  // AUSTRALIA
  { name: 'Lytton Refinery', company: 'Ampol', country: 'Australia', lat: -27.42, lng: 153.13, capacity: 109000, region: 'Asia' },
  { name: 'Geelong Refinery', company: 'Viva Energy', country: 'Australia', lat: -38.12, lng: 144.37, capacity: 120000, region: 'Asia' },
];
