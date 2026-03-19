'use client';

import { useState } from 'react';
import { newsEvents } from '@/data/news-events';
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

  const filtered = filter === 'all'
    ? newsEvents
    : newsEvents.filter((e) => e.category === filter);

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-oil-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Live Intel
          </h2>
          <span className="flex items-center gap-1.5 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-semibold">LIVE</span>
          </span>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-1">
          {['all', 'conflict', 'geopolitical', 'supply', 'demand', 'policy'].map((cat) => (
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
            </button>
          ))}
        </div>
      </div>

      {/* News items */}
      <div className="flex-1 overflow-y-auto">
        {sorted.map((event) => (
          <NewsItem
            key={event.id}
            event={event}
            expanded={expandedId === event.id}
            onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
          />
        ))}
      </div>

      {/* Impact summary */}
      <div className="px-4 py-2 border-t border-oil-border bg-oil-dark/50">
        <div className="flex justify-between text-[10px]">
          <span className="text-green-400 font-semibold">
            {newsEvents.filter((e) => e.impact === 'bullish').length} Bullish
          </span>
          <span className="text-slate-400 font-semibold">
            {newsEvents.filter((e) => e.impact === 'neutral').length} Neutral
          </span>
          <span className="text-red-400 font-semibold">
            {newsEvents.filter((e) => e.impact === 'bearish').length} Bearish
          </span>
        </div>
        <div className="mt-1 h-1.5 rounded-full bg-slate-800 flex overflow-hidden">
          <div
            className="bg-green-500 transition-all"
            style={{
              width: `${(newsEvents.filter((e) => e.impact === 'bullish').length / newsEvents.length) * 100}%`,
            }}
          />
          <div
            className="bg-slate-500 transition-all"
            style={{
              width: `${(newsEvents.filter((e) => e.impact === 'neutral').length / newsEvents.length) * 100}%`,
            }}
          />
          <div
            className="bg-red-500 transition-all"
            style={{
              width: `${(newsEvents.filter((e) => e.impact === 'bearish').length / newsEvents.length) * 100}%`,
            }}
          />
        </div>
        <div className="text-[10px] text-slate-500 mt-1 text-center">
          Net Signal: <span className="text-green-400 font-bold">BULLISH</span>
        </div>
      </div>
    </div>
  );
}

function NewsItem({
  event,
  expanded,
  onToggle,
}: {
  event: NewsEvent;
  expanded: boolean;
  onToggle: () => void;
}) {
  const impact = impactColors[event.impact];
  const icon = categoryIcons[event.category] || '\u25CF';

  return (
    <div
      className={`border-b border-oil-border/50 cursor-pointer transition-colors hover:bg-white/[0.02] ${
        expanded ? 'bg-white/[0.03]' : ''
      }`}
      onClick={onToggle}
    >
      <div className="px-4 py-3">
        {/* Header row */}
        <div className="flex items-start gap-2">
          <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${impact.bg} ${impact.text} border ${impact.border}`}>
                {impact.label}
              </span>
              <span className="text-[9px] text-slate-600">{event.date}</span>
              <div className="flex gap-0.5 ml-auto">
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
            <h3 className="text-xs font-semibold text-slate-200 leading-snug">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-3 ml-6 space-y-2">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {event.summary}
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] px-2 py-0.5 rounded bg-oil-panel border border-oil-border text-slate-400">
                {event.region}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-oil-panel border border-oil-border text-oil-gold">
                Price: {event.priceImpact}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
