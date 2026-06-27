import { NextRequest } from "next/server"

export const runtime = "edge"

// 재접속 시: 지난 대화를 요약하고, 그 맥락을 자연스럽게 녹인 "이어받는 인사"를 생성
export async function POST(req: NextRequest) {
  const { sajuContext, messages } = await req.json() as {
    sajuContext: string
    messages: { role: "user" | "assistant"; content: string }[]
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return new Response("DEEPSEEK_API_KEY not set", { status: 500 })

  const systemPrompt = `너는 이 사람의 사주 일주에 깃든 캐릭터야. 사용자가 한동안 자리를 비웠다가 다시 상담 탭에 돌아왔어.
아래 [지난 대화]를 바탕으로 두 가지를 만들어:

1) summary: 지난 대화 전체를 짧게 압축한 요약. *미해결 고민·감정 상태·핵심 주제* 중심으로. 다음 대화에서 맥락을 이어가기 위한 내부 메모야(사용자에게 안 보임). 3~5문장.
2) greeting: 사용자에게 건넬 "이어받는 인사" 한 마디. 요약 내용을 자연스럽게 녹여서, "저번에 ~ 얘기하다 말았지, 좀 어때?" 같은 톤으로 따뜻하게. 1~3문장.

# 출력 형식 (반드시 이 JSON만, 다른 텍스트 없이)
{"summary": "...", "greeting": "..."}

# 규칙
- 반말, 따뜻한 친구 톤. 호칭은 이름+"아/야" 또는 "너".
- greeting은 지난 대화에서 실제로 나온 주제만 언급해. 없는 얘기 지어내지 마.
- 부정적 성격 단정·훈계 금지. "웃기다/너답다"로 평가하며 열지 마.
- 한자·일본어·외국 문자 금지, 한글로만. 욕설 금지.
- 작은따옴표는 개념 인용·대비에만, 남발 금지.

${sajuContext}`

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      stream: false,
      thinking: { type: "disabled" },
      max_tokens: 600,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `[지난 대화]\n${messages.map(m => `${m.role === "user" ? "사용자" : "나"}: ${m.content}`).join("\n")}` },
      ],
    }),
  })

  if (!res.ok) return new Response(await res.text(), { status: res.status })

  const data = await res.json()
  const raw = data.choices?.[0]?.message?.content ?? "{}"
  let summary = "", greeting = ""
  try {
    const m = raw.match(/\{[\s\S]*\}/)
    const parsed = JSON.parse(m ? m[0] : raw)
    summary = String(parsed.summary ?? "")
    greeting = String(parsed.greeting ?? "")
  } catch {
    // 파싱 실패 → 빈 값(클라이언트가 폴백)
  }

  return new Response(JSON.stringify({ summary, greeting }), {
    headers: { "Content-Type": "application/json" },
  })
}
