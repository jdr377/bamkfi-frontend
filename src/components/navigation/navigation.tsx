'use client'

import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons"

export default function Navigation({ links } : { links: { name: string; href: string;}[] }) {
	const pathname = usePathname()

	const RenderLink = React.useCallback(
		(props: { name: string; href: string }) => {
			if (props.href.startsWith('/')) {
				return (
					<Link
						key={props.name}
						href={props.href}
						className={classNames(
							`pb-1 transition-colors text-foreground/60 hover:text-foreground/80`, 
							{['border-b border-current border-orange-400 text-orange-400 hover:text-orange-400']: pathname?.startsWith(props.href) }
						)}
					>
						{props.name}
					</Link>
				)
			}

			return (
				<a
					key={props.name}
					href={props.href}
					className="pb-1 transition-colors text-foreground/60 hover:text-foreground/80 "
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
        <div className="inline-flex items-center gap-4 text-base lg:gap-9 px-0">
            {links.map(l => (
                <RenderLink key={l.name} {...l} />
            ))}
        </div>
	)
}

export function MobileNavigation({ links } : { links: { name: string; href: string;}[] }) {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
	  <DropdownMenu onOpenChange={setMenuOpen}>
		<DropdownMenuTrigger asChild>
		  <Button variant="ghost" className="focus-visible:outline-none focus-visible:ring-transparent">
		  	{menuOpen ? <Cross2Icon height={18} width={18} /> : <HamburgerMenuIcon height={18} width={18} />}
		  </Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="mt-1 sm:hidden">
			<div className="w-screen h-screen p-3 mr-4">
				{links.map(l => (
					<Link href={l.href} key={l.href}>
						<DropdownMenuItem className="text-md p-3 cursor-pointer">
								{l.name}
						</DropdownMenuItem>
					</Link>
				))}
			</div>
		</DropdownMenuContent>
	  </DropdownMenu>
	)
}
