import { Button } from '@/components/ui/button'
import classNames from 'classnames'
import {
	BAMK_MARKET_URL,
	BAMK_PREMINED_SUPPLY,
	BAMK_TOTAL_SUPPLY,
	ETHENA_SUSDE_BACKING_ACCOUNT,
	ETHENA_SUSDE_TOKEN_CONTRACT,
	NUSD_RUNE_MARKET_URL
} from '@/lib/constants'
import { Fitty } from '@/components/ui/fitty'
import NusdIcon from '@/icons/nusd'
import SusdeIcon from '@/icons/sUSDe'
import { MagicEdenBamkData, NusdRuneData } from '@/types'
import { nunito } from '@/components/ui/fonts'

async function getData() {
	const nusdInfo = await fetch('https://open-api.unisat.io/v1/indexer/brc20/$NUSD/info', {
		headers: {
			Authorization: `Bearer ${process.env.UNISAT_API_KEY}`
		},
		next: { revalidate: 600 }
	})
	if (!nusdInfo.ok) {
		console.error('Error fetching nusdInfo', nusdInfo)
		return {}
	}
	const nusdInfoData: { minted: string } = (await nusdInfo.json()).data

	const magicEdenBamkReq = await fetch('https://api-mainnet.magiceden.dev/v2/ord/btc/runes/market/BAMKOFNAKAMOTODOLLAR/info', {
		headers: {
			Authorization: `Bearer ${process.env.MAGIC_EDEN_API_KEY}`
		},
		next: { revalidate: 600 }
	})
	if (!magicEdenBamkReq.ok) {
		console.error('Error fetching magicEdenBamkReq', magicEdenBamkReq)
		return {}
	}
	const magicEdenBamkData: MagicEdenBamkData = (await magicEdenBamkReq.json())

	const nusdRune = await fetch(
		'https://open-api.unisat.io/v1/indexer/address/bc1pg9afu20tdkmzm40zhqugeqjzl5znfdh8ndns48t0hnmn5gu7uz5saznpu9/runes/845005%3A178/balance',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.UNISAT_API_KEY}`
			},
			next: { revalidate: 600 }
		}
	)
	if (!nusdRune.ok) {
		console.error('Error fetching nusdRune:', nusdRune)
		return {}
	}
	const nusdRuneData: NusdRuneData = (await nusdRune.json()).data

	const INFURA_API_KEY = process.env.INFURA_API_KEY
	const data = {
		jsonrpc: '2.0',
		method: 'eth_call',
		params: [
			{
				to: ETHENA_SUSDE_TOKEN_CONTRACT,
				data: '0x70a08231000000000000000000000000' + ETHENA_SUSDE_BACKING_ACCOUNT.substring(2) // balanceOf method hash + address without '0x'
			},
			'latest'
		],
		id: 1
	}
	const susdeBackingResponse = await fetch(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
		next: { revalidate: 600 }
	})
	if (!susdeBackingResponse.ok) {
		console.error('Error fetching susdeBacking', susdeBackingResponse)
	}
	const susdeBalance = BigInt((await susdeBackingResponse.json()).result) / BigInt(10 ** 18)
	const susdePrice = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=ethena-staked-usde&vs_currencies=usd',
		{
			method: 'GET',
			headers: {
				'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string
			},
			next: { revalidate: 600 }
		}
	)
	if (!susdePrice.ok) {
		console.error('Error fetching susdePrice', susdePrice)
		return {}
	}
	const susdePriceData: {
		'ethena-staked-usde': {
			usd: number
		}
	} = await susdePrice.json()
	const susdeBackingUSDValue = susdePriceData['ethena-staked-usde'].usd * Number(susdeBalance)

	const btcPrice = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
		method: 'GET',
		headers: {
			'x-cg-demo-api-key': process.env.COINGECKO_API_KEY as string,
		},
		next: { revalidate: 600 }
	});
	if (!btcPrice.ok) {
		console.error("Error fetching BTC price", btcPrice)
		return {}
	}
	
	const btcPriceData: {
		bitcoin: {
		  usd: number;
		}
	 } = (await btcPrice.json());

	return {
		nusdInfoData,
		nusdRuneData,
		magicEdenBamkData,
		susdeBackingUSDValue,
		btcPriceData
	}
}

export default async function Home() {
	const data = await getData()
	let TVL = 0
	if (data.nusdRuneData && data.nusdInfoData) {
		const nusdRuneCirculating = 2_100_000_000_000_000 - Number(data.nusdRuneData.amount)
		const nusdBrc20Circulating = Number(data.nusdInfoData.minted)
		TVL = nusdRuneCirculating + nusdBrc20Circulating
	}
	return (
        <div className="flex flex-col h-full">
			<div className="flex-grow">    
				<div className="max-w-screen-xl container flex flex-col gap-8 mt-8">
					<div className="flex flex-col gap-4 md:ml-12">
						<h1 className={classNames(nunito.className, 'max-w-full w-[520px] mt-2 break-words')}>
							<Fitty>BAMK•OF•NAKAMOTO•DOLLAR</Fitty>
						</h1>
						{data.magicEdenBamkData ? (
							<div className="flex gap-2 flex-wrap -mt-2">
								<div
									title="BAMK Price"
									className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
								>
									<p>
										<span className="text-primary">{Number(data.magicEdenBamkData.floorUnitPrice.formatted).toLocaleString(undefined, { maximumFractionDigits: 2 })} sats</span>
										{' / 🏦'}
									</p>
								</div>
								<div
									title="Market Cap (Circulating Supply)"
									className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
								>
									<p>🏦 MCAP</p>
									<p className="text-primary font-bold">
										{`$${(
											Number(data.magicEdenBamkData.marketCap) * data.btcPriceData.bitcoin.usd *
											(1 - BAMK_PREMINED_SUPPLY / BAMK_TOTAL_SUPPLY)
										).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
									</p>
								</div>
								{/* <div
									title="Fully Diluted Valuation"
									className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
								>
									<p>🏦 FDV</p>
									<p className="text-primary font-bold">
										{`$${(Number(data.magicEdenBamkData.marketCap) * data.btcPriceData.bitcoin.usd).toLocaleString(undefined, {
											maximumFractionDigits: 0
										})}`}
									</p>
								</div> */}
								{TVL > 0 && (
									<div
										title="Total Value Locked"
										className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
									>
										<div className="bg-[#F7931A] p-[0.4rem] rounded-full">
											<NusdIcon height={14} width={14} className="stroke-primary" />
										</div>
										<p>TVL</p>
										<p className="text-primary font-bold">${TVL.toLocaleString()}</p>
									</div>
								)}
								{data.susdeBackingUSDValue > 0 && (
									<a
										href={`https://www.oklink.com/eth/token/${ETHENA_SUSDE_TOKEN_CONTRACT}?address=${ETHENA_SUSDE_BACKING_ACCOUNT}`}
										className="cursor-pointer"
										target="_blank"
										rel="noopener noreferrer"
									>
										<div
											title="Backed by Ethena sUSDe"
											className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center w-max mt-1"
										>
											<SusdeIcon height={27} width={27} className="stroke-primary" />
											<p>sUSDe Reserves</p>
											<p className="text-primary font-bold">
												$
												{data.susdeBackingUSDValue.toLocaleString(undefined, {
													maximumFractionDigits: 0
												})}
											</p>
										</div>
									</a>
								)}
							</div>
						) : null}
						<h2 className="max-w-full w-[612px] leading-7">
							Bamk.fi is a synthetic dollar protocol built on Bitcoin L1 providing a crypto-native
							solution for money not reliant on the traditional banking system, alongside a globally
							accessible dollar-denominated savings instrument — the Bitcoin&nbsp;Bond.
						</h2>
						<div className="flex flex-wrap gap-3 max-w-full sm:w-[612px]">
							<a
								href={BAMK_MARKET_URL}
								target="_blank"
								rel="noopener noreferrer"
								className='flex-grow'
							>
								<Button className="w-full h-14 text-lg">Buy BAMK</Button>
							</a>
							<a
								href={NUSD_RUNE_MARKET_URL}
								target="_blank"
								rel="noopener noreferrer"
								className='flex-grow'
							>
								<Button className="w-full h-14 text-lg" variant="secondary">
									Buy NUSD
								</Button>
							</a>
						</div>
					</div>
				</div>
        	</div>
        </div>
	)
}