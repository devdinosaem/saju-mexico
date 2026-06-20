import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Saju México — Descubre tu destino con la astrología coreana",
  description:
    "El arte milenario coreano de los Cuatro Pilares del Destino. Más de 500 años de tradición, ahora con IA. Recibe tu reporte personalizado de +15,000 palabras.",
  openGraph: {
    title: "Saju México — Tu destino escrito en las estrellas coreanas",
    description:
      "Descubre qué dice tu fecha de nacimiento según la tradición coreana de 500 años. Amor, dinero, salud y más.",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
