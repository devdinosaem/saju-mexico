"use client";

import { useState, useEffect } from "react";

const NAMES = [
  "Mar***@gmail.com",
  "Car***@hotmail.com",
  "Ana***@gmail.com",
  "Lui***@yahoo.com",
  "Jes***@outlook.com",
  "Rob***@gmail.com",
  "Fer***@gmail.com",
  "Sof***@icloud.com",
  "Dan***@gmail.com",
  "Val***@hotmail.com",
];

export function PurchaseToast() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState(1);

  useEffect(() => {
    const show = () => {
      setName(NAMES[Math.floor(Math.random() * NAMES.length)]);
      setMinutes(Math.floor(Math.random() * 5) + 1);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const initialDelay = setTimeout(show, 8000);
    const interval = setInterval(show, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-30 max-w-[400px] w-[calc(100%-40px)] animate-slide-up">
      <div className="bg-bg-card/95 backdrop-blur-lg rounded-xl px-4 py-3 border border-gold/10 shadow-lg flex items-center gap-3">
        <span className="text-lg">🛒</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate">{name}</p>
          <p className="text-text-muted text-xs">
            compró su reporte hace {minutes} minuto{minutes > 1 ? "s" : ""}
          </p>
        </div>
        <span className="text-gold text-xs">✦</span>
      </div>
    </div>
  );
}
