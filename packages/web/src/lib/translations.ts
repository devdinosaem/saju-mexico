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
  // 영향력 (Influencia) — 중립/긍정
  "장성살": "Influencia de [Comando]",           // [지휘]의 영향력
  "반안살": "Influencia de [Estabilidad]",       // [안정]의 영향력
  "역마살": "Influencia de [Vagabundeo]",        // [방랑]의 영향력
  "화개살": "Influencia de [Espiritualidad]",    // [영성]의 영향력
};

// ── 특수 신살 (特殊神殺) ──
export const SPECIAL_STAR_ES: Record<string, string> = {
  // Energía — 긍정
  "천덕귀인": "Energía de [Protector contra Desastres]",     // [재앙의 수호자]의 기운
  "월덕귀인": "Energía de [Virtud Natural]",                 // [타고난 덕망]의 기운
  "문창귀인": "Energía de [Talento Literario]",              // [글재주]의 기운
  "학당귀인": "Energía de [Éxito en Estudios]",              // [학업 성취]의 기운
  "천을귀인": "Energía de [Protector Supremo]",              // [최고의 수호자]의 기운
  "태극귀인": "Energía de [Intuición Protectora]",           // [직감의 보호]의 기운
  "천복귀인": "Energía de [Bendición Celestial]",            // [하늘의 축복]의 기운
  "암록": "Energía de [Fortuna Oculta]",                     // [숨겨진 재물]의 기운
  "정록": "Energía de [Ingreso Estable]",                    // [안정적 수입]의 기운
  "관귀학관": "Energía de [Éxito por Mérito]",               // [실력으로 성공]의 기운
  "금여성": "Energía de [Pareja Afortunada]",                // [배우자 행운]의 기운
  "천문성": "Energía de [Sabiduría Profunda]",               // [깊은 지혜]의 기운
  "현침살": "Energía de [Análisis Agudo]",                   // [예민한 분석력]의 기운
  // Energía — 양면
  "괴강살": "Energía de [Liderazgo Extremo]",                // [극강의 리더십]의 기운
  "홍염살": "Energía de [Magnetismo Romántico]",             // [연애 자석]의 기운
  "도화살": "Energía de [Atractivo Irresistible]",           // [거부할 수 없는 매력]의 기운
  // Riesgo — 부정
  "백호대살": "Riesgo de [Accidente]",                       // [사고]의 위험
  "비인살": "Riesgo de [Conflicto Súbito]",                  // [급작스러운 다툼]의 위험
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
