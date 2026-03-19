'use client';

import { useState } from 'react';
import { predictions, ForecastHorizon } from '@/data/news-events';

export default function PredictionPanel({ horizon }: { horizon: ForecastHorizon }) {
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const horizonLabel = horizon === '1W' ? '1 Week' : horizon === '1M' ? '1 Month' : '1 Year';
  const horizonPredictions = predictions[horizon];

  async function runAnalysis() {
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'price-prediction', horizon }),
      });
      const data = await res.json();
      setAiAnalysis(data.analysis || data.error);
    } catch {
      setAiAnalysis('Connect your ANTHROPIC_API_KEY in .env.local to enable AI analysis.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-oil-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Predictions
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded bg-oil-blue/10 text-oil-blue border border-oil-blue/20 font-bold">
            {horizonLabel}
          </span>
        </div>
        <button
          onClick={runAnalysis}
          disabled={loading}
          className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-oil-blue/20 text-oil-blue border border-oil-blue/30 rounded hover:bg-oil-blue/30 transition-colors disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'AI Analysis'}
        </button>
      </div>

      {/* Prediction cards */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="grid gap-3" style={{
          gridTemplateColumns: horizonPredictions.length > 2 ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
        }}>
          {horizonPredictions.map((pred, i) => {
            const isUp = pred.direction === 'up';
            const isDown = pred.direction === 'down';

            return (
              <div key={i} className="glass-panel p-3 hover-glow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300">
                    {pred.timeframe}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      isUp
                        ? 'bg-green-500/10 text-green-400'
                        : isDown
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-slate-500/10 text-slate-400'
                    }`}
                  >
                    {pred.direction.toUpperCase()}
                  </span>
                </div>

                {/* Price ranges */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-oil-dark/50 rounded px-2 py-1.5">
                    <div className="text-[9px] text-slate-500 uppercase">WTI Range</div>
                    <div className="text-xs font-mono font-bold text-oil-amber">
                      ${pred.wtiRange[0]}-${pred.wtiRange[1]}
                    </div>
                  </div>
                  <div className="bg-oil-dark/50 rounded px-2 py-1.5">
                    <div className="text-[9px] text-slate-500 uppercase">Brent Range</div>
                    <div className="text-xs font-mono font-bold text-oil-gold">
                      ${pred.brentRange[0]}-${pred.brentRange[1]}
                    </div>
                  </div>
                </div>

                {/* Confidence bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-[9px] mb-0.5">
                    <span className="text-slate-500">Probability</span>
                    <span
                      className={`font-bold ${
                        pred.probability > 0.5
                          ? 'text-green-400'
                          : pred.probability > 0.3
                          ? 'text-oil-gold'
                          : 'text-slate-400'
                      }`}
                    >
                      {(pred.probability * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pred.probability > 0.5
                          ? 'bg-green-500'
                          : pred.probability > 0.3
                          ? 'bg-oil-gold'
                          : 'bg-slate-500'
                      }`}
                      style={{ width: `${pred.probability * 100}%` }}
                    />
                  </div>
                </div>

                {/* Rationale */}
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {pred.rationale}
                </p>
              </div>
            );
          })}
        </div>

        {/* AI Analysis result */}
        {aiAnalysis && (
          <div className="glass-panel p-4 border-oil-blue/30 mt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-oil-blue/20 text-oil-blue border border-oil-blue/30">
                AI ANALYSIS — {horizonLabel.toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
              {aiAnalysis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
