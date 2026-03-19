import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { newsEvents, priceHistory, predictions, ForecastHorizon } from '@/data/news-events';
import { countries } from '@/data/countries';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const horizon: ForecastHorizon = body.horizon || '1M';
    const horizonLabel = horizon === '1W' ? '1 week' : horizon === '1M' ? '1 month' : '1 year';

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
      return NextResponse.json({
        analysis: `[Demo Mode — connect ANTHROPIC_API_KEY for live AI analysis]

SITUATION (March 19, 2026):
Brent $79.40 | WTI $75.80 | Spread $3.60

CRISIS LEVEL: ELEVATED
- Iran-Gulf confrontation escalating: tanker seizure, Abqaiq drone strike, Hormuz threats
- Red Sea shipping suspended after Houthi missile sinks Greek tanker
- OPEC+ emergency meeting called — 3.5M bpd spare capacity in play
- China panic-stockpiling 200M barrels
- Libya offline (-500K bpd), Iran sanctions (-1.2M bpd)

${horizonLabel.toUpperCase()} OUTLOOK:
${horizon === '1W' ? `Base: $78-82 Brent (72% probability)
Bull: $82-88 if Hormuz incident (20%)
Bear: $74-78 if diplomatic breakthrough (8%)` :
horizon === '1M' ? `Base: $80-88 Brent (55% probability)
Bull: $88-104 if military strike on Iran (25%)
Bear: $72-78 if ceasefire + OPEC spare release (20%)` :
`Base: $78-92 Brent — structural tightening (45%)
Superspike: $98-134 if prolonged Gulf conflict (15%)
Recession: $54-68 if global downturn (15%)
Stability: $74-84 if diplomatic resolution (25%)`}

TRADING SIGNAL: BULLISH with HIGH CONVICTION
Net risk overwhelmingly to the upside. The confluence of Hormuz threats,
Red Sea disruption, and OPEC+ discipline creates a rare setup where
multiple supply risks are correlated. Hedging cost elevated but justified.`,
      });
    }

    const client = new Anthropic({ apiKey });

    const context = {
      horizon: horizonLabel,
      latestPrices: priceHistory.filter((p) => !p.predicted).slice(-5),
      newsEvents: newsEvents.map((e) => ({
        title: e.title,
        impact: e.impact,
        severity: e.severity,
        category: e.category,
        priceImpact: e.priceImpact,
        date: e.date,
        region: e.region,
      })),
      topProducers: countries
        .sort((a, b) => b.production - a.production)
        .slice(0, 10)
        .map((c) => ({ name: c.name, production: c.production, exports: c.exports })),
      predictions: predictions[horizon],
    };

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `You are an elite oil market analyst at a top commodity trading house. Today is March 19, 2026. The Persian Gulf is in crisis with Iran-US tensions at their highest since 1988.

Analyze the ${horizonLabel} outlook for crude oil prices. Be specific, quantitative, and actionable.

MARKET DATA:
${JSON.stringify(context, null, 2)}

Provide analysis in this format:
1. SITUATION ASSESSMENT — What's happening right now (2-3 sentences, specific numbers)
2. ${horizonLabel.toUpperCase()} PRICE DRIVERS — Top 4 factors ranked by impact magnitude
3. SUPPLY CHAIN RISK MAP — Which chokepoints are at risk and probability of disruption
4. PRICE SCENARIOS for the next ${horizonLabel}:
   - Base case with probability and price range
   - Bull case (upside tail risk)
   - Bear case (downside risk)
5. TRADING SIGNAL — Direction, conviction (1-10), and key levels to watch

Think like you're briefing the CIO of Trafigura or Vitol. Be bold in your calls. Use specific dollar amounts.`,
        },
      ],
    });

    const analysis = message.content[0].type === 'text' ? message.content[0].text : '';
    return NextResponse.json({ analysis });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Analysis failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
