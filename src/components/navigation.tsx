import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
	BAMK_MARKET_URL,
    GITBOOK_URL,
    NUSD_RUNE_MARKET_URL,
} from '@/lib/constants'
import classNames from 'classnames'

export default function Navigation() {
	const pathname = usePathname()

	const links = React.useMemo(() => {
		return [
            // {
            //     name: 'Buy BAMK',
            //     href: BAMK_MARKET_URL
            // },
			// {
			// 	name: 'Buy NUSD',
			// 	href: NUSD_RUNE_MARKET_URL
			// },
			// {
			// 	name: 'Info',
			// 	href: "/"
			// },
			{
				name: 'Docs',
				href: GITBOOK_URL
			},
			{
				name: 'Leaderboard',
				href: '/leaderboard'
			}
		]
	}, [])

	const RenderLink = React.useCallback(
		(props: { name: string; href: string }) => {
			if (props.href.startsWith('/')) {
				return (
					<Link
						key={props.name}
						href={props.href}
						className={classNames(`pb-1 border-b border-transparent ${props.href === pathname ? 'border-orange-400' : ''}`, 
							`transition-colors  text-foreground/60 ${props.href === pathname ? 'text-orange-400' : 'hover:text-foreground/80'}`, {
							['text-foreground']: props.href === pathname
						})}
					>
						{props.name}
					</Link>
				)
			}

			return (
				<a
					key={props.name}
					href={props.href}
					className="transition-colors hover:text-foreground/80 text-foreground/60 pb-1"
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
        <div className="flex items-center gap-4 text-sm lg:gap-6">
            {links.map(l => (
                <RenderLink key={l.name} {...l} />
            ))}
        </div>
	)
}
