import { translateTenGod, translatePhase, ganZhiToElements } from "./translations";

export const LOVE_TEN_GODS = ["정재", "편재", "정관", "편관"];
export const WEALTH_TEN_GODS = ["편재", "정재", "식신"];

export function displayTenGod(korean: string): string {
  return translateTenGod(korean).replace(/^\[/, "").replace(/\]$/, "");
}

export function displayPhase(korean: string): string {
  return translatePhase(korean);
}

export function displayGanZhi(ganZhi: string): string {
  return ganZhiToElements(ganZhi);
}

export function displayDirection(direction: string): string {
  if (direction === "forward" || direction.includes("순행") || direction.includes("Progresiva")) return "Progresiva";
  return "Regresiva";
}

const FORTUNE_DESCRIPTIONS: Record<string, string> = {
  "비견": "Periodo de independencia y competencia. Buen momento para emprender por tu cuenta, pero cuidado con los conflictos por ego.",
  "겁재": "Energía intensa de acción. Grandes oportunidades, pero también riesgo de pérdidas impulsivas. Controla tus gastos.",
  "식신": "Época de creatividad y disfrute. Tu expresión artística florece. Buen momento para crear, cocinar, escribir.",
  "상관": "Periodo de rebeldía productiva. Cuestionas todo y encuentras caminos nuevos. Cuidado con los conflictos laborales.",
  "편재": "¡Ciclo de oportunidades financieras! Dinero puede llegar de fuentes inesperadas. Buen momento para inversiones.",
  "정재": "Estabilidad financiera. Ahorro y crecimiento constante. Buen momento para comprar casa o invertir a largo plazo.",
  "편관": "Periodo de desafíos y presión externa. Puede haber cambios bruscos, pero te fortalecen. Cuidado con la salud.",
  "정관": "Época de reconocimiento y autoridad. Ascensos, títulos, responsabilidades. Tu esfuerzo finalmente se nota.",
  "편인": "Periodo de búsqueda espiritual y aprendizaje alternativo. Intuición aguda. Buen momento para estudiar algo nuevo.",
  "정인": "Época de protección y sabiduría. Mentores aparecen en tu vida. Buen momento para estudiar y crecer internamente.",
};

export function getFortuneDescription(tenGod: string): string {
  return FORTUNE_DESCRIPTIONS[tenGod] || "Un periodo de transformación importante.";
}

export function findLoveEvent(
  yearlyFortunes: { year: number; stemTenGod: string }[],
  majorFortunes: { age: number; ganZhi: string; stemTenGod: string }[],
  birthYear: number,
  currentYear: number,
): { label: string; tenGod: string } | null {
  const loveY = yearlyFortunes.find(y => y.year > currentYear && LOVE_TEN_GODS.includes(y.stemTenGod));
  if (loveY) return { label: String(loveY.year), tenGod: loveY.stemTenGod };
  const loveM = majorFortunes.find(f => birthYear + f.age > currentYear && LOVE_TEN_GODS.includes(f.stemTenGod));
  if (loveM) return { label: `${birthYear + loveM.age}-${birthYear + loveM.age + 9}`, tenGod: loveM.stemTenGod };
  return null;
}

export function findWealthEvent(
  yearlyFortunes: { year: number; stemTenGod: string }[],
  majorFortunes: { age: number; ganZhi: string; stemTenGod: string }[],
  birthYear: number,
  currentYear: number,
  excludeLove?: { label?: string; tenGod?: string; year?: number; stemTenGod?: string } | null,
): { label: string; tenGod: string } | null {
  const excludeTenGod = excludeLove?.tenGod || excludeLove?.stemTenGod;
  const wealthY = yearlyFortunes.find(y =>
    y.year > currentYear && WEALTH_TEN_GODS.includes(y.stemTenGod) &&
    (!excludeLove || y.stemTenGod !== excludeTenGod || y.year !== Number(excludeLove.label || excludeLove.year))
  );
  if (wealthY) return { label: String(wealthY.year), tenGod: wealthY.stemTenGod };
  const wealthM = majorFortunes.find(f =>
    birthYear + f.age > currentYear && WEALTH_TEN_GODS.includes(f.stemTenGod) &&
    (!excludeLove || f.stemTenGod !== excludeTenGod)
  );
  if (wealthM) return { label: `${birthYear + wealthM.age}-${birthYear + wealthM.age + 9}`, tenGod: wealthM.stemTenGod };
  return null;
}

export function findLoveYear(
  yearlyFortunes: { year: number; stemTenGod: string }[],
  majorFortunes: { age: number; stemTenGod: string }[],
  birthYear: number,
  currentYear: number,
): string {
  const loveY = yearlyFortunes.find(y => y.year > currentYear && LOVE_TEN_GODS.includes(y.stemTenGod));
  if (loveY) return `Alrededor de ${loveY.year}`;
  const loveM = majorFortunes.find(f => birthYear + f.age > currentYear && LOVE_TEN_GODS.includes(f.stemTenGod));
  if (loveM) return `Entre ${birthYear + loveM.age}-${birthYear + loveM.age + 9}`;
  return "En tu próxima Gran Estación";
}

export const ELEMENT_LABELS = [
  { key: "wood", label: "Madera", emoji: "🌳" },
  { key: "fire", label: "Fuego", emoji: "🔥" },
  { key: "earth", label: "Tierra", emoji: "⛰️" },
  { key: "metal", label: "Metal", emoji: "💎" },
  { key: "water", label: "Agua", emoji: "💧" },
];
