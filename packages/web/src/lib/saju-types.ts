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
      fuerte: { name: "El Roble", emoji: "🌳", tagline: "Líder nato que crece sin detenerse", keywords: ["Ambicioso", "Recto", "Líder"], personality: "Siempre tienes un plan. La gente te sigue sin que lo pidas — y a veces eso te pesa." },
      equilibrado: { name: "El Sauce", emoji: "🌿", tagline: "Fuerte por fuera, flexible por dentro", keywords: ["Sabio", "Resiliente", "Noble"], personality: "Pareces tranquilo, pero por dentro analizas todo. Te adaptas sin perder quién eres." },
      sensible: { name: "El Bambú", emoji: "🎋", tagline: "Flexible pero imposible de romper", keywords: ["Creativo", "Adaptable", "Soñador"], personality: "Te han subestimado toda la vida. Pero sigues aquí, más fuerte que los que dudaron de ti." },
    },
    yin: {
      fuerte: { name: "La Enredadera", emoji: "🌱", tagline: "Conquista en silencio, paso a paso", keywords: ["Persistente", "Sutil", "Estratega"], personality: "No necesitas gritar para ganar. Mientras otros compiten, tú ya encontraste otro camino." },
      equilibrado: { name: "La Hierba", emoji: "🍀", tagline: "Donde otros no pueden, tú floreces", keywords: ["Versátil", "Tenaz", "Humilde"], personality: "Creces en cualquier lugar. La gente no sabe cómo lo haces — tú tampoco, simplemente lo haces." },
      sensible: { name: "La Semilla", emoji: "🌰", tagline: "Todo un mundo esperando germinar", keywords: ["Potencial", "Paciente", "Profundo"], personality: "Sientes que tu momento aún no llegó. Pero todo lo que has vivido te está preparando para algo grande." },
    },
  },
  fire: {
    yang: {
      fuerte: { name: "El Sol", emoji: "☀️", tagline: "Ilumina todo, imposible de ignorar", keywords: ["Apasionado", "Carismático", "Valiente"], personality: "Cuando entras a un lugar, la energía cambia. No puedes evitarlo — naciste para brillar." },
      equilibrado: { name: "La Hoguera", emoji: "🔥", tagline: "Calienta a quien se acerca", keywords: ["Generoso", "Intenso", "Protector"], personality: "Das tanto que a veces te olvidas de ti. Los que te conocen saben que eres su lugar seguro." },
      sensible: { name: "La Vela", emoji: "🕯️", tagline: "Luz íntima que guía en la oscuridad", keywords: ["Intuitivo", "Cálido", "Artístico"], personality: "Sientes las cosas antes de que pasen. Tu intuición asusta a los demás — y a veces a ti también." },
    },
    yin: {
      fuerte: { name: "La Brasa", emoji: "🌋", tagline: "Tranquilo por fuera, ardiente por dentro", keywords: ["Reservado", "Apasionado", "Leal"], personality: "Nadie sabe lo intenso que eres por dentro. Solo los que realmente te conocen ven tu fuego." },
      equilibrado: { name: "La Chispa", emoji: "✨", tagline: "Un instante basta para encender todo", keywords: ["Ingenioso", "Rápido", "Brillante"], personality: "Tu mente va más rápido que las palabras. Las ideas te llegan como relámpagos — el reto es elegir cuál seguir." },
      sensible: { name: "La Luciérnaga", emoji: "🪲", tagline: "Brilla en su propio ritmo", keywords: ["Sensible", "Único", "Mágico"], personality: "No encajas en ningún molde — y esa es tu mayor fortaleza. Brillas diferente, y eso está bien." },
    },
  },
  earth: {
    yang: {
      fuerte: { name: "La Montaña", emoji: "🏔️", tagline: "Inamovible, confiable, eterno", keywords: ["Confiable", "Paciente", "Protector"], personality: "Todos acuden a ti cuando todo se derrumba. Eres la roca — pero a veces también necesitas apoyo." },
      equilibrado: { name: "El Valle", emoji: "🌄", tagline: "Acoge todo lo que llega", keywords: ["Receptivo", "Estable", "Generoso"], personality: "Aceptas a las personas como son, sin juzgar. Por eso la gente se abre contigo sin saber por qué." },
      sensible: { name: "La Arena", emoji: "🏖️", tagline: "Se moldea sin perder su esencia", keywords: ["Adaptable", "Empático", "Fluido"], personality: "Absorbes las emociones de los demás como una esponja. Necesitas tiempo a solas para volver a ser tú." },
    },
    yin: {
      fuerte: { name: "La Muralla", emoji: "🧱", tagline: "Protege lo que ama sin rendirse", keywords: ["Firme", "Dedicado", "Fuerte"], personality: "Cuando amas, lo das todo. Tu lealtad no tiene límites — pero ten cuidado con quién la merece." },
      equilibrado: { name: "El Jardín", emoji: "🌺", tagline: "Cultiva belleza donde otros ven tierra", keywords: ["Creativo", "Cuidadoso", "Armónico"], personality: "Ves potencial donde otros ven vacío. Tu talento es transformar lo ordinario en algo hermoso." },
      sensible: { name: "La Arcilla", emoji: "🏺", tagline: "La presión te convierte en obra maestra", keywords: ["Moldeable", "Profundo", "Artístico"], personality: "Los momentos difíciles te han dado forma. Cada cicatriz es parte de la obra de arte que eres." },
    },
  },
  metal: {
    yang: {
      fuerte: { name: "La Espada", emoji: "⚔️", tagline: "Corta directo al punto, sin rodeos", keywords: ["Decidido", "Directo", "Justo"], personality: "Dices lo que piensas y haces lo que dices. Algunos lo llaman frío — tú lo llamas honesto." },
      equilibrado: { name: "El Escudo", emoji: "🛡️", tagline: "Defiende a los suyos sin dudar", keywords: ["Protector", "Leal", "Firme"], personality: "No buscas problemas, pero si alguien toca a los tuyos, no hay fuerza que te detenga." },
      sensible: { name: "La Aguja", emoji: "🪡", tagline: "Preciso donde otros son torpes", keywords: ["Detallista", "Preciso", "Hábil"], personality: "Notas lo que nadie nota. Ese detalle que todos pasan por alto — tú ya lo viste hace rato." },
    },
    yin: {
      fuerte: { name: "La Joya", emoji: "💎", tagline: "Brilla bajo presión, valioso y raro", keywords: ["Elegante", "Valioso", "Refinado"], personality: "No necesitas aprobación. Sabes tu valor — y quienes lo reconocen son los que valen la pena." },
      equilibrado: { name: "La Moneda", emoji: "🪙", tagline: "Dos caras, un solo valor", keywords: ["Práctico", "Justo", "Versátil"], personality: "Ves ambos lados de todo. Eso te hace justo — pero a veces te cuesta tomar partido." },
      sensible: { name: "El Anillo", emoji: "💍", tagline: "Pequeño pero cargado de significado", keywords: ["Sentimental", "Fiel", "Delicado"], personality: "Guardas todo en el corazón. Un gesto pequeño puede alegrarte el día — o arruinarlo." },
    },
  },
  water: {
    yang: {
      fuerte: { name: "El Océano", emoji: "🌊", tagline: "Profundo, poderoso, lleno de misterios", keywords: ["Estratégico", "Profundo", "Misterioso"], personality: "Piensas 5 pasos adelante. La gente ve tu calma — no sabe que ya calculaste todas las jugadas." },
      equilibrado: { name: "El Río", emoji: "🏞️", tagline: "Siempre encuentra su camino", keywords: ["Persistente", "Inteligente", "Fluido"], personality: "Los obstáculos no te detienen — los rodeas. Tu paciencia es tu arma secreta." },
      sensible: { name: "La Lluvia", emoji: "🌧️", tagline: "Nutre todo lo que toca", keywords: ["Generoso", "Sensible", "Renovador"], personality: "Llegas cuando más te necesitan. Tu presencia sana — aunque a veces tú seas quien necesita sanar." },
    },
    yin: {
      fuerte: { name: "La Cascada", emoji: "💦", tagline: "Cae con fuerza, refresca con gracia", keywords: ["Dinámico", "Libre", "Poderoso"], personality: "No puedes quedarte quieto. La rutina te asfixia — necesitas movimiento, cambio, libertad." },
      equilibrado: { name: "El Arroyo", emoji: "🌿", tagline: "Suave pero constante, nunca se detiene", keywords: ["Tranquilo", "Constante", "Sabio"], personality: "No necesitas ser el centro de atención. Tu fuerza está en la constancia — gota a gota, mueves montañas." },
      sensible: { name: "El Rocío", emoji: "💧", tagline: "Delicado pero esencial para la vida", keywords: ["Intuitivo", "Sensible", "Puro"], personality: "Sientes todo con una intensidad que otros no entienden. Es tu don — y tu mayor desafío." },
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
