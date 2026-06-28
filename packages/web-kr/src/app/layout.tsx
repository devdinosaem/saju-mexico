import type { Metadata } from "next";
import { Black_Han_Sans, Jua, Gaegu } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// 본문 폰트는 Pretendard(self-host)로 globals.css @font-face + --font-pretendard에서 정의

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han-sans",
  subsets: ["latin"],
  weight: "400",
});

const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: "400",
});

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "SAJUPLAY — MBTI보다 정확한 진짜 나",
    template: "%s | SAJUPLAY",
  },
  description:
    "MBTI는 16개, SAJUPLAY는 120개. 태어난 순간이 정한 진짜 내 유형. 생년월일시만 입력하면 10초 만에 확인.",
  keywords: [
    "SAJUPLAY", "사주", "일주", "MBTI", "성격유형", "사주 테스트",
    "무료 사주", "오행", "궁합", "사주 풀이",
  ],
  openGraph: {
    type: "website",
    siteName: "SAJUPLAY",
    title: "SAJUPLAY — MBTI보다 정확한 진짜 나",
    description: "MBTI는 16개, SAJUPLAY는 120개. 태어난 순간이 정한 내 유형.",
    locale: "ko_KR",
  },
  // 프로토타입(데모모드) 배포는 검색엔진 색인 차단 — 실제 런칭(플래그 없음)엔 영향 없음.
  ...(process.env.NEXT_PUBLIC_SAMPLE_FRIENDS === "1"
    ? { robots: { index: false, follow: false } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${blackHanSans.variable} ${jua.variable} ${gaegu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  );
}
