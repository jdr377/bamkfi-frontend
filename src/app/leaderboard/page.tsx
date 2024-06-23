import { nunito } from '@/components/ui/fonts'
import classNames from 'classnames';
import ClientSideTable, { ClientSideTableProps } from './ClientSideTable';
import { MagicEdenBamkData } from '@/types';

async function getData(): Promise<ClientSideTableProps | null> {
  const leaderboard = await fetch('https://calhounjohn.com/reward/getLeaderboard', {
    headers: {
      Authorization: `Bearer big-bamker-password`
    },
    next: {
      revalidate: 600
    }
  });

  if (!leaderboard.ok) {
	console.error("Error fetching leaderboard", leaderboard.status, leaderboard.statusText)
    return null;
  }

  const leaderboardData = await leaderboard.json();

	const magicEdenBamk = await fetch('https://api-mainnet.magiceden.dev/v2/ord/btc/runes/market/BAMKOFNAKAMOTODOLLAR/info', {
		headers: {
			Authorization: `Bearer ${process.env.MAGIC_EDEN_API_KEY}`
		},
		next: { revalidate: 600 }
	})
	if (!magicEdenBamk.ok) {
		console.error("Error fetching magic eden bamk", magicEdenBamk.status, magicEdenBamk.statusText)
		return null;
	}
	const magicEdenBamkData: MagicEdenBamkData = (await magicEdenBamk.json())

  const btcPrice = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    {
      method: 'GET',
      headers: {
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string
      },
      next: {
        revalidate: 600
      }
    }
  );

  if (!btcPrice.ok) {
    console.error("Error fetching BTC price", btcPrice.status, btcPrice.statusText);
    return null;
  }

  const btcPriceData = await btcPrice.json();

  return {
    magicEdenBamkData,
    leaderboardData,
    btcPriceData,
  };
}

export default async function Leaderboard() {
  const data = await getData()
  if (!data) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="max-w-screen-xl container flex flex-col gap-8 sm:mt-8 px-2">
      <div className="flex flex-col gap-4 md:mx-8">
        <h1 className={classNames(nunito.className, 'text-3xl mt-2')}>
          Season 1 Rewards Leaderboard
        </h1>
        <div>
          NUSD holders accrue pro-rata rewards of 31,250 BAMK per block. Rewards will be released 41,982 blocks after the reward is accrued.
        </div>
      </div>
      <ClientSideTable
        magicEdenBamkData={data?.magicEdenBamkData}
        leaderboardData={data?.leaderboardData}
        btcPriceData={data?.btcPriceData}
      />
    </div>
  );
}