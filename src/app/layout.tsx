import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { Mulish, Nunito, Noto_Sans } from 'next/font/google';

import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import Header from '@/components/header'

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
		<html lang="en">
			<body className={mulish.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
