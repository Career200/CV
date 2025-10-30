import './App.scss';

import { DarkModeSwitch } from './components/LightSwitch/LightSwitch';
import { LinkIcon } from './components/LinkIcon/LinkIcon';
import { Timeline } from './components/timeline/Timeline';
import { ContentSection } from './components/ContentSection/ContentSection';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useTouchExpandNav } from './hooks/useTouchExpandNav';
import { useRef } from 'react';

import contentData from './data/content.json';
import emailIcon from './assets/contact-icons/email.svg';
import githubIcon from './assets/contact-icons/github.svg';
import telegramIcon from './assets/contact-icons/telegram-alt.svg';

function App() {
	const navRef = useRef<HTMLElement>(null);
	const sectionIds = contentData.sections.map((section) => section.id);
	const { activeSection, scrollToSection } = useScrollSpy(sectionIds);

	useTouchExpandNav(navRef);

	return (
		<>
			<aside className="nav" ref={navRef}>
				<div className="quick-actions">
					<DarkModeSwitch />
					<div className="contact-icons">
						<LinkIcon
							href="https://github.com/Career200"
							icon={githubIcon}
							alt="GitHub"
						/>
						<LinkIcon
							href="https://t.me/zhukontime"
							icon={telegramIcon}
							alt="Telegram"
						/>
						<LinkIcon
							href="mailto:zhukontime@gmail.com"
							icon={emailIcon}
							alt="Email"
						/>
					</div>
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
