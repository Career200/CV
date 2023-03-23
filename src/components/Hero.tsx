import React from 'react'

interface props {
	children?: React.ReactNode
}
export default function Hero({ children }: props) {
	return <div>{children}</div>
}
