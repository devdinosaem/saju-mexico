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
