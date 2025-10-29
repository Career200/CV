import { PropsWithChildren, useState } from 'react';
import './Fadeout.scss';

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
			className="fadeout-container"
			style={{
				animationDelay: `${timeout}ms`,
				animationDuration: `${duration}ms`
			}}
		>
			{children}
		</div>
	);
};
