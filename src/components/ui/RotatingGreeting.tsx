"use client";

import { useEffect, useState } from "react";

const greetings = [
  { text: "Hello", lang: "en" },
  { text: "হ্যালো", lang: "bn" },
  { text: "Hallo", lang: "de" },
  { text: "Bonjour", lang: "fr" },
  { text: "Hola", lang: "es" },
  { text: "こんにちは", lang: "ja" },
  { text: "नमस्ते", lang: "hi" },
  { text: "안녕하세요", lang: "ko" },
  { text: "你好", lang: "zh" },
  { text: "Merhaba", lang: "tr" },
  { text: "Ciao", lang: "it" },
  { text: "Olá", lang: "pt" },
  { text: "Привет", lang: "ru" },
  { text: "السلام عليكم", lang: "ar" },
] as const;

const INTERVAL_MS = 2800;

export function RotatingGreeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % greetings.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const greeting = greetings[index] ?? greetings[0];

  return (
    <span className="inline-block perspective-[600px]" aria-hidden="true">
      <span key={greeting.text} lang={greeting.lang} className="inline-block animate-flip-in">
        {greeting.text}
      </span>
    </span>
  );
}
