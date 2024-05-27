'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'

import {
	NUSD_MARKET_URL,
	BAMK_MARKET_URL,
	SEASON_1_BAMK_PER_BLOCK,
} from '@/lib/constants'
import BamkIcon from '@/icons/bamk'
import classNames from 'classnames'

const inter = Inter({ subsets: ['latin'] })

export default function Header(props: {
	data:
		| {
				nusdInfoData?: undefined
				bestHeightData?: undefined
				bamkRuneData?: undefined
				nusdRuneData?: undefined
				btcPriceData?: undefined
		  }
		| {
				nusdInfoData: {
					minted: string
				}
				bestHeightData: {
					height: number
				}
				nusdRuneData: {
					"amount": string,
					"runeid": string,
					"rune": string,
					"spacedRune": string,
					"symbol": string,
				}
				bamkRuneData: {
					tick: string;
					symbol: string;
					curPrice: number;
					changePrice: number;
					btcVolume: number;
					amountVolume: number;
					cap: string;
					capUSD: string;
					warning: boolean;
				}
				btcPriceData: {
					bitcoin: {
					  usd: number;
					}
				}
		  }
}) {
	const { data } = props
	const pathname = usePathname()

	const links = React.useMemo(() => {
		return [
			{
				name: 'Buy NUSD',
				href: NUSD_MARKET_URL
			},
			{
				name: 'Buy BAMK',
				href: BAMK_MARKET_URL
			}
			// {
			// 	name: 'Docs',
			// 	href: '/docs'
			// },
			// {
			// 	name: 'Airdrop',
			// 	href: '/airdrop'
			// }
		]
	}, [])

	const RenderLink = React.useCallback(
		(props: { name: string; href: string }) => {
			// if (e.href.startsWith('/')) {
			// 	return (
			// 		<Link
			// 			key={e.name}
			// 			href={e.href}
			// 			className={classNames('transition-colors hover:text-foreground/80 text-foreground/60', {
			// 				['text-foreground']: e.href === pathname
			// 			})}
			// 		>
			// 			{e.name}
			// 		</Link>
			// 	)
			// }

			return (
				<a
					key={props.name}
					href={props.href}
					className="transition-colors hover:text-foreground/80 text-foreground/60"
					target="_blank"
					rel="noopener noreferrer"
				>
					{props.name}
				</a>
			)
		},
		[pathname]
	)

	let APY = 0;
	if (data.bamkRuneData && data.nusdRuneData && data.btcPriceData && data.nusdInfoData) {
		const usdPricePerBamk = data.bamkRuneData?.curPrice / 100_000_000 * data.btcPriceData.bitcoin.usd;
		const nusdRuneCirculating = 2_100_000_000_000_000 - Number(data.nusdRuneData.amount)
		const nusdBrc20Circulating = Number(data.nusdInfoData.minted)
		const nusdTotalCirculating = nusdRuneCirculating + nusdBrc20Circulating
		APY = usdPricePerBamk * SEASON_1_BAMK_PER_BLOCK * 144 * 365 / nusdTotalCirculating;
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex justify-between items-center h-14 max-w-screen-xl container">
				<div className="flex items-center">
					<Link href="/">
						<div className={classNames(inter.className, "flex h-8 mr-6 gap-4 font-inter")}>
							<BamkIcon className="h-8 w-8 stroke-primary" />
							<div className='uppercase text-zinc-50 text-xl leading-[31px] tracking-[0.23em]'>
								Bamk.fi
							</div>
						</div>
					</Link>
				</div>
				{/* <div className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
					{links.map(l => (
						<RenderLink key={l.name} {...l} />
					))}
				</div> */}
				{APY > 0 ? (
					<div
						title="Annual Percentage Yield"
						className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center"
					>
						<p>APY</p>
						<p className="text-primary font-bold">
							{`${(APY * 100).toLocaleString(undefined, { maximumFractionDigits: 1 })}%`}
						</p>
					</div>
				) : null
				}
				{/* <Button>Connect Wallet</Button> */}
			</div>
		</header>
	)
}
