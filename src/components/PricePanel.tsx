'use client';

import { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { getPriceDataForHorizon, priceHistory, ForecastHorizon } from '@/data/news-events';

type Benchmark = 'wti' | 'brent';

export default function PricePanel({ horizon }: { horizon: ForecastHorizon }) {
  const [benchmark, setBenchmark] = useState<Benchmark>('brent');

  const rawData = useMemo(() => getPriceDataForHorizon(horizon), [horizon]);

  const data = useMemo(() => {
    return rawData.map((p) => ({
      date: p.date,
      price: benchmark === 'brent' ? p.brent : p.wti,
      predicted: p.predicted || false,
    }));
  }, [rawData, benchmark]);

  const actualData = data.filter((d) => !d.predicted);
  const predictedData = data.filter((d) => d.predicted);

  const currentPrice = actualData[actualData.length - 1]?.price || 0;
  const previousPrice = actualData[actualData.length - 2]?.price || 0;
  const change = currentPrice - previousPrice;
  const changePercent = previousPrice ? ((change / previousPrice) * 100).toFixed(2) : '0';
  const isUp = change >= 0;

  const allPrices = data.map((d) => d.price);
  const minPrice = Math.floor(Math.min(...allPrices) - 3);
  const maxPrice = Math.ceil(Math.max(...allPrices) + 3);

  const todayDate = '2026-03-19';

  // For bridging actual → predicted line
  const bridgedData = useMemo(() => {
    if (actualData.length === 0 || predictedData.length === 0) return data;
    const lastActual = actualData[actualData.length - 1];
    // Mark the last actual point as also appearing in predicted
    return data.map((d) => ({
      ...d,
      actualPrice: d.predicted ? (d.date === predictedData[0]?.date ? null : null) : d.price,
      predictedPrice: d.predicted ? d.price : (d === lastActual ? d.price : null),
    }));
  }, [data, actualData, predictedData]);

  const horizonLabel = horizon === '1W' ? '1 Week' : horizon === '1M' ? '1 Month' : '1 Year';
  const forecastEnd = predictedData.length > 0 ? predictedData[predictedData.length - 1] : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-oil-border">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Price
          </h2>
          <div className="flex bg-oil-dark rounded overflow-hidden border border-oil-border">
            {(['brent', 'wti'] as Benchmark[]).map((b) => (
              <button
                key={b}
                onClick={() => setBenchmark(b)}
                className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider transition-colors ${
                  benchmark === b
                    ? 'bg-oil-amber/20 text-oil-amber'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-oil-blue/10 text-oil-blue border border-oil-blue/20 font-bold">
            {horizonLabel} Forecast
          </span>
        </div>

        {/* Current price */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xl font-bold tabular-nums">
              ${currentPrice.toFixed(2)}
            </div>
          </div>
          <div
            className={`text-xs font-bold px-2 py-1 rounded ${
              isUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}
          >
            {isUp ? '+' : ''}{change.toFixed(2)} ({isUp ? '+' : ''}{changePercent}%)
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 px-2 py-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={bridgedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff6b35" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#475569', fontSize: 10 }}
              tickFormatter={(v) => {
                const d = new Date(v);
                if (horizon === '1Y') {
                  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                }
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              tick={{ fill: '#475569', fontSize: 10 }}
              tickFormatter={(v) => `$${v}`}
              axisLine={false}
              tickLine={false}
              width={45}
            />
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
              labelStyle={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}
              itemStyle={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}
              formatter={(value: number | null, name: string) => {
                if (value === null) return [null, null];
                return [
                  `$${value.toFixed(2)}`,
                  name === 'actualPrice' ? benchmark.toUpperCase() : `Predicted (${horizonLabel})`,
                ];
              }}
              labelFormatter={(label) => {
                const d = new Date(label);
                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              }}
            />
            <ReferenceLine
              x={todayDate}
              stroke="#475569"
              strokeDasharray="4 4"
              label={{ value: 'TODAY', fill: '#64748b', fontSize: 9, position: 'insideTopRight' }}
            />
            <Area
              type="monotone"
              dataKey="actualPrice"
              stroke="#ff6b35"
              strokeWidth={2}
              fill="url(#priceGrad)"
              dot={false}
              connectNulls={false}
              name="actualPrice"
            />
            <Area
              type="monotone"
              dataKey="predictedPrice"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="6 3"
              fill="url(#predGrad)"
              dot={false}
              connectNulls
              name="predictedPrice"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Quick stats */}
      <div className="flex gap-4 px-4 py-2 border-t border-oil-border text-[10px] flex-shrink-0">
        <div>
          <span className="text-slate-500">Spread</span>
          <span className="ml-1 text-oil-gold font-bold">
            ${(priceHistory.filter((p) => !p.predicted).slice(-1)[0].brent - priceHistory.filter((p) => !p.predicted).slice(-1)[0].wti).toFixed(2)}
          </span>
        </div>
        <div>
          <span className="text-slate-500">History Range</span>
          <span className="ml-1 text-slate-300 font-mono">
            ${Math.min(...actualData.map((d) => d.price)).toFixed(0)}-${Math.max(...actualData.map((d) => d.price)).toFixed(0)}
          </span>
        </div>
        <div>
          <span className="text-slate-500">Forecast End</span>
          <span className="ml-1 text-blue-400 font-bold">
            {forecastEnd ? `$${forecastEnd.price.toFixed(0)}` : '—'}
          </span>
        </div>
        <div>
          <span className="text-slate-500">Horizon</span>
          <span className="ml-1 text-oil-blue font-bold">{horizonLabel}</span>
        </div>
      </div>
    </div>
  );
}
