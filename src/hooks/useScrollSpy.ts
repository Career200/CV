import { useEffect, useState, useRef } from 'react';

/**
 * Tracks which section is currently visible in the viewport and provides scroll navigation.
 */
export const useScrollSpy = (sectionIds: string[]) => {
	const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
	const observerRef = useRef<IntersectionObserver | null>(null);
	const headingObserverRef = useRef<IntersectionObserver | null>(null);
	const visibleSectionsRef = useRef(new Set<string>());

	useEffect(() => {
		const visibleSections = visibleSectionsRef.current;

		const headingObserverCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				const sectionId = entry.target.parentElement?.id;
				if (!sectionId) return;

				if (entry.isIntersecting) {
					visibleSections.add(sectionId);
				} else {
					visibleSections.delete(sectionId);
				}
			});

			if (visibleSections.size > 0) {
				for (const id of sectionIds) {
					if (visibleSections.has(id)) {
						setActiveSection(id);
						break;
					}
				}
			}
		};

		const sectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
			if (visibleSections.size === 0) {
				let maxRatio = 0;
				let mostVisibleSection = '';

				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
						maxRatio = entry.intersectionRatio;
						mostVisibleSection = entry.target.id;
					}
				});

				if (mostVisibleSection) {
					setActiveSection(mostVisibleSection);
				}
			}
		};

		headingObserverRef.current = new IntersectionObserver(
			headingObserverCallback,
			{
				rootMargin: '-10% 0px -80% 0px',
				threshold: [0, 0.5, 1]
			}
		);

		observerRef.current = new IntersectionObserver(sectionObserverCallback, {
			threshold: [0, 0.25, 0.5, 0.75, 1]
		});

		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		sections.forEach((section) => {
			observerRef.current?.observe(section);

			const heading = section.querySelector('h2');
			if (heading) {
				headingObserverRef.current?.observe(heading);
			}
		});

		return () => {
			observerRef.current?.disconnect();
			headingObserverRef.current?.disconnect();
			visibleSections.clear();
		};
	}, [sectionIds]);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return { activeSection, scrollToSection };
};
