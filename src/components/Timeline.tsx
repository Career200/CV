import React, { ReactNode, useState, useEffect } from 'react'
import './Timeline.scss'

export default function Timeline({ children }: any) {
	const [value, setValue] = useState(0)
	return (
		<>
			<div className="objects">
				<input
					type="range"
					min="1"
					max={children.length * 10}
					value={value}
					onChange={(e) => setValue(Number(e.target.value))}
					className="slider"
					id="myRange"
				/>
				{children}
			</div>
		</>
	)
}
