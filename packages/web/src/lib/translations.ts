export const TEN_GOD_ES: Record<string, string> = {
  "비견": "Compañero",
  "겁재": "Rival",
  "식신": "Creador",
  "상관": "Rebelde",
  "편재": "Aventurero",
  "정재": "Administrador",
  "편관": "Guerrero",
  "정관": "Líder",
  "편인": "Místico",
  "정인": "Maestro",
};

export const PHASE_ES: Record<string, string> = {
  "장생": "Nacimiento",
  "목욕": "Purificación",
  "관대": "Crecimiento",
  "건록": "Prosperidad",
  "제왕": "Plenitud",
  "쇠": "Declive",
  "병": "Debilidad",
  "사": "Latencia",
  "묘": "Reposo",
  "절": "Corte",
  "태": "Gestación",
  "양": "Nutrición",
};

export const STRENGTH_ES: Record<string, string> = {
  "태강": "Muy Fuerte",
  "신강": "Fuerte",
  "중화": "Equilibrado",
  "신약": "Débil",
  "태약": "Muy Débil",
};

export const ELEMENT_ES: Record<string, string> = {
  "목(木)": "Madera (木)",
  "화(火)": "Fuego (火)",
  "토(土)": "Tierra (土)",
  "금(金)": "Metal (金)",
  "수(水)": "Agua (水)",
  "wood": "Madera",
  "fire": "Fuego",
  "earth": "Tierra",
  "metal": "Metal",
  "water": "Agua",
};

export const DIRECTION_ES: Record<string, string> = {
  "순행": "Progresiva",
  "역행": "Regresiva",
  "Progresiva (순행)": "Progresiva",
  "Regresiva (역행)": "Regresiva",
};

export function translateTenGod(korean: string): string {
  return TEN_GOD_ES[korean] || korean;
}

export function translatePhase(korean: string): string {
  return PHASE_ES[korean] || korean;
}

const ELEMENT_EMOJI: Record<string, string> = {
  wood: "🌳", fire: "🔥", earth: "⛰️", metal: "⚔️", water: "💧",
  Madera: "🌳", Fuego: "🔥", Tierra: "⛰️", Metal: "⚔️", Agua: "💧",
};

const GENERATES_ME: Record<string, string> = {
  wood: "water", fire: "wood", earth: "fire", metal: "earth", water: "metal",
};

const I_CONTROL: Record<string, string> = {
  wood: "earth", fire: "metal", earth: "water", metal: "wood", water: "fire",
};

export function getCompatibleElement(element: string): { element: string; spanish: string; emoji: string; reason: string } {
  const el = element.toLowerCase();
  const compat = GENERATES_ME[el] || "water";
  const es = ELEMENT_ES[compat] || compat;
  return {
    element: compat,
    spanish: es,
    emoji: ELEMENT_EMOJI[compat] || "✦",
    reason: `${es} nutre tu energía de ${ELEMENT_ES[el] || el}`,
  };
}

export function getClashingElement(element: string): { element: string; spanish: string; emoji: string; reason: string } {
  const el = element.toLowerCase();
  const clash = I_CONTROL[el] || "fire";
  const es = ELEMENT_ES[clash] || clash;
  return {
    element: clash,
    spanish: es,
    emoji: ELEMENT_EMOJI[clash] || "✦",
    reason: `${ELEMENT_ES[el] || el} domina a ${es} — genera tensión`,
  };
}

export function translateKorean(text: string): string {
  let result = text;
  for (const [kr, es] of Object.entries(TEN_GOD_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  for (const [kr, es] of Object.entries(PHASE_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  for (const [kr, es] of Object.entries(STRENGTH_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  return result;
}
