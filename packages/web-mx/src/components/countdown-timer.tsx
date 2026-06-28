"use client";

import { useState, useEffect } from "react";

export function CountdownTimer() {
  const [seconds, setSeconds] = useState(20 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev <= 0 ? 20 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-amber text-xs">⏰ Oferta expira en</span>
      <span className="font-mono text-gold text-sm font-bold">
        {mm}:{ss}
      </span>
    </div>
  );
}
