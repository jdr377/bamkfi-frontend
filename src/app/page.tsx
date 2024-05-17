import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
	return (
		<main className="max-w-screen-2xl container flex flex-col gap-6 mt-8">
			<img src="/nusd-banner.png" className="w-[400px]" />
			<h1 className="text-2xl">BAMK•OF•NAKAMOTO•DOLLAR</h1>
			<h2 className="max-w-full w-[612px]">
				Bamk.fi is a synthetic dollar protocol built on Bitcoin L1 providing a crypto-native
				solution for money not reliant on the traditional banking system, alongside a globally
				accessible dollar-denominated savings instrument — the Bitcoin Bond.
			</h2>
			<div className="flex items-center gap-8 max-w-full w-[612px]">
				<a href="https://unisat.io/market/brc20?tick=%24NUSD" target="_blank" className="grow">
					<Button className="w-full h-14 text-lg">Buy NUSD</Button>
				</a>
				<Link href="/buy-bamk" className="grow">
					<Button className="w-full h-14 text-lg" variant="secondary">Buy BAMK</Button>
				</Link>
			</div>
		</main>
	)
}
