// src/app/api/getRewardsByAddress/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  const response = await fetch(`https://calhounjohn.com/reward/getRewardsByAddress/${address}`, {
    headers: {
      Authorization: `Bearer big-bamker-password`
    }
  });
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch rewards by address' }, { status: response.status });
  }
  const data = await response.json();

  return NextResponse.json(data);
}