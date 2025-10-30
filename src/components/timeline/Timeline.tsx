import './Timeline.scss';
import { useState, useEffect } from 'react';

interface TimelineSection {
	id: string;
	title: string;
}

interface TimelineProps {
	sections: TimelineSection[];
	activeSection: string;
	onSectionClick: (sectionId: string) => void;
}

const getScrollableHeight = () =>
	document.documentElement.scrollHeight - window.innerHeight;

export const Timeline = ({
	sections,
	activeSection,
	onSectionClick
}: TimelineProps) => {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = getScrollableHeight();
			const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			setScrollProgress(progress);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		const scrollPosition = (value / 100) * getScrollableHeight();
		window.scrollTo({ top: scrollPosition, behavior: 'auto' });
	};

	return (
		<nav className="timeline">
			<input
				type="range"
				min="0"
				max="100"
				step="0.1"
				value={scrollProgress}
				onChange={handleSliderChange}
				className="timeline-slider"
			/>
			<div className="timeline-labels">
				{sections.map((section, index) => {
					const isActive = activeSection === section.id;
					const isFirst = index === 0;
					const isLast = index === sections.length - 1;
					const topPercent = (index / (sections.length - 1)) * 100;

					return (
						<div
							key={section.id}
							className={`timeline-label${isActive ? ' active' : ''}${
								isFirst ? ' first' : ''
							}${isLast ? ' last' : ''}`}
							onClick={() => onSectionClick(section.id)}
							style={{ top: `${topPercent}%` }}
						>
							<span className="timeline-title">{section.title}</span>
							<span className="timeline-number">{index + 1}</span>
						</div>
					);
				})}
			</div>
		</nav>
	);
};
