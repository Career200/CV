import { useEffect, RefObject } from "react";

const NAV_EXPANDED_WIDTH = 200;
const SWIPE_COLLAPSE_DISTANCE = 50;
const AUTO_COLLAPSE_DELAY = 600;

export const useTouchExpandNav = (navRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
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
      nav.classList.remove("expanded");
    };

    const expandNav = () => {
      nav.classList.add("expanded");
    };

    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as Element)?.closest(".quick-actions")) return;

      touchStartX = e.touches[0].clientX;
      clearExpandTimeout();
      expandNav();
    };

    const handleTouchEnd = () => {
      if (nav.classList.contains("expanded")) {
        expandTimeout = window.setTimeout(collapseNav, AUTO_COLLAPSE_DELAY);
      }
    };

    const handleTouchCancel = () => {
      handleTouchEnd();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0].clientX - touchStartX > SWIPE_COLLAPSE_DISTANCE) {
        clearExpandTimeout();
        collapseNav();
      }
    };

    const handleDocumentTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (
        touch.clientX < window.innerWidth - NAV_EXPANDED_WIDTH &&
        nav.classList.contains("expanded")
      ) {
        collapseNav();
        clearExpandTimeout();
      }
    };

    nav.addEventListener("touchstart", handleTouchStart, { passive: true });
    nav.addEventListener("touchend", handleTouchEnd, { passive: true });
    nav.addEventListener("touchcancel", handleTouchCancel, { passive: true });
    nav.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchstart", handleDocumentTouch, {
      passive: true
    });

    return () => {
      nav.removeEventListener("touchstart", handleTouchStart);
      nav.removeEventListener("touchend", handleTouchEnd);
      nav.removeEventListener("touchcancel", handleTouchCancel);
      nav.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleDocumentTouch);
      clearExpandTimeout();
    };
  }, [navRef]);
};
