import { useState } from 'react'

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT, DESKTOP_BREAKPOINT } from '@/utils/constants'
import useEventListener from './useEventListener'

function useWindowSize(initialWidth?: number, initialHeight?: number) {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : initialWidth,
		height: typeof window !== 'undefined' ? window.innerHeight : initialHeight,
		isMobile:
			(typeof window !== 'undefined' ? window.innerWidth : initialWidth)! < MOBILE_BREAKPOINT,
		isDesktop:
			(typeof window !== 'undefined' ? window.innerWidth : initialWidth)! >= TABLET_BREAKPOINT,
		isLargeDesktop:
			(typeof window !== 'undefined' ? window.innerWidth : initialWidth)! >= DESKTOP_BREAKPOINT
	})

	useEventListener('resize', () => {
		const width = window.innerWidth
		const height = window.innerHeight
		requestAnimationFrame(() => {
			setTimeout(() => {
				setWindowSize({
					width,
					height,
					isMobile: width < MOBILE_BREAKPOINT,
					isDesktop: width >= TABLET_BREAKPOINT,
					isLargeDesktop: width >= DESKTOP_BREAKPOINT
				})
			}, 0)
		})
	})

	return windowSize
}

export default useWindowSize
