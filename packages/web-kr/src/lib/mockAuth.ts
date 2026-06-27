export type MockBirthDate = {
  name: string
  year: string; month: string; day: string
  hour: string; minute: string; ampm: "AM" | "PM"
  gender: "M" | "F"
}

export type MockUser = {
  loggedIn: boolean
  provider: "kakao" | "naver" | null
  birthDate: MockBirthDate | null
  iljuId: string | null
}

const KEY   = "saju-mock-user"
const EVENT = "saju-auth-change"

export function getMockUser(): MockUser {
  if (typeof window === "undefined") return { loggedIn: false, provider: null, birthDate: null, iljuId: null }
  try {
    const s = localStorage.getItem(KEY)
    if (s) return JSON.parse(s)
  } catch {}
  return { loggedIn: false, provider: null, birthDate: null, iljuId: null }
}

export function loginMockUser(provider: "kakao" | "naver") {
  const prev = getMockUser()
  localStorage.setItem(KEY, JSON.stringify({ ...prev, loggedIn: true, provider }))
  window.dispatchEvent(new Event(EVENT))
}

export function saveMockBirthDate(bd: MockBirthDate) {
  const prev = getMockUser()
  localStorage.setItem(KEY, JSON.stringify({ ...prev, birthDate: bd }))
  window.dispatchEvent(new Event(EVENT))
}

export function saveMockIlju(iljuId: string) {
  const prev = getMockUser()
  localStorage.setItem(KEY, JSON.stringify({ ...prev, iljuId }))
  window.dispatchEvent(new Event(EVENT))
}

export function logoutMockUser() {
  localStorage.removeItem(KEY)
  window.dispatchEvent(new Event(EVENT))
}

export const MOCK_AUTH_EVENT = EVENT

export function isBirthDateComplete(bd: MockBirthDate): boolean {
  return (
    bd.name.trim().length > 0 &&
    bd.year.length === 4 &&
    +bd.month >= 1 && +bd.month <= 12 &&
    +bd.day >= 1 &&
    bd.hour.length > 0 && bd.minute.length > 0 &&
    (bd.gender === "M" || bd.gender === "F")
  )
}
