// src/app/api/getLeaderboard/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const leaderboard = await fetch('https://calhounjohn.com/reward/getLeaderboard', {
    headers: {
      Authorization: `Bearer big-bamker-password`
    }
  });
  if (!leaderboard.ok) {
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: leaderboard.status });
  }
  const leaderboard_data = await leaderboard.json();

  const bamkRune = await fetch(
    'https://open-api.unisat.io/v3/market/runes/auction/runes_types_specified',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.UNISAT_API_KEY}`
      },
      body: JSON.stringify({
        tick: 'BAMK•OF•NAKAMOTO•DOLLAR',
        timeType: 'day1'
      })
    }
  );
  if (!bamkRune.ok) {
    return NextResponse.json({ error: 'Failed to fetch BAMK Rune data' }, { status: bamkRune.status });
  }
  const bamkRuneData = (await bamkRune.json()).data;

  const btcPrice = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
    method: 'GET',
    headers: {
      'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string,
    }
  });
  if (!btcPrice.ok) {
    return NextResponse.json({ error: 'Failed to fetch Bitcoin price' }, { status: btcPrice.status });
  }
  const btcPriceData = await btcPrice.json();

  return NextResponse.json({
    leaderboard_data,
    bamkRuneData,
    btcPriceData
  });
}