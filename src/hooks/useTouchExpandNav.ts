import { useEffect, RefObject } from 'react';

const TOUCH_ZONE = 40;
const NAV_EXPANDED_WIDTH = 200;
const NAV_SWIPE_THRESHOLD = 220;
const AUTO_COLLAPSE_DELAY = 1000;

/**
 * Handles touch gestures to expand/collapse navigation on mobile devices.
 */
export const useTouchExpandNav = (navRef: RefObject<HTMLElement>) => {
	useEffect(() => {
		const isTouchDevice =
			'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (!isTouchDevice) return;

		const nav = navRef.current;
		if (!nav) return;

		let expandTimeout: number | undefined;
		let touchStartX = 0;

		const clearExpandTimeout = () => {
			if (expandTimeout) {
				clearTimeout(expandTimeout);
				expandTimeout = undefined;
			}
		};

		const collapseNav = () => {
			nav.classList.remove('expanded');
		};

		const expandNav = () => {
			nav.classList.add('expanded');
		};

		const handleTouchStart = (e: TouchEvent) => {
			touchStartX = e.touches[0].clientX;
			clearExpandTimeout();

			if (touchStartX >= window.innerWidth - TOUCH_ZONE) {
				expandNav();
			}
		};

		const handleTouchEnd = () => {
			expandTimeout = window.setTimeout(collapseNav, AUTO_COLLAPSE_DELAY);
		};

		const handleTouchMove = (e: TouchEvent) => {
			const touch = e.touches[0];

			if (touch.clientX < window.innerWidth - NAV_SWIPE_THRESHOLD) {
				clearExpandTimeout();
				collapseNav();
			}
		};

		const handleDocumentTouch = (e: TouchEvent) => {
			const touch = e.touches[0];
			if (
				touch.clientX < window.innerWidth - NAV_EXPANDED_WIDTH &&
				nav.classList.contains('expanded')
			) {
				collapseNav();
				clearExpandTimeout();
			}
		};

		nav.addEventListener('touchstart', handleTouchStart, { passive: true });
		nav.addEventListener('touchend', handleTouchEnd, { passive: true });
		nav.addEventListener('touchmove', handleTouchMove, { passive: true });
		document.addEventListener('touchstart', handleDocumentTouch, {
			passive: true
		});

		return () => {
			nav.removeEventListener('touchstart', handleTouchStart);
			nav.removeEventListener('touchend', handleTouchEnd);
			nav.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchstart', handleDocumentTouch);
			clearExpandTimeout();
		};
	}, [navRef]);
};
