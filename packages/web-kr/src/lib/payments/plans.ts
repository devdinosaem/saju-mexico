// 명태 충전 플랜 SSOT — charge 페이지·결제창·성공 적립이 공유.
// 적립 명태는 "확정된 결제금액(원화)"에서 역으로 매핑한다(URL 파라미터 신뢰 X).
export type ChargePlan = {
  key: string
  label: string
  myeongtae: number   // 적립 명태 개수
  krw: number         // 결제 금액(원, 정수)
  desc: string
  highlight: boolean
}

export const CHARGE_PLANS: ChargePlan[] = [
  { key: "small", label: "작은 명태", myeongtae: 1,  krw: 980,  desc: "딱 한 마리", highlight: false },
  { key: "big",   label: "큰 명태",   myeongtae: 10, krw: 9500, desc: "3% 할인",   highlight: true  },
]

/** 확정 결제금액(원) → 적립 명태. 알 수 없는 금액이면 0(적립 안 함). */
export function myeongtaeForKrw(krw: number): number {
  return CHARGE_PLANS.find(p => p.krw === krw)?.myeongtae ?? 0
}
