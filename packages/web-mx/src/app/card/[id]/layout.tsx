import type { Metadata } from "next";
import { getSaju } from "@/lib/store";

const ELEMENT_LABELS: Record<string, string> = {
  wood: "Madera", fire: "Fuego", earth: "Tierra",
  metal: "Metal", water: "Agua",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let name = "Tu tipo";
  let element = "";
  try {
    const data = (await getSaju(id)) as { name?: string; dayMaster?: { element: string; elementSpanish?: string } } | null;
    if (data?.name) name = data.name;
    if (data?.dayMaster) element = data.dayMaster.elementSpanish || ELEMENT_LABELS[data.dayMaster.element] || "";
  } catch {}

  const title = element ? `${name} — Tipo ${element}` : `Carta Saju de ${name}`;
  return {
    title,
    description: `Descubre el tipo Saju de ${name}. El oráculo coreano de los 4 pilares del destino.`,
    openGraph: {
      title: `${title} — Saju Astral`,
      description: `El tipo Saju de ${name}. Descubre lo que tu horóscopo nunca te dijo.`,
    },
  };
}

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
