export interface SajuType {
  name: string;
  emoji: string;
  tagline: string;
  keywords: string[];
  sajuIntro: string;
  personality: string;
}

type Strength = "fuerte" | "equilibrado" | "sensible";

function getStrengthCategory(score: number): Strength {
  if (score >= 1) return "fuerte";
  if (score >= -1) return "equilibrado";
  return "sensible";
}

const TYPE_MAP: Record<string, Record<string, Record<Strength, SajuType>>> = {
  wood: {
    yang: {
      fuerte: { name: "El Roble", emoji: "🌳", tagline: "Líder nato que crece sin detenerse", keywords: ["Ambicioso", "Recto", "Líder"], sajuIntro: "Tu esencia es Madera Sol con energía fuerte — naces con el impulso natural de crecer y liderar.", personality: "Tu mente siempre tiene un plan claro. Donde otros ven caos, tú ves una dirección." },
      equilibrado: { name: "El Sauce", emoji: "🌳", tagline: "Fuerte por fuera, flexible por dentro", keywords: ["Sabio", "Resiliente", "Noble"], sajuIntro: "Tu esencia es Madera Sol en equilibrio — combinas la fuerza del crecimiento con la sabiduría de saber cuándo ceder.", personality: "Tu mayor talento es adaptarte sin perder tu esencia. Eres fuerte y flexible al mismo tiempo." },
      sensible: { name: "El Bambú", emoji: "🌳", tagline: "Flexible pero imposible de romper", keywords: ["Creativo", "Adaptable", "Soñador"], sajuIntro: "Tu esencia es Madera Sol sensible — tu energía creativa fluye como ramas que buscan la luz.", personality: "Tu creatividad es tu superpoder. Encuentras soluciones donde otros solo ven paredes." },
    },
    yin: {
      fuerte: { name: "La Enredadera", emoji: "🌳", tagline: "Conquista en silencio, paso a paso", keywords: ["Persistente", "Sutil", "Estratega"], sajuIntro: "Tu esencia es Madera Luna con fuerza interior — creces en silencio pero con una voluntad imparable.", personality: "Tu inteligencia es silenciosa pero imparable. Avanzas paso a paso, sin prisa y sin pausa." },
      equilibrado: { name: "La Hierba", emoji: "🌳", tagline: "Donde otros no pueden, tú floreces", keywords: ["Versátil", "Tenaz", "Humilde"], sajuIntro: "Tu esencia es Madera Luna en armonía — te adaptas a cualquier terreno sin perder tu naturaleza.", personality: "Tu versatilidad es extraordinaria. Floreces en cualquier terreno porque te adaptas con naturalidad." },
      sensible: { name: "La Semilla", emoji: "🌳", tagline: "Todo un mundo esperando germinar", keywords: ["Potencial", "Paciente", "Profundo"], sajuIntro: "Tu esencia es Madera Luna delicada — guardas dentro un potencial que el tiempo revelará.", personality: "Llevas dentro un potencial enorme. Tu paciencia es la fuerza que convertirá tus sueños en realidad." },
    },
  },
  fire: {
    yang: {
      fuerte: { name: "El Sol", emoji: "🔥", tagline: "Ilumina todo, imposible de ignorar", keywords: ["Apasionado", "Carismático", "Valiente"], sajuIntro: "Tu esencia es Fuego Sol intenso — tu energía arde con la fuerza de quien nació para brillar.", personality: "Tu carisma es magnético. Tienes la energía natural de encender cualquier espacio con tu presencia." },
      equilibrado: { name: "La Hoguera", emoji: "🔥", tagline: "Calienta a quien se acerca", keywords: ["Generoso", "Intenso", "Protector"], sajuIntro: "Tu esencia es Fuego Sol equilibrado — ardes con fuerza pero sabes cuidar a quienes te rodean.", personality: "Tu generosidad es infinita. Tienes el don de hacer que cualquier persona se sienta segura contigo." },
      sensible: { name: "La Vela", emoji: "🔥", tagline: "Luz íntima que guía en la oscuridad", keywords: ["Intuitivo", "Cálido", "Artístico"], sajuIntro: "Tu esencia es Fuego Sol sutil — tu llama es íntima pero ilumina lo que otros no pueden ver.", personality: "Tu intuición es tu brújula. Percibes matices que otros no ven — un talento artístico natural." },
    },
    yin: {
      fuerte: { name: "La Brasa", emoji: "🔥", tagline: "Tranquilo por fuera, ardiente por dentro", keywords: ["Reservado", "Apasionado", "Leal"], sajuIntro: "Tu esencia es Fuego Luna concentrado — tu pasión no explota, arde profundo y constante.", personality: "Tu pasión arde por dentro con una intensidad profunda. Esa fuerza interior es inagotable." },
      equilibrado: { name: "La Chispa", emoji: "🔥", tagline: "Un instante basta para encender todo", keywords: ["Ingenioso", "Rápido", "Brillante"], sajuIntro: "Tu esencia es Fuego Luna ágil — tu mente se enciende rápido y produce ideas que sorprenden.", personality: "Tu mente es veloz y brillante. Las ideas te llegan como relámpagos — tu ingenio no tiene límite." },
      sensible: { name: "La Luciérnaga", emoji: "🔥", tagline: "Brilla en su propio ritmo", keywords: ["Sensible", "Único", "Mágico"], sajuIntro: "Tu esencia es Fuego Luna delicado — brillas de una forma única que nadie puede imitar.", personality: "Tu singularidad es tu mayor fortaleza. Tienes una forma única de ver el mundo que nadie más tiene." },
    },
  },
  earth: {
    yang: {
      fuerte: { name: "La Montaña", emoji: "⛰️", tagline: "Inamovible, confiable, eterno", keywords: ["Confiable", "Paciente", "Protector"], sajuIntro: "Tu esencia es Tierra Sol sólida — tienes la firmeza de quien fue hecho para sostener a otros.", personality: "Tu estabilidad es un ancla para todos. Tienes la paciencia y la firmeza que mueve el mundo." },
      equilibrado: { name: "El Valle", emoji: "⛰️", tagline: "Acoge todo lo que llega", keywords: ["Receptivo", "Estable", "Generoso"], sajuIntro: "Tu esencia es Tierra Sol receptiva — tu energía acoge y nutre todo lo que llega a tu vida.", personality: "Tu capacidad de escuchar es un don raro. Creas espacios de confianza con naturalidad." },
      sensible: { name: "La Arena", emoji: "⛰️", tagline: "Se moldea sin perder su esencia", keywords: ["Adaptable", "Empático", "Fluido"], sajuIntro: "Tu esencia es Tierra Sol flexible — sientes la energía emocional con una profundidad poco común.", personality: "Tu empatía es tu superpoder. Sientes los matices emocionales con una profundidad extraordinaria." },
    },
    yin: {
      fuerte: { name: "La Muralla", emoji: "⛰️", tagline: "Protege lo que ama sin rendirse", keywords: ["Firme", "Dedicado", "Fuerte"], sajuIntro: "Tu esencia es Tierra Luna con determinación — cuando amas algo, nada en el mundo te mueve de ahí.", personality: "Tu dedicación no tiene igual. Cuando te comprometes con algo, tu determinación es absoluta." },
      equilibrado: { name: "El Jardín", emoji: "⛰️", tagline: "Cultiva belleza donde otros ven tierra", keywords: ["Creativo", "Cuidadoso", "Armónico"], sajuIntro: "Tu esencia es Tierra Luna armónica — tienes el don de transformar lo simple en algo extraordinario.", personality: "Tu talento es ver posibilidades invisibles. Transformas lo ordinario en algo hermoso con facilidad." },
      sensible: { name: "La Arcilla", emoji: "⛰️", tagline: "La presión te convierte en obra maestra", keywords: ["Moldeable", "Profundo", "Artístico"], sajuIntro: "Tu esencia es Tierra Luna maleable — cada experiencia te esculpe y te hace más profundo.", personality: "Tu sensibilidad artística es profunda. Cada experiencia te moldea y te convierte en alguien más sabio." },
    },
  },
  metal: {
    yang: {
      fuerte: { name: "La Espada", emoji: "💎", tagline: "Corta directo al punto, sin rodeos", keywords: ["Decidido", "Directo", "Justo"], sajuIntro: "Tu esencia es Metal Sol afilado — tu mente corta la confusión con una claridad natural.", personality: "Tu claridad mental es tu arma. Tomas decisiones con una precisión que pocos tienen." },
      equilibrado: { name: "El Escudo", emoji: "💎", tagline: "Defiende a los suyos sin dudar", keywords: ["Protector", "Leal", "Firme"], sajuIntro: "Tu esencia es Metal Sol protector — naciste con el instinto de defender lo que es justo.", personality: "Tu sentido de justicia es inquebrantable. Tienes el coraje natural de proteger lo que importa." },
      sensible: { name: "La Aguja", emoji: "💎", tagline: "Preciso donde otros son torpes", keywords: ["Detallista", "Preciso", "Hábil"], sajuIntro: "Tu esencia es Metal Sol refinado — percibes detalles invisibles que hacen toda la diferencia.", personality: "Tu ojo para el detalle es excepcional. Captas matices que hacen la diferencia entre bueno y perfecto." },
    },
    yin: {
      fuerte: { name: "La Joya", emoji: "💎", tagline: "Brilla bajo presión, valioso y raro", keywords: ["Elegante", "Valioso", "Refinado"], sajuIntro: "Tu esencia es Metal Luna valioso — la presión no te destruye, te pule hasta brillar.", personality: "Tu elegancia es innata. Tienes un refinamiento natural que se nota en todo lo que haces." },
      equilibrado: { name: "La Moneda", emoji: "💎", tagline: "Dos caras, un solo valor", keywords: ["Práctico", "Justo", "Versátil"], sajuIntro: "Tu esencia es Metal Luna equilibrado — ves ambos lados de todo con una justicia poco común.", personality: "Tu sentido de la justicia es equilibrado y sabio. Ves las dos caras de todo con claridad única." },
      sensible: { name: "El Anillo", emoji: "💎", tagline: "Pequeño pero cargado de significado", keywords: ["Sentimental", "Fiel", "Delicado"], sajuIntro: "Tu esencia es Metal Luna profundo — tus vínculos emocionales tienen un peso que pocos comprenden.", personality: "Tu fidelidad es profunda y auténtica. Valoras los vínculos con una intensidad que pocos alcanzan." },
    },
  },
  water: {
    yang: {
      fuerte: { name: "El Océano", emoji: "💧", tagline: "Profundo, poderoso, lleno de misterios", keywords: ["Estratégico", "Profundo", "Misterioso"], sajuIntro: "Tu esencia es Agua Sol profunda — tu mente opera en niveles que otros ni sospechan.", personality: "Tu pensamiento estratégico es tu mayor ventaja. Ves el panorama completo cuando otros ven fragmentos." },
      equilibrado: { name: "El Río", emoji: "💧", tagline: "Siempre encuentra su camino", keywords: ["Persistente", "Inteligente", "Fluido"], sajuIntro: "Tu esencia es Agua Sol constante — fluyes con una inteligencia que siempre encuentra la salida.", personality: "Tu persistencia tranquila es imparable. Encuentras caminos donde otros solo ven muros." },
      sensible: { name: "La Lluvia", emoji: "💧", tagline: "Nutre todo lo que toca", keywords: ["Generoso", "Sensible", "Renovador"], sajuIntro: "Tu esencia es Agua Sol generosa — donde llegas, la vida empieza a renovarse.", personality: "Tu capacidad de renovar es un don. Donde llegas, las cosas empiezan a florecer." },
    },
    yin: {
      fuerte: { name: "La Cascada", emoji: "💧", tagline: "Cae con fuerza, refresca con gracia", keywords: ["Dinámico", "Libre", "Poderoso"], sajuIntro: "Tu esencia es Agua Luna dinámica — tu energía vital es libre e imposible de contener.", personality: "Tu energía dinámica es contagiosa. Tienes la vitalidad natural de quien nació para explorar." },
      equilibrado: { name: "El Arroyo", emoji: "💧", tagline: "Suave pero constante, nunca se detiene", keywords: ["Tranquilo", "Constante", "Sabio"], sajuIntro: "Tu esencia es Agua Luna serena — tu calma esconde una constancia que todo lo logra.", personality: "Tu constancia silenciosa es tu mayor poder. Avanzas sin pausa y logras lo que otros abandonan." },
      sensible: { name: "El Rocío", emoji: "💧", tagline: "Delicado pero esencial para la vida", keywords: ["Intuitivo", "Sensible", "Puro"], sajuIntro: "Tu esencia es Agua Luna pura — tu sensibilidad capta verdades que el mundo aún no ve.", personality: "Tu sensibilidad es un radar de alta precisión. Percibes verdades que otros necesitan años para ver." },
    },
  },
};

export function getSajuType(element: string, solLuna: string, strengthScore: number): SajuType {
  const el = element.toLowerCase();
  const raw = (solLuna || "yang").toLowerCase();
  const yy = raw === "yang" || raw === "양" || raw === "sol" ? "yang" : "yin";
  const str = getStrengthCategory(strengthScore);
  return TYPE_MAP[el]?.[yy]?.[str] || { name: "El Misterio", emoji: "🔮", tagline: "Un alma única que desafía toda clasificación", keywords: ["Único", "Misterioso", "Especial"], personality: "No encajas en ninguna categoría — y eso te hace extraordinario." };
}

export interface ElementInsight {
  essence: { title: string; emoji: string; label: string; body: string };
  world: { title: string; emoji: string; label: string; body: string };
  meaning: { title: string; emoji: string; label: string; body: string };
}

const EL_NAMES: Record<string, string> = { wood: "Madera", fire: "Fuego", earth: "Tierra", metal: "Metal", water: "Agua" };
const EL_EMOJI: Record<string, string> = { wood: "🌳", fire: "🔥", earth: "⛰️", metal: "💎", water: "💧" };
const EL_NATURE: Record<string, string> = {
  wood: "el crecimiento, la creatividad y la visión",
  fire: "la pasión, el carisma y la acción",
  earth: "la estabilidad, la confianza y la protección",
  metal: "la claridad, la justicia y la precisión",
  water: "la sabiduría, la intuición y la adaptabilidad",
};
const EL_METAPHOR: Record<string, string> = {
  wood: "un árbol", fire: "una llama", earth: "una montaña", metal: "una espada", water: "un río",
};
const EL_PRESSURE: Record<string, string> = {
  wood: "corta y presiona", fire: "seca y consume", earth: "entierra y aplasta",
  metal: "corta y define", water: "inunda y disuelve",
};
const EL_NURTURE: Record<string, string> = {
  wood: "Agua", fire: "Madera", earth: "Fuego", metal: "Tierra", water: "Metal",
};
const EL_NURTURE_KEY: Record<string, string> = {
  wood: "water", fire: "wood", earth: "fire", metal: "earth", water: "metal",
};
const EL_SEEK: Record<string, string> = {
  water: "fluidez, calma y conexiones profundas",
  wood: "crecimiento, nuevos comienzos y naturaleza",
  fire: "pasión, expresión y calidez humana",
  earth: "estabilidad, rutinas y seguridad emocional",
  metal: "orden, claridad y estructura",
};
const YONGSIN_TIP: Record<string, string> = {
  water: "rodearte de azul, vivir cerca del agua o conectar con personas de esencia Agua",
  wood: "rodearte de verde, estar en la naturaleza o conectar con personas de esencia Madera",
  fire: "rodearte de rojo, buscar actividades apasionantes o conectar con personas de esencia Fuego",
  earth: "rodearte de tonos tierra, crear rutinas estables o conectar con personas de esencia Tierra",
  metal: "rodearte de blanco y plateado, organizar tu espacio o conectar con personas de esencia Metal",
};

export function generateElementInsight(
  dayMasterElement: string,
  solLuna: string,
  fiveElements: Record<string, number>,
  strengthScore: number,
  yongShinElement: string,
  dayMasterStem: string,
): ElementInsight {
  const el = dayMasterElement.toLowerCase();
  const total = Object.values(fiveElements).reduce((a, b) => a + b, 0) || 1;
  const rawSL = (solLuna || "yang").toLowerCase();
  const yy = rawSL === "yang" || rawSL === "양" || rawSL === "sol" ? "Sol" : "Luna";

  const sorted = Object.entries(fiveElements).sort((a, b) => b[1] - a[1]);
  const dominantKey = sorted[0][0];
  const dominantCount = sorted[0][1];
  const dominantPct = Math.round((dominantCount / total) * 100);

  const topTied = sorted.filter(([, v]) => v === dominantCount);
  let worldLabel: string;
  let worldEmoji: string;
  if (topTied.length >= 3) {
    worldLabel = "Equilibrio";
    worldEmoji = "⚖️";
  } else if (topTied.length === 2) {
    worldLabel = `${EL_NAMES[topTied[0][0]]} · ${EL_NAMES[topTied[1][0]]}`;
    worldEmoji = `${EL_EMOJI[topTied[0][0]]}${EL_EMOJI[topTied[1][0]]}`;
  } else {
    worldLabel = EL_NAMES[dominantKey];
    worldEmoji = EL_EMOJI[dominantKey];
  }

  const missing = Object.entries(fiveElements).filter(([, v]) => v === 0).map(([k]) => k);
  const nurtureKey = EL_NURTURE_KEY[el];
  const nurtureCount = fiveElements[nurtureKey] || 0;

  // 1. Tu Esencia
  const essence = {
    title: "Tu Esencia",
    emoji: EL_EMOJI[el],
    label: EL_NAMES[el],
    body: `Tu alma es ${EL_NAMES[el]} ${yy} (${dayMasterStem}) — el elemento de ${EL_NATURE[el]}. En el Saju coreano, tu "Día Maestro" (日柱) define quién eres realmente. Eres ${EL_METAPHOR[el]} en esencia.`,
  };

  // 2. Tu Mundo Interior
  let worldBody = "";
  if (dominantKey === el) {
    worldBody = `Tu carta está llena de tu propia energía — ${EL_NAMES[dominantKey]} ${EL_EMOJI[dominantKey]} ocupa el ${dominantPct}% (${dominantCount} de 8). Esto amplifica tu naturaleza al máximo.`;
  } else {
    worldBody = `Tu carta está dominada por ${EL_NAMES[dominantKey]} (${EL_EMOJI[dominantKey]} ${dominantPct}%) — ${dominantCount} de tus 8 caracteres son ${EL_NAMES[dominantKey]}. ${EL_NAMES[dominantKey]} ${EL_PRESSURE[dominantKey]}. El mundo que te rodea constantemente te desafía.`;
  }

  if (missing.length > 0) {
    const missingName = EL_NAMES[missing[0]];
    const missingEmoji = EL_EMOJI[missing[0]];
    if (missing[0] === nurtureKey) {
      worldBody += ` ${missingName} (${missingEmoji}) está completamente ausente — y es justo lo que nutre a tu ${EL_NAMES[el]}. Buscas inconscientemente ${EL_SEEK[missing[0]]}.`;
    } else {
      worldBody += ` ${missingName} (${missingEmoji}) está ausente en tu carta — buscas inconscientemente ${EL_SEEK[missing[0]]}.`;
    }
  } else if (nurtureCount <= 1) {
    worldBody += ` ${EL_NURTURE[el]} (${EL_EMOJI[nurtureKey]}), lo que nutre tu ${EL_NAMES[el]}, es escaso — necesitas buscar activamente esa energía.`;
  }

  const world = { title: "Tu Mundo Interior", emoji: worldEmoji, label: worldLabel, body: worldBody };

  // 3. Lo Que Esto Significa
  let meaningBody = "";
  const isWeak = strengthScore <= -2;
  const isStrong = strengthScore >= 2;

  if (isWeak && dominantKey !== el) {
    meaningBody = `Eres ${EL_METAPHOR[el]} rodeado de ${EL_NAMES[dominantKey]}. Tu ${EL_NAMES[el]} es sensible pero resiliente — no tienes la fuerza bruta, pero tienes algo más valioso: la flexibilidad de adaptarte sin romperte. `;
    meaningBody += `El exceso de ${EL_NAMES[dominantKey]} te ha enseñado a ser preciso, cuidadoso con las decisiones, y a valorar la paz como un tesoro.`;
  } else if (isStrong) {
    meaningBody = `Tu ${EL_NAMES[el]} es tan poderosa que domina todo a tu alrededor. Tienes una energía natural de liderazgo — los demás sienten tu presencia sin que digas una palabra. `;
    meaningBody += `Tu mayor reto es aprender a ceder y escuchar, porque tu fuerza puede abrumar a quienes te rodean.`;
  } else {
    meaningBody = `Tu ${EL_NAMES[el]} está en un punto de equilibrio interesante. No eres ni dominante ni vulnerable — tienes la rara capacidad de leer el ambiente y actuar en el momento justo. `;
    meaningBody += `Tu versatilidad es tu mayor ventaja: puedes ser fuerte cuando se necesita y flexible cuando la situación lo pide.`;
  }

  if (missing.length > 0 && !isStrong) {
    meaningBody += ` La ausencia de ${EL_NAMES[missing[0]]} te hace buscar ${EL_SEEK[missing[0]]} como forma de recargar tu energía.`;
  }

  const ys = yongShinElement.toLowerCase();
  meaningBody += ` Tu Elemento de Poder (用神) es ${EL_NAMES[ys]} ${EL_EMOJI[ys]} — ${YONGSIN_TIP[ys]} activa tu mejor versión.`;

  const meaning = { title: "Lo Que Esto Significa Para Ti", emoji: EL_EMOJI[ys], label: EL_NAMES[ys], body: meaningBody };

  return { essence, world, meaning };
}

export function getInsightLine(element: string, strengthScore: number, fiveElements: Record<string, number>): string {
  const total = Object.values(fiveElements).reduce((a, b) => a + b, 0) || 1;
  const elNames: Record<string, string> = { wood: "Madera", fire: "Fuego", earth: "Tierra", metal: "Metal", water: "Agua" };

  // 가장 많은 원소
  const dominant = Object.entries(fiveElements).sort((a, b) => b[1] - a[1])[0];
  const dominantPct = Math.round((dominant[1] / total) * 100);

  // 없는 원소
  const missing = Object.entries(fiveElements).filter(([, v]) => v === 0).map(([k]) => elNames[k]);

  if (dominantPct >= 50 && missing.length > 0) {
    return `${elNames[dominant[0]]} domina tu carta (${dominantPct}%) y ${missing[0]} está ausente — tu vida es una batalla de contrastes.`;
  }
  if (dominantPct >= 50) {
    return `${elNames[dominant[0]]} domina tu carta con ${dominantPct}% — una energía poderosa que define todo tu camino.`;
  }
  if (missing.length > 0) {
    return `Te falta ${missing[0]} — buscas inconscientemente lo que tu carta no tiene.`;
  }
  if (strengthScore >= 2) {
    return `Tu energía es tan fuerte que los demás te siguen sin pensarlo.`;
  }
  if (strengthScore <= -2) {
    return `Tu fortaleza nace de haber sobrevivido presiones que otros no soportarían.`;
  }
  return `Tienes el raro don del equilibrio — pocos pueden decir lo mismo.`;
}
