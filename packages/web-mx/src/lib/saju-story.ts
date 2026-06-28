const ELEMENT_EMOJI: Record<string, string> = {
  wood: "🌳", fire: "🔥", earth: "⛰️", metal: "💎", water: "💧",
};

const ELEMENT_ES: Record<string, string> = {
  wood: "Madera", fire: "Fuego", earth: "Tierra", metal: "Metal", water: "Agua",
};

const ELEMENT_METAPHOR: Record<string, string> = {
  wood: "un árbol", fire: "una llama", earth: "una montaña", metal: "una espada", water: "un océano",
};

const ATTACK_METAPHOR: Record<string, Record<string, string>> = {
  wood: { metal: "espadas", fire: "llamas", earth: "rocas", water: "olas", wood: "árboles" },
  fire: { water: "olas", metal: "espadas", earth: "rocas", wood: "ramas", fire: "llamas" },
  earth: { wood: "raíces", water: "olas", fire: "llamas", metal: "espadas", earth: "rocas" },
  metal: { fire: "llamas", wood: "ramas", water: "olas", earth: "rocas", metal: "espadas" },
  water: { earth: "rocas", fire: "llamas", metal: "espadas", wood: "ramas", water: "olas" },
};

export function buildElementIcons(fiveElements: Record<string, number>): { emoji: string; key: string }[] {
  const icons: { emoji: string; key: string }[] = [];
  const order = ["metal", "fire", "earth", "wood", "water"];
  for (const key of order) {
    const count = fiveElements[key] || 0;
    for (let i = 0; i < count; i++) {
      icons.push({ emoji: ELEMENT_EMOJI[key], key });
    }
  }
  return icons;
}

export function buildStoryLine(dayMasterElement: string, fiveElements: Record<string, number>): string {
  const me = dayMasterElement.toLowerCase();
  const meEs = ELEMENT_METAPHOR[me] || "un alma";
  const total = Object.values(fiveElements).reduce((a, b) => a + b, 0) || 1;

  // 가장 많은 원소 (나 제외)
  const others = Object.entries(fiveElements)
    .filter(([k]) => k !== me)
    .sort((a, b) => b[1] - a[1]);

  const dominant = others[0];
  const missing = Object.entries(fiveElements).filter(([, v]) => v === 0);

  if (!dominant) return `Eres ${meEs} en perfecto equilibrio.`;

  const dominantKey = dominant[0];
  const dominantCount = dominant[1];
  const dominantPct = Math.round((dominantCount / total) * 100);
  const dominantMetaphor = ATTACK_METAPHOR[me]?.[dominantKey] || ELEMENT_ES[dominantKey];

  // 극(克) 관계 확인
  const CONTROLS_ME: Record<string, string> = {
    wood: "metal", fire: "water", earth: "wood", metal: "fire", water: "earth",
  };
  const myEnemy = CONTROLS_ME[me];

  if (dominantKey === myEnemy && dominantPct >= 40) {
    return `Eres ${meEs} rodeado de ${dominantCount} ${dominantMetaphor} — por eso eres tan resistente.`;
  }

  if (missing.length > 0) {
    const missingEl = ELEMENT_ES[missing[0][0]];
    return `Eres ${meEs} sin ${missingEl.toLowerCase()} — buscas en el mundo lo que tu carta no tiene.`;
  }

  if (dominantPct >= 40) {
    return `Eres ${meEs} con ${dominantCount} ${dominantMetaphor} a tu lado — una energía poderosa te acompaña.`;
  }

  return `Eres ${meEs} en un mundo de contrastes — tu equilibrio es tu mayor fortaleza.`;
}
