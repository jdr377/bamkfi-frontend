import React, { FC, ReactElement, MouseEvent } from 'react'

const BamkIcon: FC<{
	className?: string
	width?: number
	height?: number
	onClick?: (evt: MouseEvent) => void
}> = (props): ReactElement => {
	return (
		<svg
			onClick={props.onClick}
			viewBox="0 0 44 44"
			fill="none"
			className={props.className}
			width={props.width}
			height={props.height}
		>
			<path
				d="M42 2V42L22 22M22 22L2 2V42L22 22Z"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

export default BamkIcon
