// ══════════════════════════════════════
// 프로젝트 전체 사전 — 한글 → 스페인어
// 포맷: [감싸는단어 de 내용] 또는 [감싸는단어 형용사]
// ══════════════════════════════════════

// ── 십신 (十神, 열 가지 신) ──
export const TEN_GOD_ES: Record<string, string> = {
  "비견": "[Fuerza de Autonomía]",            // 자립의 힘
  "겁재": "[Riesgo de Apuesta Audaz]",        // 대담한 승부의 위험
  "식신": "[Fortuna de Creatividad]",          // 창작의 복
  "상관": "[Fuerza de Talento Rebelde]",       // 반항적 재능의 힘
  "편재": "[Fortuna Inesperada]",              // 뜻밖의 복
  "정재": "[Fortuna de Sueldo Fijo]",          // 고정 수입의 복
  "편관": "[Fuerza de Carisma]",               // 카리스마의 힘
  "정관": "[Fuerza de Ascenso]",               // 승진의 힘
  "편인": "[Energía de Intuición]",            // 직감의 기운
  "정인": "[Energía de Protección]",           // 보호의 기운
};

// ── 12운성 (十二運星, 열두 단계 별) ──
export const PHASE_ES: Record<string, string> = {
  "장생": "[Nuevo Comienzo] — buen momento para empezar proyectos y relaciones",
  "목욕": "[Inestabilidad] — periodo de cambios, mantén la calma y evita decisiones impulsivas",
  "관대": "[Preparación] — estás acumulando fuerza, ideal para estudiar y planificar",
  "건록": "[Independencia] — tu mejor momento para actuar con autonomía y confianza",
  "제왕": "[Máximo Poder] — estás en tu punto más alto, aprovecha para liderar",
  "쇠": "[Declive] — momento de soltar, delegar y descansar sin culpa",
  "병": "[Debilitamiento] — cuida tu salud y rodéate de personas que te nutran",
  "사": "[Pausa] — un alto necesario, como el invierno antes de la primavera",
  "묘": "[Latencia] — la energía se guarda bajo la superficie, ten paciencia",
  "절": "[Renovación] — un ciclo termina para que otro mejor pueda nacer",
  "태": "[Nueva Vida] — algo nuevo se está gestando en tu destino",
  "양": "[Gestación] — las bases de tu próximo gran momento se están formando",
};

// ── 음양 (陰陽) ──
export const YINYANG_ES: Record<string, string> = {
  "양": "Sol",    // 태양 — 능동, 외향, 확장
  "음": "Luna",   // 달 — 수용, 내향, 수렴
  "yang": "Sol",
  "yin": "Luna",
  "Yang": "Sol",
  "Yin": "Luna",
};

// ── 강약 (身强/身弱) ──
export const STRENGTH_ES: Record<string, string> = {
  "태강": "Alma Dominante",   // 지배적인 영혼
  "신강": "Alma Poderosa",    // 강인한 영혼
  "중화": "Alma Armónica",    // 조화로운 영혼
  "신약": "Alma Receptiva",   // 수용적인 영혼
  "태약": "Alma Receptiva",   // 수용적인 영혼
};

// ── 오행 (五行) ──
export const ELEMENT_ES: Record<string, string> = {
  "목(木)": "Madera (木)", "화(火)": "Fuego (火)", "토(土)": "Tierra (土)",
  "금(金)": "Metal (金)", "수(水)": "Agua (水)",
  "wood": "Madera", "fire": "Fuego", "earth": "Tierra", "metal": "Metal", "water": "Agua",
};

// ── 12신살 (十二神殺) ──
export const SPIRIT_STAR_ES: Record<string, string> = {
  // 경고 (Alerta) — 부정
  "겁살": "[Alerta de Asalto]",              // 약탈의 경고
  "재살": "[Alerta de Desastre]",            // 재앙의 경고
  "천살": "[Alerta Celestial]",              // 하늘의 경고
  "지살": "[Alerta Terrenal]",               // 땅의 경고
  "년살": "[Alerta Anual]",                  // 연간 경고
  "월살": "[Alerta Mensual]",                // 월간 경고
  "망신살": "[Alerta de Reputación]",        // 명예의 경고
  "육해살": "[Alerta de Conflicto]",         // 갈등의 경고
  // 기운 (Energía) — 중립/긍정
  "장성살": "[Energía de Liderazgo]",        // 리더십의 기운
  "반안살": "[Energía de Estabilidad]",      // 안정의 기운
  "역마살": "[Energía de Vagabundeo]",       // 방랑의 기운
  "화개살": "[Energía de Espiritualidad]",   // 영성의 기운
};

// ── 특수 신살 (特殊神殺) ──
export const SPECIAL_STAR_ES: Record<string, string> = {
  // Energía — 긍정
  "천덕귀인": "[Energía de Protección Divina]",        // 신의 보호의 기운
  "월덕귀인": "[Energía de Virtud Natural]",           // 타고난 덕망의 기운
  "문창귀인": "[Energía de Talento Escrito]",           // 글재주의 기운
  "학당귀인": "[Energía de Éxito Académico]",           // 학업 성취의 기운
  "천을귀인": "[Energía de Protector Supremo]",         // 최고 수호자의 기운
  "태극귀인": "[Energía de Intuición Protectora]",      // 직감 보호의 기운
  "천복귀인": "[Energía de Bendición]",                 // 축복의 기운
  "암록": "[Fortuna Oculta]",                           // 숨겨진 재물
  "정록": "[Fortuna de Ingreso Estable]",               // 안정적 수입의 복
  "관귀학관": "[Energía de Éxito por Mérito]",          // 실력 성공의 기운
  "금여성": "[Fortuna de Buena Pareja]",                // 좋은 배우자의 복
  "천문성": "[Energía de Sabiduría]",                   // 지혜의 기운
  "현침살": "[Energía de Análisis Agudo]",              // 예민한 분석력의 기운
  // Fuerza/Energía — 양면
  "괴강살": "[Fuerza de Liderazgo Extremo]",            // 극강 리더십의 힘
  "홍염살": "[Energía de Magnetismo Romántico]",        // 연애 자석의 기운
  "도화살": "[Energía de Atractivo]",                   // 매력의 기운
  // Riesgo — 부정
  "백호대살": "[Riesgo de Accidente]",                  // 사고의 위험
  "비인살": "[Riesgo de Conflicto Súbito]",             // 급작스러운 다툼의 위험
};

// ── 합충형파해 (合沖刑破害) ──
export const RELATION_TYPE_ES: Record<string, string> = {
  "천간합": "Unión Celestial",        // 하늘의 결합
  "천간충": "Choque Celestial",       // 하늘의 충돌
  "육합": "Armonía Dual",             // 쌍의 조화
  "삼합": "Triple Armonía",           // 삼중 조화
  "방합": "Armonía Direccional",      // 방향의 조화
  "충": "Choque",                     // 충돌
  "형": "Castigo Kármico",            // 업의 벌
  "파": "Ruptura",                    // 파열
  "해": "Daño Sutil",                 // 은밀한 손해
};

// ── 지지 동물 (地支 → 동물) ──
export const BRANCH_ANIMAL_ES: Record<string, string> = {
  "子": "Rata", "丑": "Buey", "寅": "Tigre", "卯": "Conejo",
  "辰": "Dragón", "巳": "Serpiente", "午": "Caballo", "未": "Cabra",
  "申": "Mono", "酉": "Gallo", "戌": "Perro", "亥": "Cerdo",
};

// ── 방향 ──
export const DIRECTION_ES: Record<string, string> = {
  "순행": "Progresiva",
  "역행": "Regresiva",
  "Progresiva (순행)": "Progresiva",
  "Regresiva (역행)": "Regresiva",
};

// ── 오행 이모지 ──
const ELEMENT_EMOJI: Record<string, string> = {
  wood: "🌳", fire: "🔥", earth: "⛰️", metal: "💎", water: "💧",
  Madera: "🌳", Fuego: "🔥", Tierra: "⛰️", Metal: "💎", Agua: "💧",
};

// ══════════════════════════════════════
// 번역 함수
// ══════════════════════════════════════

export function translateTenGod(korean: string): string {
  return TEN_GOD_ES[korean] || korean;
}

export function translatePhase(korean: string): string {
  return PHASE_ES[korean] || korean;
}

const STEM_TO_ELEMENT: Record<string, string> = {
  "甲": "Madera", "乙": "Madera", "丙": "Fuego", "丁": "Fuego",
  "戊": "Tierra", "己": "Tierra", "庚": "Metal", "辛": "Metal",
  "壬": "Agua", "癸": "Agua",
  "갑": "Madera", "을": "Madera", "병": "Fuego", "정": "Fuego",
  "무": "Tierra", "기": "Tierra", "경": "Metal", "신": "Metal",
  "임": "Agua", "계": "Agua",
};
const BRANCH_TO_ELEMENT: Record<string, string> = {
  "子": "Agua", "丑": "Tierra", "寅": "Madera", "卯": "Madera",
  "辰": "Tierra", "巳": "Fuego", "午": "Fuego", "未": "Tierra",
  "申": "Metal", "酉": "Metal", "戌": "Tierra", "亥": "Agua",
  "자": "Agua", "축": "Tierra", "인": "Madera", "묘": "Madera",
  "진": "Tierra", "사": "Fuego", "오": "Fuego", "미": "Tierra",
  "신": "Metal", "유": "Metal", "술": "Tierra", "해": "Agua",
};

const STEM_SOLLUNA: Record<string, string> = {
  "甲": "Sol", "乙": "Luna", "丙": "Sol", "丁": "Luna",
  "戊": "Sol", "己": "Luna", "庚": "Sol", "辛": "Luna",
  "壬": "Sol", "癸": "Luna",
  "갑": "Sol", "을": "Luna", "병": "Sol", "정": "Luna",
  "무": "Sol", "기": "Luna", "경": "Sol", "신": "Luna",
  "임": "Sol", "계": "Luna",
};

export function ganZhiToElements(ganZhi: string): string {
  const clean = ganZhi.replace(/[()（）]/g, "");
  const stem = clean[clean.length - 2];
  const branch = clean[clean.length - 1];
  const stemEl = STEM_TO_ELEMENT[stem];
  const branchEl = BRANCH_TO_ELEMENT[branch];
  const sl = STEM_SOLLUNA[stem];
  if (stemEl && branchEl) return `${stemEl} ${sl || ""} · ${branchEl}`.trim();
  if (stemEl) return stemEl;
  return ganZhi;
}

export function translateSpiritStar(korean: string): string {
  return SPIRIT_STAR_ES[korean] || SPECIAL_STAR_ES[korean] || korean;
}

export function translateRelation(description: string): string {
  let result = description;
  for (const [kr, es] of Object.entries(RELATION_TYPE_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  for (const [branch, animal] of Object.entries(BRANCH_ANIMAL_ES)) {
    result = result.replace(new RegExp(branch, 'g'), animal);
  }
  result = result.replace(/목\(木\)/g, 'Madera');
  result = result.replace(/화\(火\)/g, 'Fuego');
  result = result.replace(/토\(土\)/g, 'Tierra');
  result = result.replace(/금\(金\)/g, 'Metal');
  result = result.replace(/수\(水\)/g, 'Agua');
  result = result.replace(/동방/g, 'Este');
  result = result.replace(/남방/g, 'Sur');
  result = result.replace(/서방/g, 'Oeste');
  result = result.replace(/북방/g, 'Norte');
  return result;
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
  for (const [kr, es] of Object.entries(YINYANG_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  for (const [kr, es] of Object.entries(SPIRIT_STAR_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  for (const [kr, es] of Object.entries(SPECIAL_STAR_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  return result;
}

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
