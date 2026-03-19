'use client';

import { countries } from '@/data/countries';
import { refineries } from '@/data/refineries';
import { tradeFlows } from '@/data/trade-flows';

export default function SupplyStats() {
  const topProducers = [...countries]
    .sort((a, b) => b.production - a.production)
    .slice(0, 10);

  const topConsumers = [...countries]
    .sort((a, b) => b.consumption - a.consumption)
    .slice(0, 8);

  const totalProduction = countries.reduce((sum, c) => sum + c.production, 0);
  const totalConsumption = countries.reduce((sum, c) => sum + c.consumption, 0);
  const totalRefiningCapacity = refineries.reduce((sum, r) => sum + r.capacity, 0);
  const totalTradeVolume = tradeFlows.reduce((sum, f) => sum + f.volume, 0);

  const regionBreakdown = refineries.reduce(
    (acc, r) => {
      acc[r.region] = (acc[r.region] || 0) + r.capacity;
      return acc;
    },
    {} as Record<string, number>
  );

  const maxProduction = topProducers[0]?.production || 1;
  const maxConsumption = topConsumers[0]?.consumption || 1;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Global Summary */}
      <div className="px-4 py-3 border-b border-oil-border">
        <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-3">
          Global Supply
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <StatBox label="Production" value={`${totalProduction.toFixed(1)}M`} unit="bpd" color="text-oil-green" />
          <StatBox label="Consumption" value={`${totalConsumption.toFixed(1)}M`} unit="bpd" color="text-oil-red" />
          <StatBox
            label="Refining Cap."
            value={`${(totalRefiningCapacity / 1000000).toFixed(1)}M`}
            unit="bpd"
            color="text-oil-amber"
          />
          <StatBox
            label="Trade Volume"
            value={`${(totalTradeVolume / 1000).toFixed(1)}M`}
            unit="bpd"
            color="text-oil-gold"
          />
        </div>

        {/* Supply/Demand balance */}
        <div className="mt-3">
          <div className="flex justify-between text-[9px] text-slate-500 mb-1">
            <span>Supply/Demand Balance</span>
            <span className={totalProduction > totalConsumption ? 'text-green-400' : 'text-red-400'}>
              {totalProduction > totalConsumption ? 'SURPLUS' : 'DEFICIT'}{' '}
              {Math.abs(totalProduction - totalConsumption).toFixed(1)}M bpd
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 relative">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-oil-green/60"
              style={{ width: `${(totalProduction / (totalProduction + totalConsumption)) * 100}%` }}
            />
            <div
              className="absolute right-0 top-0 h-full rounded-full bg-oil-red/60"
              style={{ width: `${(totalConsumption / (totalProduction + totalConsumption)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Producers */}
      <div className="px-4 py-3 border-b border-oil-border">
        <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
          Top Producers
        </h3>
        <div className="space-y-1.5">
          {topProducers.map((c, i) => (
            <div key={c.code} className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-600 w-3 text-right font-mono">{i + 1}</span>
              <span className="w-5 text-center text-xs">{countryFlag(c.code)}</span>
              <span className="flex-1 text-slate-300 truncate">{c.name}</span>
              <div className="w-20 h-1.5 rounded-full bg-slate-800 relative">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-oil-green"
                  style={{ width: `${(c.production / maxProduction) * 100}%` }}
                />
              </div>
              <span className="text-oil-green font-mono font-bold w-10 text-right">
                {c.production.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Consumers */}
      <div className="px-4 py-3 border-b border-oil-border">
        <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
          Top Consumers
        </h3>
        <div className="space-y-1.5">
          {topConsumers.map((c, i) => (
            <div key={c.code} className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-600 w-3 text-right font-mono">{i + 1}</span>
              <span className="w-5 text-center text-xs">{countryFlag(c.code)}</span>
              <span className="flex-1 text-slate-300 truncate">{c.name}</span>
              <div className="w-20 h-1.5 rounded-full bg-slate-800 relative">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-oil-red"
                  style={{ width: `${(c.consumption / maxConsumption) * 100}%` }}
                />
              </div>
              <span className="text-oil-red font-mono font-bold w-10 text-right">
                {c.consumption.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Refining by Region */}
      <div className="px-4 py-3 border-b border-oil-border">
        <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
          Refining Capacity by Region
        </h3>
        <div className="space-y-1.5">
          {Object.entries(regionBreakdown)
            .sort((a, b) => b[1] - a[1])
            .map(([region, capacity]) => (
              <div key={region} className="flex items-center gap-2 text-[11px]">
                <span className="flex-1 text-slate-300">{region}</span>
                <div className="w-24 h-1.5 rounded-full bg-slate-800 relative">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-oil-amber"
                    style={{
                      width: `${(capacity / Math.max(...Object.values(regionBreakdown))) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-oil-amber font-mono font-bold w-12 text-right text-[10px]">
                  {(capacity / 1000000).toFixed(1)}M
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Key metrics */}
      <div className="px-4 py-3">
        <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
          Key Metrics
        </h3>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-500">OPEC+ Spare Capacity</span>
            <span className="text-oil-gold font-bold">~3.5M bpd</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">US SPR Level</span>
            <span className="text-oil-red font-bold">372M bbl</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Global Inventories</span>
            <span className="text-slate-300 font-bold">Below 5yr avg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Floating Storage</span>
            <span className="text-slate-300 font-bold">~65M bbl</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Days of Supply</span>
            <span className="text-oil-gold font-bold">~57 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div className="bg-oil-dark/50 rounded-lg px-3 py-2">
      <div className="text-[9px] uppercase text-slate-500 tracking-wider">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className={`text-base font-bold tabular-nums ${color}`}>{value}</span>
        <span className="text-[9px] text-slate-500">{unit}</span>
      </div>
    </div>
  );
}

function countryFlag(code: string): string {
  const offset = 127397;
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(c.charCodeAt(0) + offset)).join('');
}
