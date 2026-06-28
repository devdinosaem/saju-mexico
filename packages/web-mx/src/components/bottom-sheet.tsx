"use client";

import { useEffect, useRef } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ touchAction: "none" }}
      onTouchMove={(e) => {
        if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
          e.preventDefault();
        }
      }}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 inset-x-0 max-w-[448px] mx-auto bg-bg-secondary rounded-t-3xl animate-slide-up"
        style={{ maxHeight: "90dvh", overflow: "hidden", overscrollBehavior: "none" }}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-text-muted/30" />
        </div>

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors text-xl z-10"
        >
          ✕
        </button>

        <div className="px-6 pb-8">{children}</div>
      </div>
    </div>
  );
}
