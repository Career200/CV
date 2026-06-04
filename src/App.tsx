import "./App.scss";

import { DarkModeSwitch } from "./components/LightSwitch/LightSwitch";
import { LinkIcon } from "./components/LinkIcon/LinkIcon";
import { Timeline } from "./components/timeline/Timeline";
import { ContentSection } from "./components/ContentSection/ContentSection";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useTouchExpandNav } from "./hooks/useTouchExpandNav";
import { useMemo, useRef } from "react";

import { sections } from "./content/loader";
import emailIcon from "./assets/contact-icons/email.svg";
import githubIcon from "./assets/contact-icons/github.svg";
import linkedinIcon from "./assets/contact-icons/linkedin.svg";
import telegramIcon from "./assets/contact-icons/telegram-alt.svg";

function App() {
  const navRef = useRef<HTMLElement>(null);
  const sectionIds = useMemo(() => sections.map((section) => section.id), []);
  const { activeSection, scrollToSection } = useScrollSpy(sectionIds);

  useTouchExpandNav(navRef);

  return (
    <>
      <aside className="nav" ref={navRef}>
        <div className="quick-actions">
          <DarkModeSwitch />
          <div className="contact-icons">
            <LinkIcon
              href="https://www.linkedin.com/in/dzhukov404/"
              icon={linkedinIcon}
              alt="LinkedIn"
            />
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
          sections={sections}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />
      </aside>

      <main>
        {sections.map((section) => (
          <ContentSection
            key={section.id}
            id={section.id}
            title={section.title}
            body={section.Body}
          />
        ))}
      </main>
    </>
  );
}

export default App;
