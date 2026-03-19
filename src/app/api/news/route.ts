import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
  try {
    const { existingIds } = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
      return NextResponse.json({ events: [] });
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: `You are an oil market intelligence analyst. Today is March 19, 2026.

Generate 3-5 BREAKING news events about the current oil market crisis. Focus on:
- Iran's aggression in the Persian Gulf (tanker seizures, Strait of Hormuz threats, drone attacks on Saudi infrastructure)
- US military response and escalation risks
- OPEC+ emergency actions
- Impact on global oil supply chains
- China and India's response to supply disruptions

Each event must be realistic, specific, and actionable for oil traders.

Return ONLY valid JSON (no markdown, no code blocks) in this exact format:
[
  {
    "id": "unique-id-string",
    "title": "Short headline (max 80 chars)",
    "summary": "Detailed 2-3 sentence summary with specific numbers and facts",
    "impact": "bullish" | "bearish" | "neutral",
    "severity": 1-5,
    "category": "conflict" | "geopolitical" | "supply" | "demand" | "policy" | "weather",
    "region": "Persian Gulf" | "Middle East" | "Asia" | "North America" | "Europe" | "Global",
    "date": "2026-03-19",
    "priceImpact": "+$X-Y/bbl description",
    "lat": number,
    "lng": number
  }
]

Do NOT duplicate any of these existing event IDs: ${JSON.stringify(existingIds?.slice(0, 20))}`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    try {
      const events = JSON.parse(text.trim());
      if (Array.isArray(events)) {
        return NextResponse.json({ events });
      }
    } catch {
      // Try to extract JSON from response
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          const events = JSON.parse(match[0]);
          if (Array.isArray(events)) {
            return NextResponse.json({ events });
          }
        } catch {
          // fall through
        }
      }
    }

    return NextResponse.json({ events: [] });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ events: [], error: errorMessage }, { status: 500 });
  }
}
