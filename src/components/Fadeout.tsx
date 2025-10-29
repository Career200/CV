import { PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren<{
	timeout?: number;
	duration?: number;
}>;

/**
 * Popup that shows children with a fadeout effect after a set time.
 * unmounts itself after animation ends.
 */
export const Fadeout = ({
	timeout = 2000,
	duration = 500,
	children
}: Props) => {
	const [visible, setVisible] = useState<boolean>(true);

	setTimeout(() => {
		setVisible(false);
	}, timeout + duration);

	if (!visible) {
		return null;
	}

	return (
		<div
			style={{
				animationName: 'fadeout',
				animationTimingFunction: 'ease-in',
				animationFillMode: 'forwards',
				animationDelay: `${timeout}ms`,
				animationDuration: `${duration}ms`
			}}
		>
			{children}
			<style>{`
				@keyframes fadeout {
					from { opacity: 1; }
					to { opacity: 0; }
				}
			`}</style>
		</div>
	);
};
