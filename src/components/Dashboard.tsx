'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import NewsFeed from './NewsFeed';
import PricePanel from './PricePanel';
import PredictionPanel from './PredictionPanel';
import SupplyStats from './SupplyStats';
import { priceHistory } from '@/data/news-events';

const WorldMap = dynamic(() => import('./WorldMap'), { ssr: false });

type BottomTab = 'price' | 'predictions';

export default function Dashboard() {
  const [bottomTab, setBottomTab] = useState<BottomTab>('price');
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);

  const latestActual = priceHistory.filter((p) => !p.predicted);
  const wti = latestActual[latestActual.length - 1]?.wti || 0;
  const brent = latestActual[latestActual.length - 1]?.brent || 0;
  const prevWti = latestActual[latestActual.length - 2]?.wti || 0;
  const prevBrent = latestActual[latestActual.length - 2]?.brent || 0;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-oil-dark">
      {/* Top header bar */}
      <header className="h-11 flex items-center justify-between px-4 border-b border-oil-border bg-oil-panel/80 backdrop-blur-xl z-50 flex-shrink-0">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-oil-amber to-oil-red flex items-center justify-center">
            <span className="text-white text-sm font-black">O</span>
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white leading-none">
              OIL SUPPLY INTELLIGENCE
            </h1>
            <p className="text-[9px] text-slate-500 tracking-widest uppercase">
              Global Energy Map & Price Predictor
            </p>
          </div>
        </div>

        {/* Center - Price ticker */}
        <div className="flex items-center gap-6">
          <PriceTicker label="WTI" price={wti} prev={prevWti} />
          <PriceTicker label="BRENT" price={brent} prev={prevBrent} />
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="text-slate-500">Spread</span>
            <span className="text-oil-gold font-bold font-mono">${(brent - wti).toFixed(2)}</span>
          </div>
        </div>

        {/* Right - Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-400 font-semibold uppercase">Systems Online</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Supply Stats */}
        <aside
          className={`border-r border-oil-border bg-oil-panel/50 transition-all flex-shrink-0 overflow-hidden ${
            leftCollapsed ? 'w-0' : 'w-[240px]'
          }`}
        >
          <SupplyStats />
        </aside>

        {/* Left collapse toggle */}
        <button
          onClick={() => setLeftCollapsed(!leftCollapsed)}
          className="w-4 flex-shrink-0 flex items-center justify-center bg-oil-dark border-x border-oil-border hover:bg-oil-panel transition-colors z-10"
          title={leftCollapsed ? 'Show Supply Stats' : 'Hide Supply Stats'}
        >
          <span className="text-slate-600 text-[10px]">{leftCollapsed ? '\u25B6' : '\u25C0'}</span>
        </button>

        {/* Center - Map + Bottom panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Map */}
          <div className="flex-1 relative">
            <WorldMap />
          </div>

          {/* Bottom panel */}
          <div className="h-[200px] border-t border-oil-border bg-oil-panel/50 flex-shrink-0 flex flex-col">
            {/* Bottom tabs */}
            <div className="flex items-center border-b border-oil-border/50">
              {[
                { key: 'price' as const, label: 'Price Chart' },
                { key: 'predictions' as const, label: 'Predictions' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setBottomTab(tab.key)}
                  className={`px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold border-b-2 transition-colors ${
                    bottomTab === tab.key
                      ? 'border-oil-amber text-oil-amber'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-hidden">
              {bottomTab === 'price' && <PricePanel />}
              {bottomTab === 'predictions' && <PredictionPanel />}
            </div>
          </div>
        </div>

        {/* Right collapse toggle */}
        <button
          onClick={() => setRightCollapsed(!rightCollapsed)}
          className="w-4 flex-shrink-0 flex items-center justify-center bg-oil-dark border-x border-oil-border hover:bg-oil-panel transition-colors z-10"
          title={rightCollapsed ? 'Show News' : 'Hide News'}
        >
          <span className="text-slate-600 text-[10px]">{rightCollapsed ? '\u25C0' : '\u25B6'}</span>
        </button>

        {/* Right panel - News */}
        <aside
          className={`border-l border-oil-border bg-oil-panel/50 transition-all flex-shrink-0 overflow-hidden ${
            rightCollapsed ? 'w-0' : 'w-[330px]'
          }`}
        >
          <NewsFeed />
        </aside>
      </div>
    </div>
  );
}

function PriceTicker({
  label,
  price,
  prev,
}: {
  label: string;
  price: number;
  prev: number;
}) {
  const change = price - prev;
  const isUp = change >= 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-slate-500 font-bold">{label}</span>
      <span className="text-sm font-bold text-white tabular-nums font-mono">
        ${price.toFixed(2)}
      </span>
      <span
        className={`text-[10px] font-bold tabular-nums ${
          isUp ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {isUp ? '\u25B2' : '\u25BC'} {Math.abs(change).toFixed(2)}
      </span>
    </div>
  );
}
