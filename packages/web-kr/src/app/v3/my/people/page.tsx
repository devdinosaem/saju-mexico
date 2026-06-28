"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ILJU_SVG_ICONS, getIljuProfileViewBox } from "@/lib/ilju-svg-icons"
import { useSavedProfiles } from "@/hooks/useSavedProfiles"
import { RELATION_PRESETS, type SavedBirth, type SavedProfile } from "@/lib/social/saved-profiles"
import SajuInputSheet from "../../shop/_components/SajuInputSheet"
import type { MockBirthDate } from "@/lib/mockAuth"

const BINGGRAE: React.CSSProperties = { fontFamily: "'BinggraeTaom', sans-serif", fontWeight: 700 }
const GAEGU: React.CSSProperties = { fontFamily: "'Cafe24Dongdong', cursive" }
const PINK = "#E84B6A"

const STEM_TO_ELEM: Record<string, string> = {
  갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수",
}
const ELEM_BG: Record<string, string> = {
  목: "#D1FAE5", 화: "#FEE2E2", 토: "#FEF3C7", 금: "#E2E8F0", 수: "#DBEAFE",
}
const bareIlju = (k: string) => k.replace(/-[mf]$/, "")
const toMockBirth = (p: SavedProfile): MockBirthDate => ({ name: p.name, ...p.birth })

// ── 관계 선택 바텀시트 ──────────────────────────────────────
function RelationPicker({ current, onPick, onClose }: { current?: string | null; onPick: (r: string | null) => void; onClose: () => void }) {
  const isPreset = !current || (RELATION_PRESETS as readonly string[]).includes(current)
  const [custom, setCustom] = useState(isPreset ? "" : (current ?? ""))
  const [customMode, setCustomMode] = useState(!isPreset)
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-[480px] bg-white rounded-t-3xl border-t-2 border-charcoal px-5 pt-4 pb-8 flex flex-col gap-3" onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-charcoal/15 mx-auto" />
        <p className="text-[15px] text-charcoal" style={BINGGRAE}>관계를 골라줘</p>
        <div className="flex flex-wrap gap-2">
          {RELATION_PRESETS.map(r => (
            <button key={r} onClick={() => onPick(r)}
              className="px-3.5 py-2 rounded-full text-[13px] font-bold border active:opacity-80"
              style={current === r ? { background: PINK, color: "#fff", borderColor: PINK } : { background: "#FFF6F2", color: "#9A7050", borderColor: "#F0DAD8" }}>
              {r}
            </button>
          ))}
          <button onClick={() => setCustomMode(m => !m)}
            className="px-3.5 py-2 rounded-full text-[13px] font-bold border active:opacity-80"
            style={customMode ? { background: "#2D2D2D", color: "#fff", borderColor: "#2D2D2D" } : { background: "#F1F5F9", color: "#64748B", borderColor: "#E2E8F0" }}>
            직접 입력
          </button>
        </div>
        {customMode && (
          <div className="flex gap-2">
            <input value={custom} onChange={e => setCustom(e.target.value)} maxLength={10} placeholder="예: 첫사랑, 사촌…"
              className="flex-1 text-[14px] rounded-xl px-3 py-2.5 focus:outline-none" style={{ background: "#FFFDE8", border: "1.5px dashed #D4B870" }} autoFocus />
            <button onClick={() => custom.trim() && onPick(custom.trim())} disabled={!custom.trim()}
              className="px-4 rounded-xl text-[13px] font-bold text-cream disabled:opacity-40" style={{ background: PINK }}>확인</button>
          </div>
        )}
        <button onClick={() => onPick(null)} className="text-[12px] text-text-muted mt-1">관계 없음</button>
      </div>
    </div>
  )
}

export default function PeoplePage() {
  const router = useRouter()
  const { profiles, loading, add, update, remove } = useSavedProfiles()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<SavedProfile | null>(null)
  const [pending, setPending] = useState<{ name: string; birth: SavedBirth } | null>(null)
  const [relFor, setRelFor] = useState<{ mode: "add" } | { mode: "edit"; p: SavedProfile } | null>(null)

  const onSheetSuccess = (bd: MockBirthDate) => {
    const birth: SavedBirth = { year: bd.year, month: bd.month, day: bd.day, hour: bd.hour, minute: bd.minute, ampm: bd.ampm, gender: bd.gender }
    setSheetOpen(false)
    if (editing) {
      void update(editing.id, { name: bd.name, birth }) // 생일 수정 → 일주 서버에서 자동 재계산
      setEditing(null)
    } else {
      setPending({ name: bd.name, birth })
      setRelFor({ mode: "add" })
    }
  }

  const onPickRelation = (relation: string | null) => {
    if (relFor?.mode === "add" && pending) {
      void add({ name: pending.name, relation: relation ?? undefined, birth: pending.birth })
      setPending(null)
    } else if (relFor?.mode === "edit") {
      void update(relFor.p.id, { relation })
    }
    setRelFor(null)
  }

  return (
    <div className="flex flex-col gap-3 pb-24">
      <div className="flex items-center justify-between">
        <button className="text-sm text-text-muted" onClick={() => router.back()}>← 나가기</button>
        <p className="text-[15px] text-charcoal" style={BINGGRAE}>사주 볼 사람들</p>
        <div className="w-12" />
      </div>

      <p className="text-[12px] text-text-muted leading-snug" style={GAEGU}>생일 입력해 둔 사람은 재입력 없이 또 볼 수 있어요. 생일을 고치면 일주도 자동으로 바뀌어요.</p>

      {loading ? (
        <p className="text-center text-[13px] text-text-muted py-10" style={GAEGU}>불러오는 중…</p>
      ) : profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <div className="text-4xl">📒</div>
          <p className="text-[14px] font-bold text-charcoal">아직 저장한 사람이 없어요</p>
          <p className="text-[12px] text-text-muted" style={GAEGU}>아래 + 로 가족·친구·연인을 추가해봐요</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {profiles.map(p => {
            const elem = STEM_TO_ELEM[p.iljuKey[0]] ?? "토"
            const fn = ILJU_SVG_ICONS[p.iljuKey]
            return (
              <div key={p.id} className="rounded-2xl bg-white border border-charcoal/10 p-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-charcoal/15 flex items-center justify-center shrink-0" style={{ background: ELEM_BG[elem] }}>
                  {fn ? <div className="w-full h-full">{fn(getIljuProfileViewBox(p.iljuKey))}</div> : <span className="text-[13px] font-bold text-charcoal/50">{p.name[0]}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[14px] font-bold text-charcoal truncate">{p.name}</p>
                    <button onClick={() => setRelFor({ mode: "edit", p })}
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 active:opacity-70"
                      style={{ background: "#FFF6F2", color: "#9A7050", border: "1px solid #F0DAD8" }}>
                      {p.relation || "관계 +"}
                    </button>
                  </div>
                  <p className="text-[11px] text-text-muted mt-0.5">{bareIlju(p.iljuKey)}일주 · {p.birth.year}.{p.birth.month}.{p.birth.day}</p>
                </div>
                <button onClick={() => { setEditing(p); setSheetOpen(true) }} className="text-[11px] font-bold text-text-muted px-1.5 active:opacity-60">수정</button>
                <button onClick={() => void remove(p.id)} className="text-[11px] font-bold text-red-400 px-1.5 active:opacity-60">삭제</button>
              </div>
            )
          })}
        </div>
      )}

      <button onClick={() => { setEditing(null); setSheetOpen(true) }}
        className="mt-1 w-full py-3 rounded-2xl border-2 border-dashed border-charcoal/25 text-[14px] font-bold text-charcoal/60 active:opacity-70" style={{ background: "#FFFDF8" }}>
        + 사주 볼 사람 추가
      </button>

      <SajuInputSheet
        open={sheetOpen}
        onClose={() => { setSheetOpen(false); setEditing(null) }}
        skipSave
        initialData={editing ? toMockBirth(editing) : undefined}
        title={editing ? "정보 수정 ✦" : "사주 볼 사람 추가 ✦"}
        submitLabel={editing ? "저장하기" : "다음"}
        onSuccess={onSheetSuccess}
      />

      {relFor && (
        <RelationPicker
          current={relFor.mode === "edit" ? relFor.p.relation : null}
          onPick={onPickRelation}
          onClose={() => { setRelFor(null); setPending(null) }}
        />
      )}
    </div>
  )
}
