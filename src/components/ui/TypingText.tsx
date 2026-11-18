"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  phrases: readonly string[];
  className?: string;
}

const TYPE_MS = 55;
const DELETE_MS = 30;
const HOLD_MS = 1800;

/**
 * Types each phrase, holds it, deletes it, then moves to the next. The first phrase is rendered
 * in full on the server, so the text is readable before JavaScript runs and for screen readers.
 */
export function TypingText({ phrases, className }: TypingTextProps) {
  const first = phrases[0] ?? "";
  const [text, setText] = useState(first);

  useEffect(() => {
    if (phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let index = 0;
    let current = first;
    let deleting = true;
    let timer = window.setTimeout(tick, HOLD_MS);

    function tick() {
      if (deleting) {
        current = current.slice(0, -1);
        if (current.length === 0) {
          deleting = false;
          index = (index + 1) % phrases.length;
        }
      } else {
        const target = phrases[index] ?? "";
        current = target.slice(0, current.length + 1);
        if (current === target) {
          deleting = true;
          setText(current);
          timer = window.setTimeout(tick, HOLD_MS);
          return;
        }
      }
      setText(current);
      timer = window.setTimeout(tick, deleting ? DELETE_MS : TYPE_MS);
    }

    return () => window.clearTimeout(timer);
  }, [phrases, first]);

  return (
    <span className={className}>
      <span className="sr-only">{first}</span>
      <span aria-hidden="true">
        {text}
        <span className="caret ml-0.5 inline-block h-[1em] w-[0.08em] translate-y-[0.12em] bg-accent" />
      </span>
    </span>
  );
}
