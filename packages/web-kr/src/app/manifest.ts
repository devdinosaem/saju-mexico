import type { MetadataRoute } from "next"

// PWA 매니페스트 — Next.js가 자동으로 <link rel="manifest">를 주입한다.
// '홈 화면에 추가' 시 standalone 앱으로 실행되고, 시작 화면은 사주상품 탭.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SAJUPLAY",
    short_name: "SAJUPLAY",
    description: "MBTI는 16개, SAJUPLAY는 120개. 태어난 순간이 정한 진짜 나.",
    start_url: "/v3/shop",
    scope: "/v3",
    display: "standalone",
    background_color: "#FFFEF2",
    theme_color: "#E84B6A",
    lang: "ko",
    orientation: "portrait",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "maskable" },
    ],
  }
}
