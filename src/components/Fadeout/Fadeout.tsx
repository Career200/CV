import { PropsWithChildren, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Fadeout.scss';

type Props = PropsWithChildren<{
	timeout?: number;
	duration?: number;
}>;

export const Fadeout = ({
	timeout = 2000,
	duration = 500,
	children
}: Props) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, timeout + duration);

		return () => clearTimeout(timer);
	}, [timeout, duration]);

	if (!visible) {
		return null;
	}

	return createPortal(
		<div
			className="fadeout-container"
			style={{
				animationDelay: `${timeout}ms`,
				animationDuration: `${duration}ms`
			}}
		>
			{children}
		</div>,
		document.body
	);
};
