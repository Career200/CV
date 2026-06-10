import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./ProjectPopover.scss";

interface ProjectPopoverProps {
  href: string;
  stack: string[];
  blurb: string;
  children: ReactNode;
}

const VIEWPORT_MARGIN = 12;

const isTouchDevice = !window.matchMedia("(hover: hover)").matches;

export const ProjectPopover = ({
  href,
  stack,
  blurb,
  children
}: ProjectPopoverProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const bubbleId = useId();

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return;

    const clamp = () => {
      bubble.style.setProperty("--shift", "0px");
      const rect = bubble.getBoundingClientRect();
      let shift = 0;
      if (rect.left < VIEWPORT_MARGIN) {
        shift = VIEWPORT_MARGIN - rect.left;
      } else if (rect.right > window.innerWidth - VIEWPORT_MARGIN) {
        shift = window.innerWidth - VIEWPORT_MARGIN - rect.right;
      }
      bubble.style.setProperty("--shift", `${Math.round(shift)}px`);
    };

    clamp();
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <span ref={rootRef} className={`project-popover${open ? " open" : ""}`}>
      <a
        href={href}
        className="popover-trigger"
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={bubbleId}
        aria-expanded={isTouchDevice ? open : undefined}
        onClick={(e) => {
          if (isTouchDevice) {
            e.preventDefault();
            setOpen((isOpen) => !isOpen);
          }
        }}
      >
        {children}
      </a>
      <span
        ref={bubbleRef}
        id={bubbleId}
        role="tooltip"
        className="popover-bubble"
      >
        <span className="popover-card">
          <span className="popover-blurb">{blurb}</span>
          <span className="popover-stack">
            {stack.map((item) => (
              <span key={item} className="stack-chip">
                {item}
              </span>
            ))}
          </span>
          {isTouchDevice && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="popover-link"
              onClick={() => setOpen(false)}
            >
              link ↗
            </a>
          )}
        </span>
      </span>
    </span>
  );
};
