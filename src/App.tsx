import './App.scss';

import { Fadeout } from './components/Fadeout';
import { DarkModeSwitch } from './components/LightSwitch';
import { Timeline } from './components/timeline/Timeline';
import { ContentSection } from './components/ContentSection';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useTouchExpandNav } from './hooks/useTouchExpandNav';
import { useRef } from 'react';

import contentData from './data/content.json';

function App() {
	const navRef = useRef<HTMLElement>(null);
	const sectionIds = contentData.sections.map((section) => section.id);
	const { activeSection, scrollToSection } = useScrollSpy(sectionIds);

	useTouchExpandNav(navRef);

	return (
		<>
			<Fadeout>
				<div className="top-banner">
					<p>Welcome to my portfolio!</p>
				</div>
			</Fadeout>
			<aside className="nav" ref={navRef}>
				<div className="quick-actions">
					<DarkModeSwitch />
				</div>
				<Timeline
					sections={contentData.sections}
					activeSection={activeSection}
					onSectionClick={scrollToSection}
				/>
			</aside>

			<main>
				{contentData.sections.map((section) => (
					<ContentSection
						key={section.id}
						id={section.id}
						title={section.title}
						content={section.content}
					/>
				))}
			</main>
		</>
	);
}

export default App;
