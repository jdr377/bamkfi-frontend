import { Button } from '@/components/ui/button'
import Link from 'next/link'

import BamkIcon from '@/icons/bamk'
import NusdIcon from '@/icons/nusd'

export default async function Home() {
	return (
		<div className="max-w-screen-xl container flex flex-col gap-8 mt-8">
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-4">
					<div className="rounded-full bg-secondary flex p-8 border border-[#F3E9DD4D]">
						<NusdIcon className="h-14 w-14 stroke-primary" />
					</div>
					<h1 className="text-4xl">NUSD</h1>
				</div>
				<h2 className="max-w-full w-[612px]">
					Bamk.fi is a synthetic dollar protocol built on Bitcoin L1 providing a crypto-native
					solution for money not reliant on the traditional banking system, alongside a globally
					accessible dollar-denominated savings instrument — the Bitcoin Bond.
				</h2>
				<div className="max-w-full w-[612px]">
					<a href="https://unisat.io/market/brc20?tick=%24NUSD" target="_blank" className="grow">
						<Button className="w-full h-14 text-lg">Buy NUSD</Button>
					</a>
				</div>
			</div>
		</div>
	)
}
