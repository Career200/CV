import './Timeline.scss';

export default function Timeline({ children }: any) {
	return (
		<div className="objects">
			<input
				type="range"
				min="1"
				max={children.length * 10}
				className="slider"
				id="myRange"
			/>
			{children}
		</div>
	);
}
