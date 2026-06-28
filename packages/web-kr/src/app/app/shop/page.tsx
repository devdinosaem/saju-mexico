import MyCharacterCard    from "../_components/shop/MyCharacterCard"
import ProductCardGrid    from "../_components/shop/ProductCardGrid"
import TodayFortuneCard   from "../_components/shop/TodayFortuneCard"

export default function ShopPage() {
  return (
    <div className="flex flex-col gap-3 py-3">
      {/* 개인화 헤더 */}
      <p className="text-sm text-text-sub font-medium">
        안녕, <strong className="text-charcoal">경진일주</strong> ✦ 오늘 금(金) 기운 강해 💎
      </p>

      {/* 내 요약 리포트 */}
      <MyCharacterCard />

      {/* 상세 리포트 + 커플 궁합 */}
      <ProductCardGrid />

      {/* 오늘 운세 */}
      <TodayFortuneCard />

      {/* 광고 배너 placeholder */}
      <div className="rounded-xl bg-charcoal/5 border border-charcoal/10 h-14 flex items-center justify-center">
        <span className="text-xs text-text-muted">광고</span>
      </div>
    </div>
  )
}
