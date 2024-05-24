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
				btcPriceData?: undefined
		  }
		| {
				nusdInfoData: {
					minted: string
				}
				bestHeightData: {
					height: number
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
	if (data.bamkRuneData && data.btcPriceData && data.nusdInfoData) {
		const usdPricePerRune = data.bamkRuneData?.curPrice / 100_000_000 * data.btcPriceData.bitcoin.usd;
		APY = usdPricePerRune * SEASON_1_BAMK_PER_BLOCK * 144 * 365 / Number(data.nusdInfoData.minted);
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex justify-between items-center h-14 max-w-screen-xl container">
				<div className="flex items-center mr-2">
					<Link href="/">
						<BamkIcon className="xs:hidden h-8 w-8 stroke-primary" />
						<div className={classNames(inter.className, "hidden xs:flex h-8 mr-6 gap-4 font-inter")}>
							<BamkIcon className="h-8 w-8 stroke-primary" />
							<div className='uppercase text-zinc-50 text-xl leading-[31px] tracking-[0.23em]'>
								Bamk.fi
							</div>
						</div>
					</Link>
				</div>
				<div className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
					{links.map(l => (
						<RenderLink key={l.name} {...l} />
					))}
				</div>
				<div className="flex items-center gap-2">
					{data.nusdInfoData?.minted && (
						<div
							title="Total Value Locked"
							className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center"
						>
							<p>TVL</p>
							<p className="text-primary font-bold">
								${Number(data.nusdInfoData.minted).toLocaleString()}
							</p>
						</div>
					)}
					{/* {data.bestHeightData?.height && (
						<div
							title="Total Bamk Awarded"
							className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center"
						>
							<p>S1 Progress</p>
							<p className="text-primary font-bold">
								{`${Number(((data.bestHeightData.height - SEASON_1_GENESIS_BLOCK) / SEASON_1_TOTAL_BLOCKS * 100).toFixed(2)).toLocaleString()}%`}
							</p>
						</div>
					)} */}
					{APY ? (
						<div
							title="Annual Percentage Yield"
							className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center"
						>
							<p>APY</p>
							<p className="text-primary font-bold">
								{`${(APY * 100).toLocaleString(undefined, { maximumFractionDigits: 1 })}%`}
							</p>
						</div>
					) : null}
					{/* <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
						<Button variant="ghost" size="icon">
							<TwitterIcon className="h-5 w-5 fill-foreground/60 hover:fill-foreground/80" />
						</Button>
					</a>
					<a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
						<Button variant="ghost" size="icon">
							<TelegramIcon className="h-6 w-6 fill-foreground/60 hover:fill-foreground/80" />
						</Button>
					</a> */}
					{/* <Button>Connect Wallet</Button> */}
				</div>
			</div>
		</header>
	)
}
