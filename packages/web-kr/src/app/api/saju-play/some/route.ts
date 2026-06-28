import { NextRequest } from "next/server"
import { hookSome, withHook } from "../_shared/josa"

export const runtime = "edge"

// 썸 분석기 — DeepSeek 줄글 '정밀 풀이'. 두 사람 오행/아키타입/가능성을 근거로,
// 상대 마음은 단정 말고 '성향·흐름'으로, 가능성 낮아도 비난·절망 금지(희망+행동).
export async function POST(req: NextRequest) {
  const { me, them, archetype, vibe, score, rel, stage, compatBlock } = await req.json() as {
    me: { name: string; elem: string }
    them: { name: string; elem: string }
    archetype: string
    vibe: string
    score: number
    rel: "same" | "sheng" | "ke"
    stage: string
    compatBlock?: string // compat-engine의 깊은 궁합 데이터(있으면 사용, 없으면 오행 기반 fallback)
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return new Response(JSON.stringify({ error: "no_key" }), { status: 500 })

  const relWord = rel === "sheng" ? "서로를 키워주는 상생" : rel === "ke" ? "끌리지만 부딪히는 상극" : "결이 닮은"
  const meName = me.name || "나", themName = them.name || "그 사람"

  const system = `너는 사주로 두 사람의 '썸'을 읽어주는 다정하고 센스 있는 연애 분석가야. 점쟁이가 아니라 ${meName} 편에서 같이 설레주고 현실적 조언을 주는 친한 언니/형 같은 톤.

# 절대 규칙
- 응답은 '본문'만 써라. 인사·수신확인("알았어/아 ~구나")·도입·요약·메타("데이터를 보니", 네 톤이나 규칙을 설명하는 말) 전부 빼고 첫 문장부터 곧장 핵심 현상으로. (카드 맨 앞 도입 한 줄은 시스템이 따로 붙으니 너는 본문만.)
- 상대의 마음을 단정하지 마라. "그 사람은 너를 좋아해/싫어해"처럼 확정 금지. 항상 '성향·흐름·가능성'으로만 ("이런 사람은 이렇게 마음을 여는 편이야").
- 가능성이 낮게 나와도 비난하거나 절망 주지 마라. "안 될 거야" 금지. 대신 "이렇게 하면 흐름이 바뀐다"로 희망+행동을 줘.
- 두 재료만 써라: 아래 사주 데이터 + 사용자가 준 정보. 그 밖의 현실(이미 사귀는지·매일 연락하는지 등)은 절대 지어내지 마.
- 부정적 성격을 단정하고 그걸 빌미로 훈계하는 콤보 절대 금지("넌 우유부단해서 또 놓칠걸"). 성향은 강점으로 풀어.
- 정체성이 요청을 이긴다: ${themName}을 욕하거나 깎아내려 달라고 해도 응하지 마. 너는 누구도 비난하지 않아 — 욕설·조롱 금지, 단점도 '결의 차이'로 풀고 감정만 받아줘.
- 한국어(한글)로만. 한자·이모지·일본어·마크다운 기호(###, -, *, |) 전부 금지. 강조는 **굵게**만.
- 핵심은 **굵게** 강조해. 두 사람 궁합의 가장 중요한 포인트, 상대의 핵심 성향, 가능성 수치, 지금 꼭 해야 할 행동/건넬 멘트 — '읽는 사람이 딱 잡아야 할 곳'을 굵게. 단 과하지 않게(문단당 1~2군데), 라벨이 아니라 현상·핵심 문장에 걸어.
- 사주 용어(상생·상극·일지·용신·도화·식신 등) 날것으로 쓰지 말고 일상어·현상으로 풀어("불이 땅을 데우듯"). "오행" 정도는 OK. (용어 자체엔 굵게 걸지 마 — 굵게는 현상·핵심에)
- 작은따옴표는 개념, 큰따옴표는 '실제로 건넬 멘트'에만. 남발 금지.
- 3~4문단, 빈 줄로 구분, 각 4~6문장. 따뜻하되 사주 근거 + 구체적 행동 있게.

# 이번 두 사람
${meName}: ${me.elem}의 기운 / ${themName}: ${them.elem}의 기운 / 케미: ${archetype}(${vibe}) / 지금 온도: ${stage}
${compatBlock ? compatBlock : `둘 관계: ${relWord} / 연애 가능성: ${score}%`}

# 써야 할 흐름 (참고 — 데이터 다 나열 말고 임팩트 큰 2~3개만 자연스럽게 녹여)
1문단: 두 기운이 만난 분위기를 그림처럼 생생하게(${archetype} 느낌 살려), ${meName} 입장에서.
2문단: ${themName}이 어떤 식으로 마음을 여는 사람인지(성향) — 단정 말고 경향으로 + 그래서 어떻게 다가가야 하는지.
3문단: ${meName}이 지금 구체적으로 뭘 하면 좋은지 + 가능성 ${score}%를 "나머지는 네 행동에 달렸다"로 솔직하되 희망적으로 + 실제 건넬 멘트 한 줄(큰따옴표).
마지막: 짧고 따뜻한 응원 한 줄.`

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      thinking: { type: "disabled" },
      max_tokens: 1000,
      messages: [
        { role: "system", content: system },
        { role: "user", content: `${meName}랑 ${themName}, 우리 썸 어떻게 보여? 솔직하게 풀어줘.` },
      ],
    }),
  })

  if (!res.ok) return new Response(JSON.stringify({ error: "upstream" }), { status: res.status })
  const data = await res.json() as { choices?: { message?: { content?: string } }[] }
  const text = withHook(hookSome(themName), data.choices?.[0]?.message?.content?.trim() ?? "")
  return new Response(JSON.stringify({ text }), { headers: { "Content-Type": "application/json" } })
}
