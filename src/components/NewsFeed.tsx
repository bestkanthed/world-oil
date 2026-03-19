'use client';

import { useState } from 'react';
import { newsEvents as staticEvents } from '@/data/news-events';
import { NewsEvent } from '@/lib/types';

const categoryIcons: Record<string, string> = {
  geopolitical: '\u26A0',
  supply: '\u2699',
  demand: '\u2197',
  policy: '\u2696',
  weather: '\u26C8',
  conflict: '\u2694',
};

const impactColors = {
  bullish: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'BULLISH' },
  bearish: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'BEARISH' },
  neutral: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30', label: 'NEUTRAL' },
};

export default function NewsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [liveEvents, setLiveEvents] = useState<NewsEvent[]>([]);
  const [fetching, setFetching] = useState(false);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const allEvents = [...liveEvents, ...staticEvents];

  // Deduplicate by id
  const deduped = allEvents.filter(
    (e, i, arr) => arr.findIndex((x) => x.id === e.id) === i
  );

  const filtered = filter === 'all'
    ? deduped
    : deduped.filter((e) => e.category === filter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const bullishCount = deduped.filter((e) => e.impact === 'bullish').length;
  const bearishCount = deduped.filter((e) => e.impact === 'bearish').length;
  const neutralCount = deduped.filter((e) => e.impact === 'neutral').length;
  const total = deduped.length;

  async function fetchLatestNews() {
    setFetching(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          existingIds: deduped.map((e) => e.id),
        }),
      });
      const data = await res.json();
      if (data.events && Array.isArray(data.events)) {
        setLiveEvents((prev) => [...data.events, ...prev]);
      }
      setLastFetched(new Date().toLocaleTimeString());
    } catch {
      // silently fail
    } finally {
      setFetching(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-oil-border flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Live Intel
          </h2>
          <div className="flex items-center gap-2">
            {lastFetched && (
              <span className="text-[9px] text-slate-600">
                Updated {lastFetched}
              </span>
            )}
            <button
              onClick={fetchLatestNews}
              disabled={fetching}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase bg-oil-amber/10 text-oil-amber border border-oil-amber/30 rounded hover:bg-oil-amber/20 transition-colors disabled:opacity-50"
            >
              {fetching ? (
                <>
                  <span className="w-2.5 h-2.5 border border-oil-amber border-t-transparent rounded-full animate-spin" />
                  Fetching...
                </>
              ) : (
                'Fetch Latest'
              )}
            </button>
            <span className="flex items-center gap-1 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 font-semibold">LIVE</span>
            </span>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-1">
          {['all', 'conflict', 'geopolitical', 'supply', 'demand', 'policy', 'weather'].map(
            (cat) => {
              const count = cat === 'all' ? total : deduped.filter((e) => e.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded transition-colors ${
                    filter === cat
                      ? 'bg-oil-amber/20 text-oil-amber border border-oil-amber/30'
                      : 'text-slate-500 hover:text-slate-300 border border-transparent'
                  }`}
                >
                  {cat}
                  {count > 0 && (
                    <span className="ml-1 text-[8px] opacity-60">{count}</span>
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Event count */}
      <div className="px-4 py-1.5 text-[10px] text-slate-600 border-b border-oil-border/30 flex-shrink-0">
        Showing {sorted.length} of {total} events
      </div>

      {/* News items */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {sorted.map((event) => (
          <NewsItem
            key={event.id}
            event={event}
            isLive={liveEvents.some((e) => e.id === event.id)}
            expanded={expandedId === event.id}
            onToggle={() =>
              setExpandedId(expandedId === event.id ? null : event.id)
            }
          />
        ))}
      </div>

      {/* Impact summary */}
      <div className="px-4 py-2.5 border-t border-oil-border bg-oil-dark/50 flex-shrink-0">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-green-400 font-semibold">
            {bullishCount} Bullish
          </span>
          <span className="text-slate-400 font-semibold">
            {neutralCount} Neutral
          </span>
          <span className="text-red-400 font-semibold">
            {bearishCount} Bearish
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-800 flex overflow-hidden">
          <div
            className="bg-green-500 transition-all"
            style={{ width: `${(bullishCount / total) * 100}%` }}
          />
          <div
            className="bg-slate-500 transition-all"
            style={{ width: `${(neutralCount / total) * 100}%` }}
          />
          <div
            className="bg-red-500 transition-all"
            style={{ width: `${(bearishCount / total) * 100}%` }}
          />
        </div>
        <div className="text-[10px] text-slate-500 mt-1 text-center">
          Net Signal:{' '}
          <span
            className={`font-bold ${
              bullishCount > bearishCount + neutralCount
                ? 'text-green-400'
                : bullishCount > bearishCount
                ? 'text-oil-gold'
                : 'text-red-400'
            }`}
          >
            {bullishCount > bearishCount + neutralCount
              ? 'STRONGLY BULLISH'
              : bullishCount > bearishCount
              ? 'BULLISH'
              : 'MIXED'}
          </span>
        </div>
      </div>
    </div>
  );
}

function NewsItem({
  event,
  isLive,
  expanded,
  onToggle,
}: {
  event: NewsEvent;
  isLive: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const impact = impactColors[event.impact];
  const icon = categoryIcons[event.category] || '\u25CF';

  return (
    <div
      className={`border-b border-oil-border/50 cursor-pointer transition-colors hover:bg-white/[0.03] ${
        expanded ? 'bg-white/[0.04]' : ''
      } ${isLive ? 'border-l-2 border-l-oil-amber' : ''}`}
      onClick={onToggle}
    >
      <div className="px-4 py-3">
        <div className="flex items-start gap-2">
          <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {isLive && (
                <span className="text-[8px] px-1 py-0.5 rounded font-bold uppercase bg-oil-amber/20 text-oil-amber border border-oil-amber/30">
                  NEW
                </span>
              )}
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${impact.bg} ${impact.text} border ${impact.border}`}
              >
                {impact.label}
              </span>
              <span className="text-[9px] text-slate-600">{event.date}</span>
              <span className="text-[9px] text-slate-600 uppercase">{event.region}</span>
              <div className="flex gap-0.5 ml-auto flex-shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 h-3 rounded-sm ${
                      i < event.severity ? 'bg-oil-red' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-[12px] font-semibold text-slate-200 leading-snug">
              {event.title}
            </h3>

            {/* Always show price impact */}
            <div className="mt-1">
              <span className="text-[10px] text-oil-gold font-medium">
                {event.priceImpact}
              </span>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="mt-3 ml-7 space-y-2">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {event.summary}
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] px-2 py-0.5 rounded bg-oil-panel border border-oil-border text-slate-400 uppercase">
                {event.category}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-oil-panel border border-oil-border text-slate-400">
                {event.region}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
