import { getNusdBalance } from '@/lib/getNusdBalance';
import Calculator from './Calculator';
import { cookies } from 'next/headers';

export const revalidate = 0;

export default async function CalculatorPage() {
  const cookieStore = cookies();
  const address = cookieStore.get('connected_btc_address')?.value;

  let initialNusdBalance = '';
  if (address) {
    try {
      const nusdBalance = await getNusdBalance(address);
      initialNusdBalance = nusdBalance.total.toString();
    } catch (err) {
      console.error("Error fetching initialNusdBalance:", err)
    }
  }

  return <Calculator initialNusdBalance={initialNusdBalance} />
}