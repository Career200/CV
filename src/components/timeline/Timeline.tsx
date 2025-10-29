import './Timeline.scss';

export const Timeline = ({ children }: any) => {
	return (
		<div className="timeline">
			{children}
			<input
				type="range"
				defaultValue={0}
				min="1"
				max={children.length * 10}
				className="slider"
				id="myRange"
			/>
		</div>
	);
};
