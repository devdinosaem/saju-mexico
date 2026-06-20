export interface SajuType {
  name: string;
  emoji: string;
  tagline: string;
  keywords: string[];
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
      fuerte: { name: "El Roble", emoji: "🌳", tagline: "Líder nato que crece sin detenerse", keywords: ["Ambicioso", "Recto", "Líder"], personality: "Tu mente siempre tiene un plan claro. Donde otros ven caos, tú ves una dirección." },
      equilibrado: { name: "El Sauce", emoji: "🌳", tagline: "Fuerte por fuera, flexible por dentro", keywords: ["Sabio", "Resiliente", "Noble"], personality: "Tu mayor talento es adaptarte sin perder tu esencia. Eres fuerte y flexible al mismo tiempo." },
      sensible: { name: "El Bambú", emoji: "🌳", tagline: "Flexible pero imposible de romper", keywords: ["Creativo", "Adaptable", "Soñador"], personality: "Tu creatividad es tu superpoder. Encuentras soluciones donde otros solo ven paredes." },
    },
    yin: {
      fuerte: { name: "La Enredadera", emoji: "🌳", tagline: "Conquista en silencio, paso a paso", keywords: ["Persistente", "Sutil", "Estratega"], personality: "Tu inteligencia es silenciosa pero imparable. Avanzas paso a paso, sin prisa y sin pausa." },
      equilibrado: { name: "La Hierba", emoji: "🌳", tagline: "Donde otros no pueden, tú floreces", keywords: ["Versátil", "Tenaz", "Humilde"], personality: "Tu versatilidad es extraordinaria. Floreces en cualquier terreno porque te adaptas con naturalidad." },
      sensible: { name: "La Semilla", emoji: "🌳", tagline: "Todo un mundo esperando germinar", keywords: ["Potencial", "Paciente", "Profundo"], personality: "Llevas dentro un potencial enorme. Tu paciencia es la fuerza que convertirá tus sueños en realidad." },
    },
  },
  fire: {
    yang: {
      fuerte: { name: "El Sol", emoji: "🔥", tagline: "Ilumina todo, imposible de ignorar", keywords: ["Apasionado", "Carismático", "Valiente"], personality: "Tu carisma es magnético. Tienes la energía natural de encender cualquier espacio con tu presencia." },
      equilibrado: { name: "La Hoguera", emoji: "🔥", tagline: "Calienta a quien se acerca", keywords: ["Generoso", "Intenso", "Protector"], personality: "Tu generosidad es infinita. Tienes el don de hacer que cualquier persona se sienta segura contigo." },
      sensible: { name: "La Vela", emoji: "🔥", tagline: "Luz íntima que guía en la oscuridad", keywords: ["Intuitivo", "Cálido", "Artístico"], personality: "Tu intuición es tu brújula. Percibes matices que otros no ven — un talento artístico natural." },
    },
    yin: {
      fuerte: { name: "La Brasa", emoji: "🔥", tagline: "Tranquilo por fuera, ardiente por dentro", keywords: ["Reservado", "Apasionado", "Leal"], personality: "Tu pasión arde por dentro con una intensidad profunda. Esa fuerza interior es inagotable." },
      equilibrado: { name: "La Chispa", emoji: "🔥", tagline: "Un instante basta para encender todo", keywords: ["Ingenioso", "Rápido", "Brillante"], personality: "Tu mente es veloz y brillante. Las ideas te llegan como relámpagos — tu ingenio no tiene límite." },
      sensible: { name: "La Luciérnaga", emoji: "🔥", tagline: "Brilla en su propio ritmo", keywords: ["Sensible", "Único", "Mágico"], personality: "Tu singularidad es tu mayor fortaleza. Tienes una forma única de ver el mundo que nadie más tiene." },
    },
  },
  earth: {
    yang: {
      fuerte: { name: "La Montaña", emoji: "⛰️", tagline: "Inamovible, confiable, eterno", keywords: ["Confiable", "Paciente", "Protector"], personality: "Tu estabilidad es un ancla para todos. Tienes la paciencia y la firmeza que mueve el mundo." },
      equilibrado: { name: "El Valle", emoji: "⛰️", tagline: "Acoge todo lo que llega", keywords: ["Receptivo", "Estable", "Generoso"], personality: "Tu capacidad de escuchar es un don raro. Creas espacios de confianza con naturalidad." },
      sensible: { name: "La Arena", emoji: "⛰️", tagline: "Se moldea sin perder su esencia", keywords: ["Adaptable", "Empático", "Fluido"], personality: "Tu empatía es tu superpoder. Sientes los matices emocionales con una profundidad extraordinaria." },
    },
    yin: {
      fuerte: { name: "La Muralla", emoji: "⛰️", tagline: "Protege lo que ama sin rendirse", keywords: ["Firme", "Dedicado", "Fuerte"], personality: "Tu dedicación no tiene igual. Cuando te comprometes con algo, tu determinación es absoluta." },
      equilibrado: { name: "El Jardín", emoji: "⛰️", tagline: "Cultiva belleza donde otros ven tierra", keywords: ["Creativo", "Cuidadoso", "Armónico"], personality: "Tu talento es ver posibilidades invisibles. Transformas lo ordinario en algo hermoso con facilidad." },
      sensible: { name: "La Arcilla", emoji: "⛰️", tagline: "La presión te convierte en obra maestra", keywords: ["Moldeable", "Profundo", "Artístico"], personality: "Tu sensibilidad artística es profunda. Cada experiencia te moldea y te convierte en alguien más sabio." },
    },
  },
  metal: {
    yang: {
      fuerte: { name: "La Espada", emoji: "⚔️", tagline: "Corta directo al punto, sin rodeos", keywords: ["Decidido", "Directo", "Justo"], personality: "Tu claridad mental es tu arma. Tomas decisiones con una precisión que pocos tienen." },
      equilibrado: { name: "El Escudo", emoji: "⚔️", tagline: "Defiende a los suyos sin dudar", keywords: ["Protector", "Leal", "Firme"], personality: "Tu sentido de justicia es inquebrantable. Tienes el coraje natural de proteger lo que importa." },
      sensible: { name: "La Aguja", emoji: "⚔️", tagline: "Preciso donde otros son torpes", keywords: ["Detallista", "Preciso", "Hábil"], personality: "Tu ojo para el detalle es excepcional. Captas matices que hacen la diferencia entre bueno y perfecto." },
    },
    yin: {
      fuerte: { name: "La Joya", emoji: "⚔️", tagline: "Brilla bajo presión, valioso y raro", keywords: ["Elegante", "Valioso", "Refinado"], personality: "Tu elegancia es innata. Tienes un refinamiento natural que se nota en todo lo que haces." },
      equilibrado: { name: "La Moneda", emoji: "⚔️", tagline: "Dos caras, un solo valor", keywords: ["Práctico", "Justo", "Versátil"], personality: "Tu sentido de la justicia es equilibrado y sabio. Ves las dos caras de todo con claridad única." },
      sensible: { name: "El Anillo", emoji: "⚔️", tagline: "Pequeño pero cargado de significado", keywords: ["Sentimental", "Fiel", "Delicado"], personality: "Tu fidelidad es profunda y auténtica. Valoras los vínculos con una intensidad que pocos alcanzan." },
    },
  },
  water: {
    yang: {
      fuerte: { name: "El Océano", emoji: "💧", tagline: "Profundo, poderoso, lleno de misterios", keywords: ["Estratégico", "Profundo", "Misterioso"], personality: "Tu pensamiento estratégico es tu mayor ventaja. Ves el panorama completo cuando otros ven fragmentos." },
      equilibrado: { name: "El Río", emoji: "💧", tagline: "Siempre encuentra su camino", keywords: ["Persistente", "Inteligente", "Fluido"], personality: "Tu persistencia tranquila es imparable. Encuentras caminos donde otros solo ven muros." },
      sensible: { name: "La Lluvia", emoji: "💧", tagline: "Nutre todo lo que toca", keywords: ["Generoso", "Sensible", "Renovador"], personality: "Tu capacidad de renovar es un don. Donde llegas, las cosas empiezan a florecer." },
    },
    yin: {
      fuerte: { name: "La Cascada", emoji: "💧", tagline: "Cae con fuerza, refresca con gracia", keywords: ["Dinámico", "Libre", "Poderoso"], personality: "Tu energía dinámica es contagiosa. Tienes la vitalidad natural de quien nació para explorar." },
      equilibrado: { name: "El Arroyo", emoji: "💧", tagline: "Suave pero constante, nunca se detiene", keywords: ["Tranquilo", "Constante", "Sabio"], personality: "Tu constancia silenciosa es tu mayor poder. Avanzas sin pausa y logras lo que otros abandonan." },
      sensible: { name: "El Rocío", emoji: "💧", tagline: "Delicado pero esencial para la vida", keywords: ["Intuitivo", "Sensible", "Puro"], personality: "Tu sensibilidad es un radar de alta precisión. Percibes verdades que otros necesitan años para ver." },
    },
  },
};

export function getSajuType(element: string, yinYang: string, strengthScore: number): SajuType {
  const el = element.toLowerCase();
  const yy = yinYang.toLowerCase() === "yang" ? "yang" : "yin";
  const str = getStrengthCategory(strengthScore);
  return TYPE_MAP[el]?.[yy]?.[str] || { name: "El Misterio", emoji: "🔮", tagline: "Un alma única que desafía toda clasificación", keywords: ["Único", "Misterioso", "Especial"], personality: "No encajas en ninguna categoría — y eso te hace extraordinario." };
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
