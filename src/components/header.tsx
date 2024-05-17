'use client'

import React from 'react'
import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

export default function Header() {
	const pathname = usePathname()

	const links = React.useMemo(() => {
		return [
			{
				name: 'Buy NUSD',
				href: 'https://unisat.io/market/brc20?tick=%24NUSD' },
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
						<img className="h-8 mr-6" src="/logo.png" />
					</Link>
					{/* <div className="flex items-center gap-4 text-sm lg:gap-6">{links.map(renderLink)}</div> */}
				</div>
				<div className="flex items-center gap-6">
					<div className="bg-primary/5 flex text-sm gap-2 px-4 rounded-md h-10 items-center">
						<p>TVL</p>
						<p className="text-primary font-bold">$0</p>
					</div>
					{/* <Button>Connect Wallet</Button> */}
				</div>
			</div>
		</header>
	)
}
