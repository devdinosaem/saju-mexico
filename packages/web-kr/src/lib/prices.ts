export const WON_PER_MYONGTAE = 980

export const ITEM_PRICES = {
  sticker:   0.3, // 명태
  skin:      2,
  character: 3,
} as const

export const PRICES = {
  // 무료
  todaySaju: 0,
  monthCalendar: 0,
  coupleCompat: 0,

  // 유료 (명태)
  aiConsultPerTurn: 0.1,
  exFortune: 0.6,
  yearFortune: 0.6,
  parentFortune: 0.6,
  detailReport: 1,
  celebCard: 2,

  // 출석 보상
  attendanceReward: 0.1,
} as const

export function priceLabel(value: number): string {
  if (value === 0) return "무료"
  return `${value}명태`
}

export function wonLabel(myongtae: number): string {
  return `${Math.round(myongtae * WON_PER_MYONGTAE).toLocaleString()}원`
}
