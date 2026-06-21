import type { Metadata } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-pretendard",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "사주TI — MBTI보다 정확한 진짜 나",
    template: "%s | 사주TI",
  },
  description:
    "MBTI는 16개, 사주TI는 120개. 태어난 순간이 정한 진짜 내 유형. 생년월일시만 입력하면 10초 만에 확인.",
  keywords: [
    "사주TI", "사주", "일주", "MBTI", "성격유형", "사주 테스트",
    "무료 사주", "오행", "궁합", "사주 풀이",
  ],
  openGraph: {
    type: "website",
    siteName: "사주TI",
    title: "사주TI — MBTI보다 정확한 진짜 나",
    description: "MBTI는 16개, 사주TI는 120개. 태어난 순간이 정한 내 유형.",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${blackHanSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
