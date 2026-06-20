// ══════════════════════════════════════
// 프로젝트 전체 사전 — 한글 → 스페인어
// ══════════════════════════════════════

// ── 십신 (十神, 열 가지 신) ──
export const TEN_GOD_ES: Record<string, string> = {
  "비견": "Compañero",            // 동료 — 같은 기운
  "겁재": "Rival",                // 경쟁자 — 재물을 빼앗는 기운
  "식신": "Creador",              // 창조자 — 표현과 창작
  "상관": "Rebelde",              // 반항자 — 권위에 도전
  "편재": "Fortuna Inesperada",   // 뜻밖의 행운 — 투기적 재물
  "정재": "Fortuna Estable",      // 안정적 행운 — 꾸준한 재물
  "편관": "Guerrero",             // 전사 — 외부 압박
  "정관": "Líder",                // 지도자 — 질서와 권위
  "편인": "Místico",              // 신비가 — 비정통 직감
  "정인": "Maestro",              // 스승 — 정통 학문
};

// ── 12운성 (十二運星, 열두 단계 별) ──
export const PHASE_ES: Record<string, string> = {
  "장생": "Nacimiento",     // 탄생
  "목욕": "Purificación",   // 정화, 씻김
  "관대": "Crecimiento",    // 성장, 관을 씀
  "건록": "Prosperidad",    // 번영, 녹봉
  "제왕": "Plenitud",       // 절정, 황제
  "쇠": "Declive",          // 쇠퇴
  "병": "Enfermedad",       // 병듦
  "사": "Amenaza",          // 위협 (死)
  "묘": "Amenaza",          // 위협 (墓)
  "절": "Extinción",        // 소멸
  "태": "Gestación",        // 잉태
  "양": "Nutrición",        // 양육
};

// ── 강약 (身强/身弱) ──
export const STRENGTH_ES: Record<string, string> = {
  "태강": "Alma Dominante",   // 지배적인 영혼
  "신강": "Alma Poderosa",    // 강인한 영혼
  "중화": "Alma Armónica",    // 조화로운 영혼
  "신약": "Alma Receptiva",   // 수용적인 영혼
  "태약": "Alma Sensible",    // 감수성의 영혼
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
  "겁살": "Alerta de Asalto",          // 약탈의 경고
  "재살": "Alerta de Desastre",        // 재앙의 경고
  "천살": "Alerta Celestial",          // 하늘의 경고
  "지살": "Alerta Terrenal",           // 땅의 경고
  "년살": "Alerta Anual",              // 연간 경고
  "월살": "Alerta Mensual",            // 월간 경고
  "망신살": "Alerta de Reputación",    // 명예의 경고
  "육해살": "Alerta de Conflicto",     // 갈등의 경고
  // 기운 (Energía) — 중립/긍정
  "장성살": "Energía de Comando",      // 지휘의 기운
  "반안살": "Energía de Estabilidad",  // 안정의 기운
  "역마살": "Energía de Vagabundeo",   // 방랑의 기운
  "화개살": "Energía Espiritual",      // 영성의 기운
};

// ── 특수 신살 (特殊神殺) ──
export const SPECIAL_STAR_ES: Record<string, string> = {
  // 귀인 (천사/수호)
  "천덕귀인": "Ángel de Virtud Celestial",     // 하늘 덕의 천사
  "월덕귀인": "Ángel de Virtud Lunar",         // 달 덕의 천사
  "문창귀인": "Ángel de las Letras",            // 문학의 천사
  "학당귀인": "Ángel del Conocimiento",         // 지식의 천사
  "천을귀인": "Ángel Guardián Celestial",       // 하늘의 수호천사
  "태극귀인": "Ángel del Origen",               // 근원의 천사
  "천복귀인": "Ángel de Bendición",             // 축복의 천사
  // 번영/성취
  "암록": "Prosperidad Oculta",                 // 숨겨진 번영
  "정록": "Prosperidad Directa",                // 정당한 번영
  "관귀학관": "Puerta del Éxito Académico",     // 학문적 성공의 문
  "금여성": "Estrella de la Pareja Noble",      // 고귀한 배우자의 별
  // 경고/살
  "괴강살": "Alerta de Fuerza Extrema",         // 극강의 경고
  "홍염살": "Energía de Pasión",                // 정열의 기운
  "백호대살": "Alerta del Tigre Blanco",        // 백호의 경고 (사고/수술 주의)
  "도화살": "Energía de Seducción",             // 매력의 기운
  "비인살": "Alerta de Traición",               // 배신의 경고
  // 지혜/영성
  "천문성": "Estrella de la Sabiduría",         // 지혜의 별
  "현침살": "Energía de Mente Aguda",           // 예리한 정신의 기운
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
  "순행": "Progresiva",   // 순행
  "역행": "Regresiva",    // 역행
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

export function translateSpiritStar(korean: string): string {
  return SPIRIT_STAR_ES[korean] || SPECIAL_STAR_ES[korean] || korean;
}

export function translateRelation(description: string): string {
  let result = description;
  // 관계 타입 교체
  for (const [kr, es] of Object.entries(RELATION_TYPE_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  // 지지 동물 교체
  for (const [branch, animal] of Object.entries(BRANCH_ANIMAL_ES)) {
    result = result.replace(new RegExp(branch, 'g'), animal);
  }
  // 오행 교체
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
  for (const [kr, es] of Object.entries(SPIRIT_STAR_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  for (const [kr, es] of Object.entries(SPECIAL_STAR_ES)) {
    result = result.replace(new RegExp(kr, 'g'), es);
  }
  return result;
}

// ── 오행 상생/상극 ──

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
