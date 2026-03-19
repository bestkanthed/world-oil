import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { newsEvents, priceHistory, predictions } from '@/data/news-events';
import { countries } from '@/data/countries';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
      return NextResponse.json({
        analysis: `[AI Analysis - Demo Mode]

Based on the embedded data analysis:

CURRENT SITUATION (March 19, 2026):
- Brent crude at $79.40/bbl, WTI at $75.80/bbl
- Strong bullish bias: 9 of 12 tracked events are bullish for oil prices
- Major supply disruptions: Libya (-500K bpd), Iran sanctions (-800K bpd risk)
- Geopolitical risk premium at elevated levels

KEY PRICE DRIVERS:
1. Houthi Red Sea attacks forcing costly reroutes (+$2-4/bbl freight)
2. OPEC+ maintaining 2.2M bpd cuts through Q2 2026
3. China stimulus boosting demand expectations (+500K bpd)
4. US shale growth decelerating (Permian rig count at 18-month low)

PREDICTION:
- Short-term (1 week): BULLISH - $77-81 Brent likely
- Medium-term (1 month): BULLISH with volatility - $76-86 range
- Risk scenario: Iran escalation could push Brent above $90
- Support level: OPEC+ floor around $72 Brent

NET ASSESSMENT: Bullish bias with elevated geopolitical risk premium.
Supply constraints outweigh demand concerns. Watch for OPEC+ discipline
and China PMI data for directional confirmation.

⚠️ Connect ANTHROPIC_API_KEY for live AI analysis with latest reasoning.`,
      });
    }

    const client = new Anthropic({ apiKey });

    const context = {
      latestPrices: priceHistory.filter((p) => !p.predicted).slice(-5),
      newsEvents: newsEvents.map((e) => ({
        title: e.title,
        impact: e.impact,
        severity: e.severity,
        category: e.category,
        priceImpact: e.priceImpact,
        date: e.date,
      })),
      topProducers: countries
        .sort((a, b) => b.production - a.production)
        .slice(0, 10)
        .map((c) => ({ name: c.name, production: c.production, exports: c.exports })),
      currentPredictions: predictions,
    };

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `You are an elite oil market analyst combining deep commodity trading expertise with geopolitical intelligence analysis. Analyze the current oil market situation and provide a concise, actionable assessment.

CURRENT MARKET DATA:
${JSON.stringify(context, null, 2)}

Provide your analysis in this format:
1. SITUATION ASSESSMENT (2-3 sentences on current state)
2. KEY PRICE DRIVERS (top 3-4 factors, ranked by impact)
3. SUPPLY CHAIN RISKS (specific bottlenecks and disruption risks)
4. PRICE PREDICTION with probability-weighted scenarios:
   - Base case (most likely)
   - Bull case (upside risk)
   - Bear case (downside risk)
5. TRADING SIGNAL (overall directional bias with conviction level)

Be specific with numbers. Think like a Goldman Sachs commodity strategist.`,
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
