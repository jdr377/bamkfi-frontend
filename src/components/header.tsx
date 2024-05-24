'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
	NUSD_MARKET_URL,
	BAMK_MARKET_URL,
	GENESIS_POINTS_BLOCK,
	POINTS_PER_BLOCK
} from '@/lib/constants'
import BamkIcon from '@/icons/bamk'

export default function Header(props: {
	data:
		| {
				nusdInfoData?: undefined
				bestHeightData?: undefined
		  }
		| {
				nusdInfoData: {
					minted: string
				}
				bestHeightData: {
					height: number
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

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex justify-between items-center h-14 max-w-screen-xl container">
				<div className="flex items-center mr-2">
					<Link href="/">
						<BamkIcon className="xs:hidden h-8 w-8 stroke-primary" />
						<img className="hidden xs:block h-8 mr-6" src="/logo.png" />
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
					{data.bestHeightData?.height && (
						<div
							title="Total Bamk Allocated"
							className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center"
						>
							<p>TBA</p>
							<p className="text-primary font-bold">
								{(
									(data.bestHeightData.height - GENESIS_POINTS_BLOCK) *
									POINTS_PER_BLOCK
								).toLocaleString()}
							</p>
						</div>
					)}
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
