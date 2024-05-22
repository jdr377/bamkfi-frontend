import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { Mulish, Nunito, Noto_Sans } from 'next/font/google';

import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/header'
import Footer from '@/components/footer'
import classNames from 'classnames'

const mulish = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BAMK•OF•NAKAMOTO•DOLLAR',
	description: 'Bitcoin synthetic dollar protocol',
	twitter: {
		card: 'summary_large_image',
		title: 'BAMK•OF•NAKAMOTO•DOLLAR',
		description: 'Bitcoin synthetic dollar protcol',
		creator: '@bamkfi',
		images: ['https://bamkfi-fontend.vercel.app/unfurl.png']
	},
	openGraph: {
		images: ['https://bamkfi-fontend.vercel.app/unfurl.png']
	}

}

async function getData() {
	const nusdInfo = await fetch('https://open-api.unisat.io/v1/indexer/brc20/$NUSD/info', {
		headers: {
			Authorization: `Bearer ${process.env.UNISAT_API_KEY}`
		},
		next: { revalidate: 600 }
	})
	if (!nusdInfo.ok) {
		console.log(nusdInfo)
		return {}
	}
	const nusdInfoData: { minted: string } = (await nusdInfo.json()).data

	const bestHeight = await fetch('https://open-api.unisat.io/v1/indexer/brc20/bestheight', {
		headers: {
			Authorization: `Bearer ${process.env.UNISAT_API_KEY}`
		},
		next: { revalidate: 600 }
	})
	if (!bestHeight.ok) {
		console.log(bestHeight)
		return {}
	}
	const bestHeightData: { height: number } = (await bestHeight.json()).data;

	return {
		nusdInfoData,
		bestHeightData,
	}
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const data = await getData()

	return (
		<html lang="en" className="h-full">
			<body className={classNames(mulish.className, 'flex flex-col h-full')}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Header data={data} />
					<main className="flex-[1_1_auto]">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
