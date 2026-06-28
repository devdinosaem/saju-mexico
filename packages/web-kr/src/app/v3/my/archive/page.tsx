"use client"
// ════════════════════════════════════════════════════════════════
// 사주 보관함 — 내가 만든 사주 분석(나·살·다음달 / 썸·짝사랑·친구·커플)을 한 곳에.
// 디자인: 친구/커플 결과화면과 동일 결(두들 Ico·BINGGRAE/GAEGU·핑크·챕터 구분선).
// ════════════════════════════════════════════════════════════════
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DoodleBook, DoodleStar, DoodleCalendar, DoodleHeart, DoodleMoon,
  DoodleSpeechBubble, DoodleRing, DoodleSparkles,
} from "@/components/doodles"

type DoodleC = React.FC<{ className?: string }>
const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

function Ico({ as: D, size = 18 }: { as: DoodleC; size?: number }) {
  return <span className="inline-flex items-center justify-center shrink-0 align-middle" style={{ width: size, height: size }}><D className="w-full h-full" /></span>
}
function ChapterDivider({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pt-1">
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0" style={{ background: PINK }}>{n}</span>
      <span className="text-[15px] text-charcoal shrink-0" style={BINGGRAE}>{title}</span>
      <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
    </div>
  )
}

type Report = { href: string; title: string; sub: string; D: DoodleC; bg: string }

const SELF_REPORTS: Report[] = [
  { href: "/v3/self", title: "나 사용설명서", sub: "타고난 나를 깊게 풀이", D: DoodleBook, bg: "#FFF0F5" },
  { href: "/v3/sinsal", title: "내 신살 도감", sub: "무서운 살의 진짜 뜻", D: DoodleStar, bg: "#FEF3C7" },
  { href: "/v3/nextmonth", title: "다음달 운 미리보기", sub: "운세 날씨·일진 캘린더", D: DoodleCalendar, bg: "#DBEAFE" },
]
const REL_REPORTS: Report[] = [
  { href: "/v3/some", title: "썸 궁합", sub: "그 사람도 날 좋아할까?", D: DoodleHeart, bg: "#FFE9F0" },
  { href: "/v3/onesided", title: "짝사랑 궁합", sub: "그 사람, 내 맘 알까?", D: DoodleMoon, bg: "#EFEAFE" },
  { href: "/v3/compat", title: "친구 궁합", sub: "우리 모임 케미는?", D: DoodleSpeechBubble, bg: "#F0FFF4" },
  { href: "/v3/couple", title: "커플 궁합", sub: "우리, 잘 맞을까?", D: DoodleRing, bg: "#FFF4E0" },
]

function ReportCard({ r }: { r: Report }) {
  return (
    <Link href={r.href} className="rounded-2xl bg-white border border-charcoal/10 p-3.5 flex flex-col gap-2.5 active:opacity-90 transition-opacity">
      <span className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: r.bg }}><Ico as={r.D} size={24} /></span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-charcoal leading-tight" style={BINGGRAE}>{r.title}</p>
        <p className="text-[12px] text-text-muted leading-snug mt-0.5" style={GAEGU}>{r.sub}</p>
      </div>
      <span className="text-[12px] font-bold" style={{ color: PINK }}>보러가기 →</span>
    </Link>
  )
}

export default function SajuArchivePage() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-[13px] text-charcoal/55 active:opacity-60 w-fit">‹ 뒤로</button>

      <div className="flex items-center gap-2">
        <Ico as={DoodleSparkles} size={22} />
        <div>
          <p className="text-[20px] text-charcoal leading-tight" style={BINGGRAE}>사주 보관함</p>
          <p className="text-[13px] text-text-muted" style={GAEGU}>내 사주 분석을 한 곳에 모아봐</p>
        </div>
      </div>

      <ChapterDivider n={1} title="나를 보는 사주" />
      <div className="grid grid-cols-2 gap-2.5">
        {SELF_REPORTS.map(r => <ReportCard key={r.href} r={r} />)}
      </div>

      <ChapterDivider n={2} title="관계를 보는 사주" />
      <div className="grid grid-cols-2 gap-2.5">
        {REL_REPORTS.map(r => <ReportCard key={r.href} r={r} />)}
      </div>
    </div>
  )
}
