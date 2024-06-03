import { Button } from '@/components/ui/button'
import { Nunito } from 'next/font/google'
import classNames from 'classnames'
import {
	BAMK_MARKET_URL,
	BAMK_PREMINED_SUPPLY,
	BAMK_TOTAL_SUPPLY,
	ETHENA_SUSDE_BACKING_ACCOUNT,
	ETHENA_SUSDE_TOKEN_CONTRACT,
	NUSD_MARKET_URL,
	NUSD_RUNE_MARKET_URL
} from '@/lib/constants'
import { Fitty } from '@/components/ui/fitty'
import Body from '@/components/leaderboard/body'

const nunito = Nunito({ subsets: ['latin'] })

async function getData() {
	const leaderboard_ = await fetch('https://calhounjohn.com/reward/getLeaderboard', {
		headers: {
			Authorization: `Bearer big-bamker-password`
		},
		next: { revalidate: 600 }
	})
	if (!leaderboard_.ok) {
		return {}
	}
	const leaderboard_data = (await leaderboard_.json())


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
			}),
			next: { revalidate: 600 }
		}
	)
	if (!bamkRune.ok) {
		console.log(bamkRune)
		return {}
	}
  const bamkRuneData: {
		tick: string
		symbol: string
		curPrice: number // in sats
		changePrice: number
		btcVolume: number
		amountVolume: number
		cap: string
		capUSD: string
		warning: boolean
	} = (await bamkRune.json()).data

  const btcPrice = await fetch('https://cloud-functions.twetch.app/api/btc-exchange-rate', { next: { revalidate: 600 }})
	if (!btcPrice.ok) {
		return {}
	}
	const btc_data = (await btcPrice.json())
	return {
		leaderboard_data,
		bamkRuneData,
		btc_data
	}
}

export default async function Leaderboard() {
	const data = await getData()
	return (
		<div className="max-w-screen-xl container flex flex-col gap-8 mt-8">
			<div className="flex flex-col gap-4 md:ml-12">
				<h1 className={classNames(nunito, 'max-w-full w-[520px] mt-2 break-words')}>
					<Fitty>BAMK•OF•NAKAMOTO•DOLLAR</Fitty>
					<Fitty>TVL LEADERBOARD</Fitty>
				</h1>
			</div>
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <div className="flex items-center">
                            Amount
                            <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg></a>
                          </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Current Value $
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Current Value (BTC)
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {data?.leaderboard_data?.rewards?.length > 0 ? (
                    <Body points={data.leaderboard_data.rewards} bamkPriceSats={data?.bamkRuneData?.curPrice} btcData={data?.btc_data}/>
                  ) :
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        No data
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>}
              </tbody>
          </table>
      </div>

		</div>
	)
}