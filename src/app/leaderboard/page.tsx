import { Nunito } from 'next/font/google';
import classNames from 'classnames';
import ClientSideTable from './ClientSideTable';
import { ClientSideTableProps } from '@/types'

const nunito = Nunito({ subsets: ['latin'] })

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
    return null;
  }

  const leaderboardData = await leaderboard.json();

  const unisatBamkReq = await fetch(
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
      }),
      next: {
        revalidate: 600
      }
    }
  );

  if (!unisatBamkReq.ok) {
    console.log(unisatBamkReq);
    return null;
  }

  const unisatBamkData = (await unisatBamkReq.json()).data;

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
    console.log(btcPrice);
    return null;
  }

  const btcPriceData = await btcPrice.json();

  const btcBlockHeightReq = await fetch(
    'https://mempool.space/api/blocks/tip/height',
    {
      method: 'GET',
      next: {
        revalidate: 600
      }
    }
  )

  if (!btcBlockHeightReq.ok) {
    console.log(btcBlockHeightReq);
    return null;
  }

  const btcBlockHeight = await btcBlockHeightReq.text()

  return {
    unisatBamkData,
    leaderboardData,
    btcPriceData,
    btcBlockHeight
  };
}

export default async function Leaderboard() {
  const data = await getData()

  if (!data) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="max-w-screen-xl container flex flex-col gap-8 sm:mt-8">
      <div className="flex flex-col gap-4 mx-3 md:mx-8">
        <h1 className={classNames(nunito.className, 'text-3xl mt-2')}>
          Season 1 Airdrop Leaderboard
        </h1>
        <div>
          NUSD Rune and BRC-20 holders accrue pro-rata rewards of 31,250 BAMK per block.
          <br />
          Rewards will be released 41,982 blocks after the reward is accrued.
        </div>
      </div>
      <ClientSideTable
        unisatBamkData={data?.unisatBamkData}
        leaderboardData={data?.leaderboardData}
        btcPriceData={data?.btcPriceData}
        btcBlockHeight={data?.btcBlockHeight}
      />
    </div>
  );
}