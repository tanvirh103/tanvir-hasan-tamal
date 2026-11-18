"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Dhaka",
});

/**
 * The current time in Dhaka, updated every 15 seconds. Rendered only after mount so the static
 * HTML never disagrees with the visitor's clock; until then the time-zone label stands in.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono tabular-nums">
      {time ?? "--:--"} <span className="text-muted">GMT+6</span>
    </span>
  );
}
