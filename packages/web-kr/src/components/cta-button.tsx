import { type ButtonHTMLAttributes } from "react"

const GAEGU: React.CSSProperties = {
  fontFamily: "'Cafe24Dongdong', var(--font-gaegu), cursive",
  fontSizeAdjust: 0.52,
  letterSpacing: "normal",
}

const BASE =
  "w-full h-[52px] rounded-xl bg-[#ED7088] border-2 border-charcoal text-cream text-[16px]" +
  " active:opacity-85 transition-opacity flex items-center justify-center gap-2" +
  " disabled:opacity-30 disabled:cursor-not-allowed"

export default function CTAButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={className ? `${BASE} ${className}` : BASE}
      style={GAEGU}
      {...props}
    >
      {children}
    </button>
  )
}
