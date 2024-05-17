import React, { FC, ReactElement, MouseEvent } from 'react'

const NusdIcon: FC<{
	className?: string
	width?: number
	height?: number
	onClick?: (evt: MouseEvent) => void
}> = (props): ReactElement => {
	return (
		<svg
			onClick={props.onClick}
			viewBox="0 0 64 64"
			fill="none"
			className={props.className}
			width={props.width}
			height={props.height}
		>
			<path d="M2 62V2L62 62V2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
			<path
				d="M16.25 39.5L40.25 15.5"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M23 47L47 23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

export default NusdIcon
