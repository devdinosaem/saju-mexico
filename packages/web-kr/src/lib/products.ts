/**
 * 상품 카탈로그 — 결제 가능한 6개 도메인의 단일 진실 공급원(SSOT).
 *
 * ── ID 컨벤션 ───────────────────────────────────────────────
 *  형식: `{domain}.{slug}`  (점 구분, 소문자, 공백·이모지·한글 없음, **불변**)
 *  예) sticker.crystal_ball · character.gyeongjin_m · skin.pink
 *      report.detail · consult.ai_turn · plan.monthly
 *
 *  - 표시용 한글명(label)·내부 코드키(name, 일주키)와 분리된 결제·DB·entitlement 키.
 *  - 내부 아트 키("경진-m")는 UI 조회 전용으로 그대로 두고, 결제 id는 여기서 로마자로 파생한다.
 *
 * ── 지급 모델(grant) ────────────────────────────────────────
 *  permanent  : 영구 소유 (소품·캐릭터·스킨) → owned 목록에 id 적재
 *  consumable : 1회 소모/해금 (상담 턴·리포트) → 명태 차감
 *  term       : 기간제 (구독) → { startsAt, expiresAt } entitlement, isSubscribed는 파생
 */

import { ALL_STICKERS, type StickerElement } from "@/components/doodle-categories"
import { ITEM_PRICES, PRICES, SUBSCRIPTION_MONTHLY_WON } from "@/lib/prices"

export type ProductType =
  | "sticker" | "character" | "skin"        // 영구 자산
  | "report" | "consult"                    // 소모형
  | "subscription"                          // 기간제

export type GrantModel = "permanent" | "consumable" | "term"
export type TermUnit = "month" | "year"

export type Price = { myongtae?: number; won?: number }

export type Product = {
  id: string
  type: ProductType
  grant: GrantModel
  price: Price
  /** 구독(term)일 때만: 1회 결제로 늘어나는 기간 */
  term?: { unit: TermUnit; length: number }
}

export const PRODUCT_DOMAINS = ["sticker", "character", "skin", "report", "consult", "plan"] as const
export type ProductDomain = typeof PRODUCT_DOMAINS[number]

// ── 슬러그/ID 유틸 ───────────────────────────────────────────

const COLOR_EMOJI: Record<string, string> = {
  "🪵": "wood", "🔴": "red", "🟠": "orange", "🟡": "yellow",
  "🟢": "green", "🔵": "blue", "🟣": "purple", "🩷": "pink",
}

/** 내부 영문 name → 안전한 슬러그. 공백·이모지·카멜케이스 처리. */
export function slugify(raw: string): string {
  let s = raw
  for (const [emoji, word] of Object.entries(COLOR_EMOJI)) s = s.split(emoji).join(` ${word} `)
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // CrystalBall → Crystal Ball
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

export function pid(domain: ProductDomain, slug: string): string {
  return `${domain}.${slug}`
}

// ── 캐릭터 일주키("경진-m") → 로마자 슬러그("gyeongjin_m") ──

const STEM_ROMAJI: Record<string, string> = {
  갑: "gap", 을: "eul", 병: "byeong", 정: "jeong", 무: "mu",
  기: "gi", 경: "gyeong", 신: "sin", 임: "im", 계: "gye",
}
const BRANCH_ROMAJI: Record<string, string> = {
  자: "ja", 축: "chuk", 인: "in", 묘: "myo", 진: "jin", 사: "sa",
  오: "o", 미: "mi", 신: "sin", 유: "yu", 술: "sul", 해: "hae",
}

/** "경진-m" → "gyeongjin_m". 형식이 안 맞으면 안전하게 슬러그 폴백. */
export function romanizeIljuKey(key: string): string {
  const m = key.match(/^(.)(.)-(m|f)$/)
  if (!m) return slugify(key)
  const [, stem, branch, g] = m
  const r1 = STEM_ROMAJI[stem]
  const r2 = BRANCH_ROMAJI[branch]
  if (!r1 || !r2) return slugify(key)
  return `${r1}${r2}_${g}`
}

// ── 도메인별 상품 id 파생 헬퍼 ──────────────────────────────

export const stickerPid   = (name: string) => pid("sticker", slugify(name))
export const characterPid = (iljuKey: string) => pid("character", romanizeIljuKey(iljuKey))
export const skinPid      = (skinId: string) => pid("skin", slugify(skinId))

// ── 자산 도메인 상품 (영구) ─────────────────────────────────

export type StickerProduct = Product & {
  type: "sticker"
  name: string            // 내부 영문 키
  label?: string          // 고객 노출 한글명
  element?: StickerElement // 오행
}

/** 소품 카탈로그 — ALL_STICKERS를 name 기준 dedupe하여 id 부여. */
export const STICKER_PRODUCTS: StickerProduct[] = (() => {
  const byName = new Map<string, StickerProduct>()
  for (const s of ALL_STICKERS) {
    if (byName.has(s.name)) continue // 중복 카테고리 → 1상품
    byName.set(s.name, {
      id: stickerPid(s.name),
      type: "sticker",
      grant: "permanent",
      price: { myongtae: ITEM_PRICES.sticker },
      name: s.name,
      label: s.label,
      element: s.element,
    })
  }
  return [...byName.values()]
})()

// ── 소모형 상품 (리포트·상담) ───────────────────────────────

export const REPORT_PRODUCTS: Product[] = [
  // saju-play 단품 (1명태 일괄)
  { id: pid("report", "self_manual"),    type: "report", grant: "consumable", price: { myongtae: PRICES.selfManual } },
  { id: pid("report", "sinsal"),         type: "report", grant: "consumable", price: { myongtae: PRICES.sinsal } },
  { id: pid("report", "next_month"),     type: "report", grant: "consumable", price: { myongtae: PRICES.nextMonth } },
  { id: pid("report", "some_compat"),    type: "report", grant: "consumable", price: { myongtae: PRICES.someCompat } },
  { id: pid("report", "onesided_compat"),type: "report", grant: "consumable", price: { myongtae: PRICES.onesidedCompat } },
  // 기타 리포트
  { id: pid("report", "detail"),         type: "report", grant: "consumable", price: { myongtae: PRICES.detailReport } },
  { id: pid("report", "year_fortune"),   type: "report", grant: "consumable", price: { myongtae: PRICES.yearFortune } },
  { id: pid("report", "parent_fortune"), type: "report", grant: "consumable", price: { myongtae: PRICES.parentFortune } },
  { id: pid("report", "celeb_card"),     type: "report", grant: "consumable", price: { myongtae: PRICES.celebCard } },
]

export const CONSULT_PRODUCTS: Product[] = [
  { id: pid("consult", "ai_turn"), type: "consult", grant: "consumable", price: { myongtae: PRICES.aiConsultPerTurn } },
]

// ── 기간제 상품 (구독) ──────────────────────────────────────

export const SUBSCRIPTION_PRODUCTS: Product[] = [
  { id: pid("plan", "monthly"), type: "subscription", grant: "term", price: { won: SUBSCRIPTION_MONTHLY_WON }, term: { unit: "month", length: 1 } },
]

// ── 통합 조회 ───────────────────────────────────────────────

/** 자산 도메인(소품/캐릭터/스킨)은 양이 많아 카탈로그 대신 헬퍼로 id를 파생한다.
 *  소모·기간제 상품은 고정 카탈로그이므로 id로 조회 가능. */
export const FIXED_PRODUCTS: Product[] = [
  ...STICKER_PRODUCTS,
  ...REPORT_PRODUCTS,
  ...CONSULT_PRODUCTS,
  ...SUBSCRIPTION_PRODUCTS,
]

const BY_ID = new Map(FIXED_PRODUCTS.map(p => [p.id, p]))
export function getProduct(id: string): Product | undefined {
  return BY_ID.get(id)
}
