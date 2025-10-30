import { forwardRef } from 'react';
import './ContentSection.scss';

interface ContentSectionProps {
	id: string;
	title: string;
	content: string;
}

export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
	({ id, title, content }, ref) => (
		<section id={id} ref={ref} className="content-section">
			<div className="glass-box">
				<h2 className="section-title">{title}</h2>
				<div className="section-content">
					<p>{content}</p>
				</div>
			</div>
		</section>
	)
);

ContentSection.displayName = 'ContentSection';
