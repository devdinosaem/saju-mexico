"use client"
import { useState, useRef, useEffect } from "react"
import { DoodleSparkle } from "@/components/doodles"
import { saveMockBirthDate, type MockBirthDate } from "@/lib/mockAuth"
import CTAButton from "@/components/cta-button"

type Props = {
  open: boolean
  onClose: () => void
  onSuccess?: (bd: MockBirthDate) => void
  initialData?: MockBirthDate
  skipSave?: boolean
}

function getMaxDay(y: string, m: string): number {
  const mi = parseInt(m)
  if (!mi || mi < 1 || mi > 12) return 31
  if (mi === 2) {
    const yi = parseInt(y)
    if (y.length === 4 && !isNaN(yi)) {
      return yi % 4 === 0 && (yi % 100 !== 0 || yi % 400 === 0) ? 29 : 28
    }
    return 29
  }
  return [4, 6, 9, 11].includes(mi) ? 30 : 31
}

export default function SajuInputSheet({ open, onClose, onSuccess, initialData, skipSave }: Props) {
  const [name, setName]     = useState("")
  const [year, setYear]     = useState("")
  const [month, setMonth]   = useState("")
  const [day, setDay]       = useState("")
  const [hour, setHour]     = useState("")
  const [minute, setMinute] = useState("")
  const [ampm, setAmpm]     = useState<"AM" | "PM">("AM")
  const [gender, setGender] = useState<"M" | "F" | null>(null)
  const [kbHeight, setKbHeight] = useState(0)

  const [yearError, setYearError]     = useState("")
  const [monthError, setMonthError]   = useState("")
  const [dayError, setDayError]       = useState("")
  const [hourError, setHourError]     = useState("")
  const [minuteError, setMinuteError] = useState("")

  const yearRef   = useRef<HTMLInputElement>(null)
  const monthRef  = useRef<HTMLInputElement>(null)
  const dayRef    = useRef<HTMLInputElement>(null)
  const hourRef   = useRef<HTMLInputElement>(null)
  const minuteRef = useRef<HTMLInputElement>(null)

  // 현재 state를 ref로 가져오는 헬퍼 (blur 핸들러 closure 문제 방지)
  const stateRef = useRef({ year, month, day, hour, minute })
  useEffect(() => { stateRef.current = { year, month, day, hour, minute } }, [year, month, day, hour, minute])

  useEffect(() => {
    if (!open) { setKbHeight(0); return }
    const vv = window.visualViewport
    if (!vv) return
    const update = () => setKbHeight(Math.max(0, window.innerHeight - vv.offsetTop - vv.height))
    vv.addEventListener("resize", update)
    vv.addEventListener("scroll", update)
    return () => { vv.removeEventListener("resize", update); vv.removeEventListener("scroll", update) }
  }, [open])

  useEffect(() => {
    if (open) {
      if (initialData) {
        setName(initialData.name)
        setYear(initialData.year)
        setMonth(initialData.month)
        setDay(initialData.day)
        setHour(initialData.hour)
        setMinute(initialData.minute)
        setAmpm(initialData.ampm)
        setGender(initialData.gender)
      }
      setTimeout(() => yearRef.current?.focus(), 120)
    } else {
      setName(""); setYear(""); setMonth(""); setDay("")
      setHour(""); setMinute(""); setAmpm("AM"); setGender(null)
      setYearError(""); setMonthError(""); setDayError("")
      setHourError(""); setMinuteError("")
    }
  }, [open])

  // --- 유효성 검사 ---

  function checkDay(y: string, m: string, d: string) {
    if (!d) { setDayError(""); return }
    const di = parseInt(d)
    const mi = parseInt(m)
    if (di < 1) { setDayError("1일부터 시작해줘"); return }
    if (!mi || mi < 1 || mi > 12) { setDayError(""); return }
    const maxDay = getMaxDay(y, m)
    if (di > maxDay) {
      if (mi === 2 && y.length === 4) {
        setDayError(`${y}년 ${mi}월은 최대 ${maxDay}일까지예요`)
      } else {
        setDayError(`${mi}월은 최대 ${maxDay}일까지예요`)
      }
    } else {
      setDayError("")
    }
  }

  function onBlurYear() {
    const y = stateRef.current.year
    if (!y || y.length < 4) { setYearError(""); return }
    const yi = parseInt(y)
    const thisYear = new Date().getFullYear()
    if (yi < 1000 || yi > thisYear) setYearError(`1000~${thisYear}년 사이로 입력해줘`)
    else { setYearError(""); checkDay(y, stateRef.current.month, stateRef.current.day) }
  }

  function onBlurMonth() {
    const m = stateRef.current.month
    if (!m) { setMonthError(""); return }
    const mi = parseInt(m)
    if (mi < 1 || mi > 12) setMonthError("1~12월 사이로 입력해줘")
    else { setMonthError(""); checkDay(stateRef.current.year, m, stateRef.current.day) }
  }

  function onBlurDay() {
    checkDay(stateRef.current.year, stateRef.current.month, stateRef.current.day)
  }

  function onBlurHour() {
    const h = stateRef.current.hour
    if (!h) { setHourError(""); return }
    const hi = parseInt(h)
    if (hi < 1 || hi > 12) setHourError("1~12 사이로 입력해줘")
    else setHourError("")
  }

  function onBlurMinute() {
    const m = stateRef.current.minute
    if (!m) { setMinuteError(""); return }
    const mi = parseInt(m)
    if (mi < 0 || mi > 59) setMinuteError("0~59분 사이로 입력해줘")
    else setMinuteError("")
  }

  // --- 입력 핸들러 ---

  function onlyDigits(v: string, max: number) {
    return v.replace(/\D/g, "").slice(0, max)
  }

  function handleYear(v: string) {
    const d = onlyDigits(v, 4)
    setYear(d); setYearError("")
    if (d.length === 4) monthRef.current?.focus()
  }

  function handleMonth(v: string) {
    const d = onlyDigits(v, 2)
    setMonth(d); setMonthError("")
    if (d.length === 2 || (d.length === 1 && +d >= 2)) dayRef.current?.focus()
  }

  function handleDay(v: string) {
    const d = onlyDigits(v, 2)
    setDay(d); setDayError("")
    if (d.length === 2 || (d.length === 1 && +d >= 4)) hourRef.current?.focus()
  }

  function handleHour(v: string) {
    const d = onlyDigits(v, 2)
    setHour(d)
    // 시간은 선택값: 비어 있으면 통과, 값이 있을 때만 1~12 검증 (blur 타이밍 의존 X)
    setHourError(d && (+d < 1 || +d > 12) ? "1~12 사이로 입력해줘" : "")
    if (d.length === 2) minuteRef.current?.focus()
  }

  function handleMinute(v: string) {
    const d = onlyDigits(v, 2)
    setMinute(d)
    setMinuteError(d && +d > 59 ? "0~59분 사이로 입력해줘" : "")
  }

  // ---

  const isValid =
    name.trim().length > 0 &&
    !yearError && !monthError && !dayError &&
    !hourError && !minuteError &&
    year.length === 4 && +month >= 1 && +month <= 12 && +day >= 1 &&
    gender !== null

  if (!open) return null

  const INPUT_CLS =
    "w-full text-center text-[17px] font-bold text-charcoal bg-white border-2 border-charcoal/10 rounded-xl py-2 outline-none focus:border-pink/60 transition-colors placeholder:text-charcoal/15 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

  const SECTION_LABEL = "text-[11px] font-bold text-charcoal/50 mb-1"
  const ERR = "text-[11px] text-pink mt-1 text-center"

  const dateError = dayError || monthError || yearError
  const timeError = minuteError || hourError

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-[480px] bg-cream rounded-t-3xl border-t-2 border-x-2 border-charcoal max-h-[82dvh] flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ paddingBottom: `max(1rem, ${kbHeight}px)` }}
      >
        <div className="w-10 h-1 rounded-full bg-charcoal/20 mx-auto mt-3 mb-1 shrink-0" />

        <form
          className="px-5 pt-1 pb-2 flex flex-col gap-3 overflow-y-auto"
          onSubmit={e => {
            e.preventDefault()
            if (!isValid) return
            const bd: MockBirthDate = { name: name.trim(), year, month, day, hour, minute, ampm, gender: gender! }
            if (!skipSave) saveMockBirthDate(bd)
            onSuccess?.(bd)
            onClose()
          }}
        >

          <p
            className="text-[17px] font-bold text-charcoal"
            style={{ fontFamily: "'BinggraeTaom', sans-serif" }}
          >
            생년월일을 알려줘 ✦
          </p>

          {/* 이름 */}
          <div>
            <p className={SECTION_LABEL}>이름</p>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="홍길동"
              className={INPUT_CLS}
              style={{ textAlign: "left", paddingLeft: "1rem", paddingRight: "1rem" }}
            />
          </div>

          {/* 생년월일 */}
          <div>
            <p className={SECTION_LABEL}>생년월일</p>
            <div className="flex gap-2">
              <input
                ref={yearRef}
                type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4}
                name="bday-year" autoComplete="bday-year"
                value={year} onChange={e => handleYear(e.target.value)}
                onBlur={onBlurYear}
                placeholder="2000"
                className={INPUT_CLS + " flex-[2]"}
              />
              <input
                ref={monthRef}
                type="text" inputMode="numeric" pattern="[0-9]*" maxLength={2}
                name="bday-month" autoComplete="bday-month"
                value={month} onChange={e => handleMonth(e.target.value)}
                onBlur={onBlurMonth}
                placeholder="1"
                className={INPUT_CLS + " flex-1"}
              />
              <input
                ref={dayRef}
                type="text" inputMode="numeric" pattern="[0-9]*" maxLength={2}
                name="bday-day" autoComplete="bday-day"
                value={day} onChange={e => handleDay(e.target.value)}
                onBlur={onBlurDay}
                placeholder="1"
                className={INPUT_CLS + " flex-1"}
              />
            </div>
            {dateError && <p className={ERR}>{dateError}</p>}
          </div>

          {/* 태어난 시간 (선택) */}
          <div>
            <p className={SECTION_LABEL}>태어난 시간 (선택)</p>
            <div className="flex gap-2 mb-1.5">
              <div className="flex flex-col gap-1 w-[60px] shrink-0">
                <button
                  type="button"
                  onClick={() => setAmpm("AM")}
                  className={`flex-1 rounded-xl border-2 text-[13px] font-bold transition-all ${
                    ampm === "AM"
                      ? "bg-charcoal border-charcoal text-cream"
                      : "bg-white border-charcoal/12 text-charcoal/40"
                  }`}
                >
                  오전
                </button>
                <button
                  type="button"
                  onClick={() => setAmpm("PM")}
                  className={`flex-1 rounded-xl border-2 text-[13px] font-bold transition-all ${
                    ampm === "PM"
                      ? "bg-charcoal border-charcoal text-cream"
                      : "bg-white border-charcoal/12 text-charcoal/40"
                  }`}
                >
                  오후
                </button>
              </div>
              <div className="flex gap-1 flex-1">
                <input
                  ref={hourRef}
                  type="text" inputMode="numeric" pattern="[0-9]*" maxLength={2}
                  value={hour} onChange={e => handleHour(e.target.value)}
                  onBlur={onBlurHour}
                  placeholder="12"
                  className={INPUT_CLS + " flex-1"}
                />
                <input
                  ref={minuteRef}
                  type="text" inputMode="numeric" pattern="[0-9]*" maxLength={2}
                  value={minute} onChange={e => handleMinute(e.target.value)}
                  onBlur={onBlurMinute}
                  placeholder="30"
                  className={INPUT_CLS + " flex-1"}
                />
              </div>
            </div>
            {timeError && <p className={ERR + " mb-2"}>{timeError}</p>}
            <div className="flex items-center gap-1.5 bg-pink/5 border border-pink/15 rounded-xl px-3 py-2">
              <DoodleSparkle className="w-3 h-3 shrink-0" />
              <p className="text-[11px] font-bold text-charcoal leading-snug">
                시간 몰라도 일주(日柱)는 정확하게 나와요
              </p>
            </div>
          </div>

          {/* 성별 */}
          <div>
            <p className={SECTION_LABEL}>성별</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGender("M")}
                className={`flex-1 h-[40px] rounded-xl border-2 text-[14px] font-bold transition-all active:scale-95 ${
                  gender === "M"
                    ? "bg-pink border-pink text-cream"
                    : "bg-white border-charcoal/12 text-charcoal/50"
                }`}
              >
                ♂ 남성
              </button>
              <button
                type="button"
                onClick={() => setGender("F")}
                className={`flex-1 h-[40px] rounded-xl border-2 text-[14px] font-bold transition-all active:scale-95 ${
                  gender === "F"
                    ? "bg-pink border-pink text-cream"
                    : "bg-white border-charcoal/12 text-charcoal/50"
                }`}
              >
                ♀ 여성
              </button>
            </div>
          </div>

          {/* CTA */}
          <CTAButton type="submit" disabled={!isValid}>
            👑 내 사주카드 뽑기 👑
          </CTAButton>

        </form>
      </div>
    </div>
  )
}
