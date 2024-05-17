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
	title: 'Bamk.fi',
	description: 'Bitcoin synthetic dollar protcol'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="h-full">
			<body className={classNames(mulish.className, 'flex flex-col h-full')}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className="flex-[1_1_auto]">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
