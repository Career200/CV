import { forwardRef } from 'react';
import type { ComponentType } from 'react';
import './ContentSection.scss';

interface ContentSectionProps {
	id: string;
	title: string;
	body: ComponentType;
}

export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
	({ id, title, body: Body }, ref) => (
		<section id={id} ref={ref} className="content-section">
			<div className="glass-box">
				<h2 className="section-title">{title}</h2>
				<div className="section-content">
					<Body />
				</div>
			</div>
		</section>
	)
);

ContentSection.displayName = 'ContentSection';
