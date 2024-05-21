import { Button } from '@/components/ui/button'
// import Link from 'next/link'

// import BamkIcon from '@/icons/bamk'
import NusdIcon from '@/icons/nusd'
import { Nunito} from 'next/font/google';
import classNames from 'classnames'
import { BAMK_MARKET_URL, NUSD_MARKET_URL } from '@/lib/constants';

const nunito = Nunito({ subsets: ['latin'] })

export default async function Home() {
	return (
		<div className="max-w-screen-xl container flex flex-col gap-8 mt-8">
			<div className="flex flex-col gap-4 md:ml-12">
				<div className="flex items-center gap-4">
					<div className="rounded-full bg-secondary flex p-8 border-2 border-[#F3E9DD4D]">
						<NusdIcon className="h-14 w-14 stroke-primary" />
					</div>
					<h1 className="text-4xl">NUSD</h1>
				</div>
				<h1 className={classNames(nunito, "max-w-full w-[612px] text-2xl mt-2 mb-1 break-words")}>
					BAMK•OF•NAKAMOTO•DOLLAR
				</h1>
				<h2 className="max-w-full w-[612px] leading-7">
					Bamk.fi is a synthetic dollar protocol built on Bitcoin L1 providing a crypto-native
					solution for money not reliant on the traditional banking system, alongside a globally
					accessible dollar-denominated savings instrument — the Bitcoin Bond.
				</h2>
				<div className="max-w-full w-[612px] flex items-center gap-4">
					<a href={NUSD_MARKET_URL} target="_blank" rel="noopener noreferrer" className="grow">
						<Button className="w-full h-14 text-lg">Buy NUSD</Button>
					</a>
					<a href={BAMK_MARKET_URL} target="_blank" rel="noopener noreferrer" className="grow">
						<Button className="w-full h-14 text-lg" variant="secondary">Buy BAMK</Button>
					</a>
				</div>
			</div>
		</div>
	)
}
