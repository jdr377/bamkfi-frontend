'use client'

import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

import { TWITTER_URL, TELEGRAM_URL } from '@/lib/constants'

import TwitterIcon from '@/icons/twitter'
import TelegramIcon from '@/icons/telegram'
import BamkIcon from '@/icons/bamk'

import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export default function Header() {
	const pathname = usePathname()

	const links = React.useMemo(() => {
		return [
			{
				name: 'Buy NUSD',
				href: 'https://unisat.io/market/brc20?tick=%24NUSD'
			},
			{
				name: 'Buy BAMK',
				href: '/buy-bamk'
			},
			{
				name: 'Docs',
				href: '/docs'
			},
			{
				name: 'Airdrop',
				href: '/airdrop'
			}
		]
	}, [])

	const renderLink = React.useCallback(
		(e: any) => {
			if (e.href.startsWith('/')) {
				return (
					<Link
						key={e.name}
						href={e.href}
						className={classNames('transition-colors hover:text-foreground/80 text-foreground/60', {
							['text-foreground']: e.href === pathname
						})}
					>
						{e.name}
					</Link>
				)
			}

			return (
				<a
					key={e.name}
					href={e.href}
					className="transition-colors hover:text-foreground/80 text-foreground/60"
					target="_blank"
				>
					{e.name}
				</a>
			)
		},
		[pathname]
	)

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex justify-between items-center h-14 max-w-screen-xl container">
				<div className="flex items-center">
					<Link href="/">
						<BamkIcon className="sm:hidden h-8 w-8 stroke-primary" />
						<img className="hidden sm:block h-8 mr-6" src="/logo.png" />
					</Link>
					{/* <div className="flex items-center gap-4 text-sm lg:gap-6">{links.map(renderLink)}</div> */}
				</div>
				<div className="flex items-center gap-4">
					<div className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center">
						<p>TVL</p>
						<p className="text-primary font-bold">$0</p>
					</div>
					<a href={TWITTER_URL} target="_blank">
						<Button variant="ghost" size="icon">
							<TwitterIcon className="h-5 w-5 fill-foreground/60 hover:fill-foreground/80" />
						</Button>
					</a>
					<a href={TELEGRAM_URL} target="_blank">
						<Button variant="ghost" size="icon">
							<TelegramIcon className="h-6 w-6 fill-foreground/60 hover:fill-foreground/80" />
						</Button>
					</a>
					{/* <Button>Connect Wallet</Button> */}
				</div>
			</div>
		</header>
	)
}
