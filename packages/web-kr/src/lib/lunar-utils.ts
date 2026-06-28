import KoreanLunarCalendar from "korean-lunar-calendar"

const SON_LUNAR_DAYS = [9, 10, 19, 20, 29, 30]

/** 특정 양력 연/월의 손없는 날(양력 일자) 배열 반환 */
export function getSonEopsDays(year: number, month: number): number[] {
  const cal = new KoreanLunarCalendar()
  const daysInMonth = new Date(year, month, 0).getDate()
  const result: number[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    cal.setSolarDate(year, month, day)
    const lunar = cal.getLunarCalendar()
    if (SON_LUNAR_DAYS.includes(lunar.day)) {
      result.push(day)
    }
  }

  return result
}

/** 특정 양력 연/월의 달력 날짜 배열 생성 (앞 빈칸 null 포함) */
export function buildMonthDays(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month - 1, 1).getDay() // 0=일
  const daysInMonth = new Date(year, month, 0).getDate()
  const days: (number | null)[] = Array(firstDow).fill(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)
  // 7의 배수로 패딩
  while (days.length % 7 !== 0) days.push(null)
  return days
}
