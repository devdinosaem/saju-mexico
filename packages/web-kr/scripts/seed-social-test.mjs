// 소셜 백엔드 테스트 시드 — 데이터부터(테스트 유저) 전략용.
// 서비스 롤로 auth 유저 + profiles/friendships/rooms/guestbook 시드(RLS 우회).
// 실행: node --env-file=.env.local scripts/seed-social-test.mjs
// 멱등: 이미 있으면 재사용(이메일 조회) / upsert.
//
// 생성물: 테스트 본인(tester@sajuplay.dev) + 친구 2명(지수·민준), 수락된 친구관계,
//         친구 방 데이터, 내 벽 방명록 1건.  로그인: tester@sajuplay.dev / sajuplay-test-1234

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SRK = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!URL || !SRK) { console.error("env 없음 (.env.local 로드 필요)"); process.exit(1) }

const H = { apikey: SRK, Authorization: `Bearer ${SRK}`, "Content-Type": "application/json" }
const api = (p) => `${URL}${p}`

const TEST_PASSWORD = "sajuplay-test-1234"
const PEOPLE = [
  { email: "tester@sajuplay.dev", name: "테스터",  ilju: "을미-f", me: true },
  { email: "jisu@sajuplay.dev",   name: "지수",    ilju: "갑자-f" },
  { email: "minjun@sajuplay.dev", name: "민준",    ilju: "병인-m" },
]

// 이메일로 기존 유저 찾기(멱등)
async function findUserByEmail(email) {
  const r = await fetch(api(`/auth/v1/admin/users?per_page=200`), { headers: H })
  const d = await r.json()
  return (d.users || []).find(u => u.email === email) || null
}

async function ensureUser(p) {
  const existing = await findUserByEmail(p.email)
  if (existing) return existing.id
  const r = await fetch(api(`/auth/v1/admin/users`), {
    method: "POST", headers: H,
    body: JSON.stringify({ email: p.email, password: TEST_PASSWORD, email_confirm: true }),
  })
  if (!r.ok) throw new Error(`user create ${p.email}: ${r.status} ${await r.text()}`)
  return (await r.json()).id
}

async function upsert(table, rows, onConflict) {
  const r = await fetch(api(`/rest/v1/${table}?on_conflict=${onConflict}`), {
    method: "POST",
    headers: { ...H, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
  })
  if (!r.ok) throw new Error(`upsert ${table}: ${r.status} ${await r.text()}`)
}

const ids = {}
for (const p of PEOPLE) ids[p.name] = await ensureUser(p)
console.log("유저:", ids)

// profiles (id = auth user id)
await upsert("profiles", PEOPLE.map(p => ({ id: ids[p.name], name: p.name, ilju_key: p.ilju })), "id")

// friendships: 본인 → 각 친구 accepted
const me = ids["테스터"]
await upsert("friendships",
  ["지수", "민준"].map(n => ({ requester_id: me, addressee_id: ids[n], status: "accepted" })),
  "requester_id,addressee_id")

// 친구 방 데이터(미니홈피)
await upsert("rooms", [
  { user_id: ids["지수"], data: { skinId: "pink", stickers: [{ id: "s1", name: "Tulip", x: 30, y: 60, rotate: -6, scale: 0.9 }], charPos: { x: 55, y: 62 } } },
  { user_id: ids["민준"], data: { skinId: "blue", stickers: [{ id: "s2", name: "Vinyl", x: 25, y: 64, rotate: 4, scale: 0.9 }], charPos: { x: 58, y: 64 } } },
], "user_id")

// 내 벽 방명록(지수가 남김) — 멱등: 내 벽 기존 테스트글 비우고 1건 insert
await fetch(api(`/rest/v1/guestbook_entries?owner_id=eq.${me}`), { method: "DELETE", headers: { ...H, Prefer: "return=minimal" } })
{
  const r = await fetch(api(`/rest/v1/guestbook_entries`), {
    method: "POST", headers: { ...H, Prefer: "return=minimal" },
    body: JSON.stringify([{ owner_id: me, author_id: ids["지수"], message: "테스트 방명록이야! 잘 지내~" }]),
  })
  if (!r.ok) throw new Error(`guestbook: ${r.status} ${await r.text()}`)
}

console.log("✅ 시드 완료. 로그인: tester@sajuplay.dev / " + TEST_PASSWORD)
