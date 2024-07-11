import { getNusdBalance } from '@/lib/getNusdBalance';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function nusdBalanceByAddress(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (typeof req.query.address !== 'string') {
      res.status(400).json({ error: "Invalid address" })
      return;
    }
    const result = await getNusdBalance(req.query.address)
    res.status(200).json(result);
  } catch (error) {
    console.error('nusdBalanceByAddress Error:', error);
    res.status(500).end();
  }
}
