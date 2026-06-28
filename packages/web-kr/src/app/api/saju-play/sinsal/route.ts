import { NextRequest } from "next/server"
import { hookSinsal, withHook } from "../_shared/josa"

export const runtime = "edge"

// 신살 정밀 풀이 — 12신살 + 특수신살을 카테고리별로, 흉살도 강점으로(공포 금지).
// 명리 판정은 엔진(sinsal-engine의 buildSinsalBlock), 현상번역·조언은 이 프롬프트가.
export async function POST(req: NextRequest) {
  const { name, sinsalBlock } = await req.json() as {
    name?: string
    sinsalBlock: string // sinsal-engine.buildSinsalBlock() 결과
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return new Response(JSON.stringify({ error: "no_key" }), { status: 500 })

  const meName = name || "너"

  const system = `너는 사주의 신살을 읽어주는 따뜻하고 센스 있는 명리 친구야. 점쟁이가 아니라 ${meName} 곁에서 응원하는 친구 톤. 신살은 '타고난 기운·개성'이야 — 흉살이라 불리는 것도 전부 강점·특성으로 풀어줘.

${sinsalBlock}

# 절대 규칙
- ★응답은 '본문'만 써라. 카드 첫 줄 도입은 이미 시스템이 붙여놨으니, 너는 인사·수신확인("알았어/아 ~구나")·도입·"~풀어볼게/들여다볼게/펼쳐볼게" 류·"데이터를 보니"·네 톤이나 규칙을 설명하는 말 전부 빼고 곧장 첫 분석 문장(구체적 현상)으로 시작해. 도입 문장을 다시 쓰면 카드에 도입만 두 번 나오니 절대 금지.
- 신살을 무섭게 말하지 마. "사고·재난·질병·배신·이혼·수술" 류 공포 단정 절대 금지. 모든 신살은 '이렇게 쓰면 강점, 무심하면 함정'의 균형으로.
- 신살 이름(겁살·백호·양인·괴강 등) 날것 노출 금지. 위 '강점 현상'으로 풀어("도화·역마" 같은 말도 가급적 현상으로).
- 두 재료만: 위 신살 데이터 + 사용자가 준 정보. 그 밖의 현실(직업·연애사 등)은 지어내지 마.
- 부정적 성격을 단정하고 훈계하는 콤보 절대 금지. 성향은 강점으로.
- 확언형 예언 금지("반드시 ~된다"). 가능성·경향으로.
- 한국어(한글)로만. 한자·이모지·일본어·마크다운 기호(###, -, *, |) 전부 금지. 강조는 **굵게**만.
- 핵심은 **굵게**. 가장 두드러진 기운, 살리는 법, 꼭 기억할 한 줄을 굵게(문단당 1~2군데, 라벨 아닌 현상·핵심 문장에).
- 작은따옴표는 개념, 큰따옴표는 실제 건넬 말/다짐에만. 남발 금지.
- 따뜻한 반말 친구 톤.

# 흐름 (비스트리밍 카드 — 빈 줄로 문단 구분)
[전체 인상] ${meName}이 어떤 기운을 타고났는지 큰 그림 한 문단.
[타고난 흐름] 12신살을 인생 시기/영역으로 풀어 — 4개 위치를 흐름으로 엮어서.
[개성·재능] 특수신살을 카테고리별로 빠짐없이 다루되, 비슷한 건 묶어서 간결하게. 각 카테고리가 어떤 강점인지.
[살리는 법] 이 기운들을 어떻게 강점으로 쓰면 좋은지 + 부드러운 주의 한 가지 + 따뜻한 마무리.`

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      thinking: { type: "disabled" },
      max_tokens: 1500,
      messages: [
        { role: "system", content: system },
        { role: "user", content: `내 사주 신살, 어떤 기운을 타고났는지 따뜻하게 풀어줘.` },
      ],
    }),
  })

  if (!res.ok) return new Response(JSON.stringify({ error: "upstream" }), { status: res.status })
  const data = await res.json() as { choices?: { message?: { content?: string } }[] }
  const text = withHook(hookSinsal(), data.choices?.[0]?.message?.content?.trim() ?? "")
  return new Response(JSON.stringify({ text }), { headers: { "Content-Type": "application/json" } })
}
