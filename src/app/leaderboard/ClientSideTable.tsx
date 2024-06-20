'use client'

import { useEffect, useState } from 'react'
import { BtcPriceData, MagicEdenBamkData, Reward } from '@/types'
import styles from './ClientSideTable.module.css'
import useWindowSize from '@/utils/useWindowSize'
import classNames from 'classnames'
import shortenAddress from '@/utils/shortenAddress'
import { LeaderboardData } from './types'

export interface ClientSideTableProps {
	magicEdenBamkData: MagicEdenBamkData
	leaderboardData: LeaderboardData
	btcPriceData: BtcPriceData
}

export default function ClientSideTable(data: ClientSideTableProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const { isMobile } = useWindowSize()

	const [latestBlockHeight, setLatestBlockHeight] = useState('Loading...')
	const fetchBtcBlockHeight = async () => {
		const response = await fetch('https://mempool.space/api/blocks/tip/height')
		if (!response.ok) {
			setLatestBlockHeight('Unknown')
			return
		}
		const value = await response.text()
		setLatestBlockHeight(value)
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		fetchBtcBlockHeight()
	}, [])

	const filteredResults = searchTerm
		? data.leaderboardData.rewards.filter(reward =>
				reward.address.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: data.leaderboardData.rewards

	return (
		<div className="max-w-screen-xl mx-0 md:mx-8 mb-8">
			<input
				type="text"
				placeholder="Filter by address"
				className="w-full p-2 border rounded-md bg-input mb-2 bg-zinc-700"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<div className="relative overflow-x-auto shadow-md rounded-lg mt-0.5">
				<table className="w-full text-sm text-left rtl:text-right text-zinc-400">
					<thead className="text-xs uppercase bg-zinc-700 text-zinc-400">
						<tr>
							<th scope="col" className="px-0 py-4 whitespace-nowrap text-center">
								#
							</th>
							<th scope="col" className="pl-1 py-4 whitespace-nowrap">
								Address
							</th>
							<th scope="col" className="px-1 py-3 text-right pr-1">
								Amount&nbsp;🏦
							</th>
							<th scope="col" className="px-1 py-3 text-right pr-2">
								Value
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredResults.length > 0 ? (
							<>
								{filteredResults
									.sort((a: Reward, b: Reward) => b.amount - a.amount)
									.map((reward: Reward, index: number) => {
										const value = reward.amount * Number(data.magicEdenBamkData.floorUnitPrice.formatted) / 100000000 * data.btcPriceData.bitcoin.usd;
										return (
										<tr
											key={reward.address}
											className="border-b bg-zinc-800 border-zinc-700 hover:bg-zinc-600 font-mono"
										>
											<td scope="row" className="pl-1 py-4 whitespace-nowrap text-center">
												{searchTerm
													? data.leaderboardData?.rewards.findIndex(
															(data: any) => data.address === searchTerm
													  ) + 1
													: index + 1}
											</td>
											<td
												scope="row"
												className={classNames(
													'pl-2 py-4 whitespace-nowrap flex items-center',
													styles.longAddressDisplay,
													styles.tableCell
												)}
											>
												{reward.address}
											</td>
											<td
												scope="row"
												className={classNames(
													'pl-2 py-4 whitespace-nowrap flex items-center',
													styles.shortAddressDisplay,
													styles.tableCell
												)}
											>
												{isMobile
													? shortenAddress(5, reward.address)
													: shortenAddress(20, reward.address)}
											</td>
											<td className="px-1 py-4 text-right">
												{reward.amount < 1
													? '< 1'
													: reward.amount?.toLocaleString(undefined, { maximumFractionDigits: 0 }) }
											</td>
											<td className="px-1 py-4 text-right pr-2">
												{data.btcPriceData.bitcoin.usd &&
												reward.amount &&
												Number(data.magicEdenBamkData.floorUnitPrice.formatted)
													?
														value < 0.01
														? '< $0.01'
														: `$${value.toLocaleString(undefined, {
															maximumFractionDigits: value < 1 ? 2 : 0 
														})}`
													: '-'}
											</td>
										</tr>
									)})}
							</>
						) : (
							<tr className="bg-zinc-800 hover:bg-zinc-600">
								<td scope="row" className="px-6 py-4 text-white">
									No data
								</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{data.leaderboardData?.block ? (
				<div className="text-zinc-400 text-right mt-3">
					Latest block: {latestBlockHeight}
					<br />
					Leaderboard synced to block: {data.leaderboardData.block}
				</div>
			) : (
				[]
			)}
		</div>
	)
}
