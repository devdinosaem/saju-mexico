import type { Metadata } from "next";
import { getSaju } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let name = "Tu destino";
  try {
    const data = (await getSaju(id)) as { name?: string } | null;
    if (data?.name) name = data.name;
  } catch {}

  return {
    title: `Resultado de ${name}`,
    description: `Descubre los 4 pilares del destino de ${name} según el oráculo coreano Saju Astral.`,
    openGraph: {
      title: `Resultado de ${name} — Saju Astral`,
      description: `Los 4 pilares del destino de ${name}. Descubre lo que tu horóscopo nunca te dijo.`,
    },
  };
}

export default function ResultadoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
