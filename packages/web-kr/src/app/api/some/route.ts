import { NextRequest } from "next/server"

export const runtime = "edge"

// 썸 분석기 — DeepSeek 줄글 '정밀 풀이'. 두 사람 오행/아키타입/가능성을 근거로,
// 상대 마음은 단정 말고 '성향·흐름'으로, 가능성 낮아도 비난·절망 금지(희망+행동).
export async function POST(req: NextRequest) {
  const { me, them, archetype, vibe, score, rel, stage } = await req.json() as {
    me: { name: string; elem: string }
    them: { name: string; elem: string }
    archetype: string
    vibe: string
    score: number
    rel: "same" | "sheng" | "ke"
    stage: string
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return new Response(JSON.stringify({ error: "no_key" }), { status: 500 })

  const relWord = rel === "sheng" ? "서로를 키워주는 상생" : rel === "ke" ? "끌리지만 부딪히는 상극" : "결이 닮은"
  const meName = me.name || "나", themName = them.name || "그 사람"

  const system = `너는 사주 오행으로 두 사람의 '썸'을 읽어주는 다정하고 센스 있는 연애 분석가야. 점쟁이가 아니라, 이 사람 편에서 같이 설레주고 현실적인 조언을 주는 친한 언니/형 같은 톤.

# 절대 규칙
- 상대의 마음을 단정하지 마라. "그 사람은 너를 좋아해/싫어해"처럼 확정 금지. 항상 '성향·흐름·가능성'으로만 ("이런 사람은 이렇게 마음을 여는 편이야").
- 가능성이 낮게 나와도 비난하거나 절망 주지 마라. "안 될 거야" 금지. 대신 "지금은 타이밍이 아니야, 이렇게 하면 흐름이 바뀐다"로 희망+행동을 줘.
- 한국어(한글)로만. 한자·이모지·일본어·마크다운 기호(###, -, *, |) 전부 금지. 강조는 **굵게**만.
- 3~4문단, 빈 줄로 문단 구분. 각 문단 4~6문장. 따뜻하지만 알맹이(오행 근거 + 구체적 행동) 있게.
- 사주 용어(상생·상극·식신 등) 날것으로 쓰지 말고 일상어로 풀어. "오행" 정도는 OK.

# 이번 두 사람 데이터
${meName}: ${me.elem}의 기운 / ${themName}: ${them.elem}의 기운 / 둘 관계: ${relWord} / 케미 타입: ${archetype}(${vibe}) / 지금 온도: ${stage} / 연애 가능성: ${score}%

# 써야 할 흐름
1문단: 두 사람의 오행이 만났을 때의 분위기를 생생하게 (${archetype} 느낌을 살려). ${meName} 입장에서 읽어줘.
2문단: ${themName}이 어떤 식으로 마음을 여는 사람인지(${them.elem}의 성향) — 단정 말고 경향으로.
3문단: 그래서 ${meName}이 지금 구체적으로 뭘 하면 좋은지 행동 한두 가지. 가능성 ${score}%를 솔직하되 희망적으로 녹여.
마지막: 짧고 따뜻한 응원 한 줄.`

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      thinking: { type: "disabled" },
      max_tokens: 900,
      messages: [
        { role: "system", content: system },
        { role: "user", content: `${meName}랑 ${themName}, 우리 썸 어떻게 보여? 솔직하게 풀어줘.` },
      ],
    }),
  })

  if (!res.ok) return new Response(JSON.stringify({ error: "upstream" }), { status: res.status })
  const data = await res.json() as { choices?: { message?: { content?: string } }[] }
  const text = data.choices?.[0]?.message?.content?.trim() ?? ""
  return new Response(JSON.stringify({ text }), { headers: { "Content-Type": "application/json" } })
}
