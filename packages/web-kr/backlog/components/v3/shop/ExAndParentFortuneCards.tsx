/**
 * [BACKLOG] 전남친운/전여친운 + 엄마운/아빠운 상품 카드
 *
 * 원래 위치: src/app/v3/shop/page.tsx
 *   - "전남친운 + 전여친운" 블록 (제거 전 70~89줄)
 *   - "엄마운 + 아빠운" 블록 (제거 전 110~129줄)
 *
 * 복원 방법:
 *   1) 아래 두 블록 JSX를 shop/page.tsx의 "나 사용설명서" Link 아래(전남친운),
 *      "올해운 + 광고" 블록 아래(엄마운)에 각각 다시 붙인다.
 *   2) shop/page.tsx 상단 doodles import에 DoodleExBF, DoodleExGF, DoodleMom, DoodleDad 복구.
 *   3) PRICES.exFortune / PRICES.parentFortune 는 lib/prices.ts에 그대로 존재(미삭제).
 *   4) 함께 제거된 연결 참조(복원 시 같이 되살릴 것):
 *      - charge/page.tsx COSTS: "전남친·전여친운"(exFortune) 행 삭제,
 *        "올해운·부모운"(parentFortune) → "올해운"(yearFortune)로 축소.
 *      - my/page.tsx PURCHASED: "전남친운" 보유 샘플 항목 삭제.
 *
 * 참고: 두들 컴포넌트(DoodleExBF 등) 정의는 @/components/doodles 에 계속 존재함.
 *       이 파일은 tsconfig exclude 대상이라 빌드/타입체크되지 않음(깨진 참조 무관).
 */
import { DoodleExBF, DoodleExGF, DoodleMom, DoodleDad } from "@/components/doodles"
import { PRICES, priceLabel } from "@/lib/prices"

export function ExFortuneCards() {
  return (
    /* 전남친운 + 전여친운 */
    <div className="grid grid-cols-2 gap-2.5">
      {[
        { doodle: <DoodleExBF style={{ width: 30, height: 30 }} />, iconBg: "bg-sky-50", title: "전남친운", sub: "어쩌면 벤츠였을지도..", price: priceLabel(PRICES.exFortune) },
        { doodle: <DoodleExGF style={{ width: 30, height: 30 }} />, iconBg: "bg-pink/15", title: "전여친운", sub: "자니...?", price: priceLabel(PRICES.exFortune) },
      ].map(c => (
        <div key={c.title} className="rounded-2xl bg-white border border-charcoal/10 p-3.5 flex flex-col h-[168px]">
          <div className={`w-10 h-10 rounded-xl ${c.iconBg} border border-charcoal/10 flex items-center justify-center`}>
            {c.doodle}
          </div>
          <div className="mt-2">
            <p className="text-sm font-bold text-charcoal">{c.title}</p>
            <p className="text-[11px] text-text-muted mt-0.5 leading-snug">{c.sub}</p>
          </div>
          <button className="mt-auto w-full py-2 rounded-xl bg-pink/75 text-cream text-[11px] font-semibold active:opacity-80">
            {c.price}
          </button>
        </div>
      ))}
    </div>
  )
}

export function ParentFortuneCards() {
  return (
    /* 엄마운 + 아빠운 */
    <div className="grid grid-cols-2 gap-2.5">
      {[
        { doodle: <DoodleMom style={{ width: 30, height: 30 }} />, iconBg: "bg-red-50", title: "엄마운", sub: "내가 엄마 닮은 거였네", price: priceLabel(PRICES.parentFortune) },
        { doodle: <DoodleDad style={{ width: 30, height: 30 }} />, iconBg: "bg-sky-50", title: "아빠운", sub: "*숙제* 아빠랑 친해지기", price: priceLabel(PRICES.parentFortune) },
      ].map(c => (
        <div key={c.title} className="rounded-2xl bg-white border border-charcoal/10 p-3.5 flex flex-col h-[168px]">
          <div className={`w-10 h-10 rounded-xl ${c.iconBg} border border-charcoal/10 flex items-center justify-center`}>
            {c.doodle}
          </div>
          <div className="mt-2">
            <p className="text-sm font-bold text-charcoal">{c.title}</p>
            <p className="text-[11px] text-text-muted mt-0.5 leading-snug">{c.sub}</p>
          </div>
          <button className="mt-auto w-full py-2 rounded-xl bg-pink/75 text-cream text-[11px] font-semibold active:opacity-80">
            {c.price}
          </button>
        </div>
      ))}
    </div>
  )
}
