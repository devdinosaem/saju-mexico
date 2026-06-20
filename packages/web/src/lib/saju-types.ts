export interface SajuType {
  name: string;
  emoji: string;
  tagline: string;
  keywords: string[];
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
      fuerte: { name: "El Roble", emoji: "🌳", tagline: "Líder nato que crece sin detenerse", keywords: ["Ambicioso", "Recto", "Líder"] },
      equilibrado: { name: "El Sauce", emoji: "🌿", tagline: "Fuerte por fuera, flexible por dentro", keywords: ["Sabio", "Resiliente", "Noble"] },
      sensible: { name: "El Bambú", emoji: "🎋", tagline: "Flexible pero imposible de romper", keywords: ["Creativo", "Adaptable", "Soñador"] },
    },
    yin: {
      fuerte: { name: "La Enredadera", emoji: "🌱", tagline: "Conquista en silencio, paso a paso", keywords: ["Persistente", "Sutil", "Estratega"] },
      equilibrado: { name: "La Hierba", emoji: "🍀", tagline: "Donde otros no pueden, tú floreces", keywords: ["Versátil", "Tenaz", "Humilde"] },
      sensible: { name: "La Semilla", emoji: "🌰", tagline: "Todo un mundo esperando germinar", keywords: ["Potencial", "Paciente", "Profundo"] },
    },
  },
  fire: {
    yang: {
      fuerte: { name: "El Sol", emoji: "☀️", tagline: "Ilumina todo, imposible de ignorar", keywords: ["Apasionado", "Carismático", "Valiente"] },
      equilibrado: { name: "La Hoguera", emoji: "🔥", tagline: "Calienta a quien se acerca", keywords: ["Generoso", "Intenso", "Protector"] },
      sensible: { name: "La Vela", emoji: "🕯️", tagline: "Luz íntima que guía en la oscuridad", keywords: ["Intuitivo", "Cálido", "Artístico"] },
    },
    yin: {
      fuerte: { name: "La Brasa", emoji: "🌋", tagline: "Tranquilo por fuera, ardiente por dentro", keywords: ["Reservado", "Apasionado", "Leal"] },
      equilibrado: { name: "La Chispa", emoji: "✨", tagline: "Un instante basta para encender todo", keywords: ["Ingenioso", "Rápido", "Brillante"] },
      sensible: { name: "La Luciérnaga", emoji: "🪲", tagline: "Brilla en su propio ritmo", keywords: ["Sensible", "Único", "Mágico"] },
    },
  },
  earth: {
    yang: {
      fuerte: { name: "La Montaña", emoji: "🏔️", tagline: "Inamovible, confiable, eterno", keywords: ["Confiable", "Paciente", "Protector"] },
      equilibrado: { name: "El Valle", emoji: "🌄", tagline: "Acoge todo lo que llega", keywords: ["Receptivo", "Estable", "Generoso"] },
      sensible: { name: "La Arena", emoji: "🏖️", tagline: "Se moldea sin perder su esencia", keywords: ["Adaptable", "Empático", "Fluido"] },
    },
    yin: {
      fuerte: { name: "La Muralla", emoji: "🧱", tagline: "Protege lo que ama sin rendirse", keywords: ["Firme", "Dedicado", "Fuerte"] },
      equilibrado: { name: "El Jardín", emoji: "🌺", tagline: "Cultiva belleza donde otros ven tierra", keywords: ["Creativo", "Cuidadoso", "Armónico"] },
      sensible: { name: "La Arcilla", emoji: "🏺", tagline: "La presión te convierte en obra maestra", keywords: ["Moldeable", "Profundo", "Artístico"] },
    },
  },
  metal: {
    yang: {
      fuerte: { name: "La Espada", emoji: "⚔️", tagline: "Corta directo al punto, sin rodeos", keywords: ["Decidido", "Directo", "Justo"] },
      equilibrado: { name: "El Escudo", emoji: "🛡️", tagline: "Defiende a los suyos sin dudar", keywords: ["Protector", "Leal", "Firme"] },
      sensible: { name: "La Aguja", emoji: "🪡", tagline: "Preciso donde otros son torpes", keywords: ["Detallista", "Preciso", "Hábil"] },
    },
    yin: {
      fuerte: { name: "La Joya", emoji: "💎", tagline: "Brilla bajo presión, valioso y raro", keywords: ["Elegante", "Valioso", "Refinado"] },
      equilibrado: { name: "La Moneda", emoji: "🪙", tagline: "Dos caras, un solo valor", keywords: ["Práctico", "Justo", "Versátil"] },
      sensible: { name: "El Anillo", emoji: "💍", tagline: "Pequeño pero cargado de significado", keywords: ["Sentimental", "Fiel", "Delicado"] },
    },
  },
  water: {
    yang: {
      fuerte: { name: "El Océano", emoji: "🌊", tagline: "Profundo, poderoso, lleno de misterios", keywords: ["Estratégico", "Profundo", "Misterioso"] },
      equilibrado: { name: "El Río", emoji: "🏞️", tagline: "Siempre encuentra su camino", keywords: ["Persistente", "Inteligente", "Fluido"] },
      sensible: { name: "La Lluvia", emoji: "🌧️", tagline: "Nutre todo lo que toca", keywords: ["Generoso", "Sensible", "Renovador"] },
    },
    yin: {
      fuerte: { name: "La Cascada", emoji: "💦", tagline: "Cae con fuerza, refresca con gracia", keywords: ["Dinámico", "Libre", "Poderoso"] },
      equilibrado: { name: "El Arroyo", emoji: "🌿", tagline: "Suave pero constante, nunca se detiene", keywords: ["Tranquilo", "Constante", "Sabio"] },
      sensible: { name: "El Rocío", emoji: "💧", tagline: "Delicado pero esencial para la vida", keywords: ["Intuitivo", "Sensible", "Puro"] },
    },
  },
};

export function getSajuType(element: string, yinYang: string, strengthScore: number): SajuType {
  const el = element.toLowerCase();
  const yy = yinYang.toLowerCase() === "yang" ? "yang" : "yin";
  const str = getStrengthCategory(strengthScore);
  return TYPE_MAP[el]?.[yy]?.[str] || { name: "El Misterio", emoji: "🔮", tagline: "Un alma única que desafía toda clasificación", keywords: ["Único", "Misterioso", "Especial"] };
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
