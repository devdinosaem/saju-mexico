export function SajuTILogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <img
      src="/images/SAJUPLAY_LOGO.png"
      alt="SAJUPLAY"
      className={`${className} object-contain select-none`}
      draggable={false}
    />
  );
}
