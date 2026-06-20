export interface GlossaryEntry {
  term: string;
  korean: string;
  hanja?: string;
  short: string;
  long: string;
  analogy?: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  saju: {
    term: "Saju",
    korean: "사주",
    hanja: "四柱",
    short: "Los Cuatro Pilares del Destino",
    long: "Sistema coreano de 500 años que analiza tu destino basándose en 4 pilares: año, mes, día y hora de nacimiento. Cada pilar tiene dos caracteres (un Tallo Celestial y una Rama Terrenal) que revelan tu energía única.",
    analogy: "Si la astrología occidental es tu signo zodiacal, el Saju es tu carta natal completa — pero con 518,400 combinaciones posibles en lugar de solo 12 signos.",
  },
  fiveElements: {
    term: "Cinco Elementos",
    korean: "오행",
    hanja: "五行",
    short: "Las 5 energías fundamentales del universo",
    long: "Todo en el universo está compuesto por 5 energías: Madera (木), Fuego (火), Tierra (土), Metal (金) y Agua (水). Estas energías interactúan entre sí — algunas se nutren y otras se controlan mutuamente.",
    analogy: "Piensa en ellos como los 5 ingredientes base de una receta cósmica. Tu carta Saju muestra cuánto de cada ingrediente tienes — y el balance entre ellos define tu personalidad y destino.",
  },
  dayMaster: {
    term: "Pilar del Día",
    korean: "일주",
    hanja: "日柱",
    short: "Tu identidad fundamental — quién eres en esencia",
    long: "El Tallo Celestial de tu pilar del día (일간) es el elemento que te representa. Define tu personalidad central, tu forma de pensar y cómo te relacionas con el mundo.",
    analogy: "Es como tu signo solar en astrología occidental, pero mucho más preciso — no comparte con millones de personas, sino que es parte de tu combinación única.",
  },
  tenGods: {
    term: "Diez Dioses",
    korean: "십신",
    hanja: "十神",
    short: "Las 10 relaciones energéticas en tu carta",
    long: "Los Diez Dioses describen cómo los otros elementos de tu carta se relacionan contigo. Cada uno representa un aspecto de tu vida: creatividad, ambición, riqueza, autoridad, sabiduría y más.",
    analogy: "Imagina que tú eres el personaje principal de una película. Los Diez Dioses son los otros personajes — tu mentor, tu rival, tu aliado, tu fuente de inspiración. La combinación de personajes define la trama de tu vida.",
  },
  twelvePhases: {
    term: "Doce Fases",
    korean: "십이운성",
    hanja: "十二運星",
    short: "El ciclo de energía vital en cada pilar",
    long: "Cada pilar de tu carta pasa por una de 12 fases de energía, desde el nacimiento hasta la renovación. Estas fases indican si la energía en ese pilar está creciendo, en su punto máximo o declinando.",
    analogy: "Como las estaciones del año: primavera (crecimiento), verano (plenitud), otoño (cosecha) e invierno (descanso). Pero aplicado a diferentes áreas de tu vida.",
  },
  spiritStars: {
    term: "Estrellas Especiales",
    korean: "신살",
    hanja: "神煞",
    short: "Marcadores especiales que refinan tu lectura",
    long: "Son indicadores adicionales derivados de la relación entre tus pilares. Algunas son estrellas de buena fortuna (como la Estrella de la Nobleza) y otras son señales de precaución.",
    analogy: "Son como los asteriscos en tu carta — notas al pie que agregan detalles importantes que un análisis superficial podría pasar por alto.",
  },
  majorFortune: {
    term: "Grandes Estaciones",
    korean: "대운",
    hanja: "大運",
    short: "Los ciclos de 10 años que marcan las grandes etapas de tu vida",
    long: "Cada 10 años, la energía dominante en tu vida cambia. Estas Grandes Estaciones determinan los temas principales de cada década — desde oportunidades profesionales hasta relaciones y salud.",
    analogy: "Si tu carta Saju es el mapa, las Grandes Estaciones son el clima. Un buen mapa no cambia, pero el clima sí — y saber qué clima viene te permite prepararte.",
  },
  yearlyFortune: {
    term: "Fortuna Anual",
    korean: "세운",
    hanja: "歲運",
    short: "La energía del año actual y cómo te afecta",
    long: "Cada año trae su propia energía basada en su Tallo y Rama. Cuando esta energía interactúa con tu carta natal, crea oportunidades y desafíos específicos para ti.",
    analogy: "Las Grandes Estaciones son el clima de la década. La Fortuna Anual es el pronóstico del tiempo de este año — más específico y accionable.",
  },
  monthlyFortune: {
    term: "Fortuna Mensual",
    korean: "월운",
    hanja: "月運",
    short: "La energía de cada mes del año",
    long: "Cada mes tiene su propio Tallo y Rama que interactúan con tu carta. Algunos meses serán más favorables que otros para decisiones importantes.",
  },
  yongShin: {
    term: "Elemento de Poder",
    korean: "용신",
    hanja: "用神",
    short: "El elemento que más necesitas para equilibrar tu vida",
    long: "Basándose en el balance de elementos en tu carta, el Elemento de Poder es la energía que te falta o que más te beneficia. Incorporar más de este elemento en tu vida diaria (a través de colores, actividades, alimentos) mejora tu bienestar.",
    analogy: "Si tu carta muestra mucho Metal y poco Agua, el Agua es tu Elemento de Poder — como tomar vitaminas para compensar una deficiencia nutricional, pero a nivel energético.",
  },
  giShin: {
    term: "Elemento a Evitar",
    korean: "기신",
    hanja: "忌神",
    short: "El elemento que tienes en exceso o que te perjudica",
    long: "Es el opuesto del Elemento de Poder. Es la energía que ya tienes demasiado o que desequilibra tu carta. Reducir tu exposición a este elemento puede mejorar tu suerte.",
  },
  strength: {
    term: "Fuerza Interior",
    korean: "신강/신약",
    hanja: "身強/身弱",
    short: "Qué tan fuerte es tu energía personal vs las fuerzas externas",
    long: "Mide el balance entre las energías que te apoyan (aliados) y las que te desafían. No es bueno ni malo — una persona 'fuerte' lidera pero puede ser rígida; una 'débil' es adaptable pero puede ser indecisa.",
    analogy: "Como medir si eres un río caudaloso (fuerte) o un arroyo flexible (débil). Ambos llegan al mar — pero por caminos diferentes.",
  },
  relations: {
    term: "Relaciones entre Pilares",
    korean: "합충형파해",
    hanja: "合沖刑破害",
    short: "Cómo interactúan tus 4 pilares entre sí",
    long: "Los pilares pueden armonizar (合, unirse), chocar (沖, conflicto), castigar (刑), romper (破) o dañar (害) entre sí. Estas interacciones revelan dinámicas internas en tu vida.",
    analogy: "Como las relaciones entre compañeros de equipo: algunos trabajan en perfecta armonía, otros tienen rivalidades productivas, y algunos simplemente chocan.",
  },
  stems: {
    term: "Tallos Celestiales",
    korean: "천간",
    hanja: "天干",
    short: "Los 10 caracteres que representan las energías del cielo",
    long: "Son 10 caracteres (甲乙丙丁戊己庚辛壬癸) que combinan los 5 elementos con yin y yang. Representan la energía visible, tu personalidad exterior y tus acciones conscientes.",
  },
  branches: {
    term: "Ramas Terrenales",
    korean: "지지",
    hanja: "地支",
    short: "Los 12 caracteres que representan las energías de la tierra",
    long: "Son los 12 animales del zodiaco chino/coreano (Rata, Buey, Tigre...). Representan tu energía interna, motivaciones ocultas y el timing de los eventos.",
    analogy: "Si los Tallos son lo que el mundo ve de ti, las Ramas son lo que sientes por dentro — tus motivaciones reales y tu ritmo interno.",
  },
  samjae: {
    term: "Las Tres Calamidades",
    korean: "삼재",
    hanja: "三災",
    short: "三災 = tres desastres. Un ciclo de 3 años de calamidades que llega cada 9 años",
    long: "Las Tres Calamidades (삼재) son el periodo más temido en la tradición coreana. Cada 9 años, un ciclo de 3 años de adversidades llega a tu vida: accidentes, enfermedades, pérdidas financieras y rupturas de relaciones. El primer año es la calamidad de entrada (들삼재), el segundo es la calamidad máxima (눌삼재), y el tercero es la calamidad de salida (날삼재). En Corea, se evitan inversiones, cirugías, mudanzas y cualquier decisión arriesgada durante estos 3 años.",
    analogy: "Es como saber que viene un huracán: no puedes evitarlo, pero si sabes exactamente cuándo llega, puedes reforzar tu casa, guardar provisiones y proteger a tu familia. Ignorar las Tres Calamidades es como ignorar la alerta sísmica.",
  },
};

export type GlossaryKey = keyof typeof GLOSSARY;
