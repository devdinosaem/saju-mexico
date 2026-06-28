export const WON_PER_MYONGTAE = 980

export const ITEM_PRICES = {
  sticker:   0.3, // 명태
  character: 2,   // 사진 기준 (이전 코드 3 → 정정)
  skin:      3,   // 사진 기준 (이전 코드 2 → 정정)
} as const

export const PRICES = {
  // ── 무료 ──
  todaySaju: 0,
  monthCalendar: 0,
  coupleCompat: 0,
  friendCompat: 0,

  // ── saju-play 단품 리포트 (정책: 1명태 일괄) ──
  selfManual: 1,      // 나 사용설명서
  sinsal: 1,          // 12·18신살 도감
  nextMonth: 1,       // 다음달 운 미리보기
  someCompat: 1,      // 썸 궁합
  onesidedCompat: 1,  // 짝사랑 궁합

  // ── 기타 리포트 ──
  detailReport: 1,    // 상세 리포트
  celebCard: 2,       // 유명인 카드 뽑기
  yearFortune: 0.6,   // 올해운 미리보기
  parentFortune: 0.6, // 부모/가족 궁합

  // ── 상담 ──
  aiConsultPerTurn: 0.1, // 1턴

  // ── 출석 보상 ──
  attendanceReward: 0.1,
} as const

// 구독 — 명태 차감이 아니라 매월 원화 PG 정기결제. 표시만 명태 환산값을 쓴다(₩1,960 ÷ 980 = 2명태).
export const SUBSCRIPTION_MONTHLY_WON = 1960
export const SUBSCRIPTION_MONTHLY_MYONGTAE = 2
export const subscriptionLabel = () => `${SUBSCRIPTION_MONTHLY_MYONGTAE}명태/월`

export function priceLabel(value: number): string {
  if (value === 0) return "무료"
  return `${value}명태`
}

export function wonLabel(myongtae: number): string {
  return `${Math.round(myongtae * WON_PER_MYONGTAE).toLocaleString()}원`
}
