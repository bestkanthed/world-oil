'use client';

import { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import NewsFeed from './NewsFeed';
import PricePanel from './PricePanel';
import PredictionPanel from './PredictionPanel';
import SupplyStats from './SupplyStats';
import { priceHistory, ForecastHorizon } from '@/data/news-events';

const WorldMap = dynamic(() => import('./WorldMap'), { ssr: false });

type BottomTab = 'price' | 'predictions';

export default function Dashboard() {
  const [bottomTab, setBottomTab] = useState<BottomTab>('price');
  const [horizon, setHorizon] = useState<ForecastHorizon>('1M');
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);

  // Resizable panel sizes
  const [leftWidth, setLeftWidth] = useState(340);
  const [rightWidth, setRightWidth] = useState(420);
  const [bottomHeight, setBottomHeight] = useState(280);

  const dragging = useRef<'left' | 'right' | 'bottom' | null>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef(0);

  const handleMouseDown = useCallback(
    (panel: 'left' | 'right' | 'bottom', e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = panel;
      startPos.current = { x: e.clientX, y: e.clientY };
      startSize.current =
        panel === 'left' ? leftWidth : panel === 'right' ? rightWidth : bottomHeight;

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragging.current) return;
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;

        if (dragging.current === 'left') {
          setLeftWidth(Math.max(220, Math.min(600, startSize.current + dx)));
        } else if (dragging.current === 'right') {
          setRightWidth(Math.max(280, Math.min(700, startSize.current - dx)));
        } else if (dragging.current === 'bottom') {
          setBottomHeight(Math.max(160, Math.min(600, startSize.current - dy)));
        }
      };

      const handleMouseUp = () => {
        dragging.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.body.style.cursor =
        panel === 'bottom' ? 'row-resize' : 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [leftWidth, rightWidth, bottomHeight]
  );

  const latestActual = priceHistory.filter((p) => !p.predicted);
  const wti = latestActual[latestActual.length - 1]?.wti || 0;
  const brent = latestActual[latestActual.length - 1]?.brent || 0;
  const prevWti = latestActual[latestActual.length - 2]?.wti || 0;
  const prevBrent = latestActual[latestActual.length - 2]?.brent || 0;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-oil-dark">
      {/* Top header bar */}
      <header className="h-12 flex items-center justify-between px-5 border-b border-oil-border bg-oil-panel/80 backdrop-blur-xl z-50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-oil-amber to-oil-red flex items-center justify-center">
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
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-slate-500">Spread</span>
            <span className="text-oil-gold font-bold font-mono">
              ${(brent - wti).toFixed(2)}
            </span>
          </div>
          <div className="h-5 w-px bg-oil-border" />
          {/* Forecast horizon selector */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-500 uppercase mr-1">Forecast</span>
            {(['1W', '1M', '1Y'] as ForecastHorizon[]).map((h) => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded transition-colors ${
                  horizon === h
                    ? 'bg-oil-blue/20 text-oil-blue border border-oil-blue/30'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-400 font-semibold uppercase">
              Systems Online
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Supply Stats */}
        <aside
          style={{ width: leftCollapsed ? 0 : leftWidth }}
          className="border-r border-oil-border bg-oil-panel/50 flex-shrink-0 overflow-hidden transition-[width] duration-200"
        >
          <SupplyStats />
        </aside>

        {/* Left resize handle */}
        {!leftCollapsed && (
          <div
            className="w-1.5 flex-shrink-0 cursor-col-resize bg-oil-dark hover:bg-oil-amber/30 transition-colors relative group z-20"
            onMouseDown={(e) => handleMouseDown('left', e)}
          >
            <div className="absolute inset-y-0 -left-1 -right-1" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-slate-600 rounded group-hover:bg-oil-amber transition-colors" />
          </div>
        )}

        {/* Left collapse toggle */}
        <button
          onClick={() => setLeftCollapsed(!leftCollapsed)}
          className="w-5 flex-shrink-0 flex items-center justify-center bg-oil-dark/80 border-r border-oil-border hover:bg-oil-panel transition-colors z-10"
          title={leftCollapsed ? 'Show Supply Stats' : 'Hide Supply Stats'}
        >
          <span className="text-slate-500 text-[10px] hover:text-slate-300">
            {leftCollapsed ? '\u25B6' : '\u25C0'}
          </span>
        </button>

        {/* Center - Map + Bottom panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative">
            <WorldMap />
          </div>

          {/* Bottom resize handle */}
          <div
            className="h-1.5 flex-shrink-0 cursor-row-resize bg-oil-dark hover:bg-oil-amber/30 transition-colors relative group z-20"
            onMouseDown={(e) => handleMouseDown('bottom', e)}
          >
            <div className="absolute -top-1 -bottom-1 inset-x-0" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-8 bg-slate-600 rounded group-hover:bg-oil-amber transition-colors" />
          </div>

          {/* Bottom panel */}
          <div
            style={{ height: bottomHeight }}
            className="border-t border-oil-border bg-oil-panel/50 flex-shrink-0 flex flex-col"
          >
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
              <div className="flex-1" />
              <span className="text-[9px] text-slate-600 pr-3">
                Drag edge to resize
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              {bottomTab === 'price' && <PricePanel horizon={horizon} />}
              {bottomTab === 'predictions' && (
                <PredictionPanel horizon={horizon} />
              )}
            </div>
          </div>
        </div>

        {/* Right collapse toggle */}
        <button
          onClick={() => setRightCollapsed(!rightCollapsed)}
          className="w-5 flex-shrink-0 flex items-center justify-center bg-oil-dark/80 border-l border-oil-border hover:bg-oil-panel transition-colors z-10"
          title={rightCollapsed ? 'Show News' : 'Hide News'}
        >
          <span className="text-slate-500 text-[10px] hover:text-slate-300">
            {rightCollapsed ? '\u25C0' : '\u25B6'}
          </span>
        </button>

        {/* Right resize handle */}
        {!rightCollapsed && (
          <div
            className="w-1.5 flex-shrink-0 cursor-col-resize bg-oil-dark hover:bg-oil-amber/30 transition-colors relative group z-20"
            onMouseDown={(e) => handleMouseDown('right', e)}
          >
            <div className="absolute inset-y-0 -left-1 -right-1" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-slate-600 rounded group-hover:bg-oil-amber transition-colors" />
          </div>
        )}

        {/* Right panel - News */}
        <aside
          style={{ width: rightCollapsed ? 0 : rightWidth }}
          className="border-l border-oil-border bg-oil-panel/50 flex-shrink-0 overflow-hidden transition-[width] duration-200"
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
