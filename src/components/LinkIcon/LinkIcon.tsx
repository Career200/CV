import React from 'react';
import './LinkIcon.scss';

interface LinkIconProps {
	href: string;
	icon: string;
	alt: string;
}

export const LinkIcon: React.FC<LinkIconProps> = ({ href, icon, alt }) => {
	return (
		<a href={href} className="link-icon" target="_blank" rel="noopener noreferrer" aria-label={alt}>
			<img src={icon} alt={alt} width="30" height="30" />
		</a>
	);
};
