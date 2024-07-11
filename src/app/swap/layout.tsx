'use client'

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */

import React from 'react'
import styles from './_styles/swap.module.css'
import classNames from 'classnames'
import Navigation from '@/components/navigation/navigation'

const SwapPage = ({ children }: { children: React.ReactNode }) => {
	const links = React.useMemo(() => {
		const value = [
			{
				name: 'Mint',
				href: '/swap/mint'
			},
			{
				name: 'Redeem',
				href: '/swap/redeem'
			}
		]
		return value
	}, [])
	return (
		<div className={classNames(styles.exchangeContainer, 'px-4')}>
			<div className="flex justify-between mb-2">
				<div className="flex items-center ml-2">
					<Navigation links={links} />
				</div>
			</div>
			{children}
		</div>
	)
}

export default function SwapLayout({ children }: { children: React.ReactNode }) {
	return <SwapPage>{children}</SwapPage>
}
