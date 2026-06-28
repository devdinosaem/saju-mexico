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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saju-mexico.vercel.app"),
  title: {
    default: "Saju Astral — Desde Corea, más allá de tu horóscopo",
    template: "%s | Saju Astral",
  },
  description:
    "El oráculo coreano de los 4 pilares del destino. 500 años de sabiduría ancestral + IA. Descubre lo que tu horóscopo nunca te dijo. Reporte de +15,000 palabras.",
  keywords: [
    "saju", "saju astral", "astrología coreana", "cuatro pilares del destino",
    "carta astral coreana", "horóscopo coreano", "destino", "oráculo coreano",
    "four pillars of destiny", "사주", "México",
  ],
  openGraph: {
    type: "website",
    siteName: "Saju Astral",
    title: "Saju Astral — Desde Corea, más allá de tu horóscopo",
    description:
      "El oráculo coreano de los 4 pilares del destino. Descubre lo que tu horóscopo nunca te dijo.",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saju Astral — Desde Corea, más allá de tu horóscopo",
    description:
      "El oráculo coreano de los 4 pilares del destino. Descubre lo que tu horóscopo nunca te dijo.",
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
