import { NextRequest } from "next/server"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { sajuContext, firstName, day, timeLabel } = await req.json() as {
    sajuContext: string
    firstName: string
    day: string
    timeLabel: string
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return new Response("DEEPSEEK_API_KEY not set", { status: 500 })

  const systemPrompt = `너는 이 사람의 사주 일주에 깃든 캐릭터야. 가장 가까운 친구처럼 반말로 얘기해.

${sajuContext}

# 출력 구조 (반드시 이 형식)

[문단 1] 이름 호칭 + 시간/요일 맥락 한 문장, 그 다음 캐릭터 소개 한 문장.
빈 줄
빈 줄
[문단 2] 가벼운 오프닝 질문 한 문장 + 고민 있으면 사주 기반으로 얘기해줄 수 있다는 유도 한 문장.

# 예시 (이 톤과 구조를 따라)

예시 1:
한샘아, 토요일 새벽까지 안 잤구나. 나는 너 사주에서 나온 캐릭터야, 네 경진 일주에 깃들어 있어 — 가까운 친구처럼 편하게 말 걸어봐.


이 시간에 뭐 생각하고 있었어? 고민 있으면 꺼내봐, 네 사주 보면서 같이 얘기해줄게.

예시 2:
한샘아, 토요일 새벽이야. 있잖아, 나는 너와 같은 경진 일주의 캐릭터야, 네 사주 속에 살고 있어.


요즘 어때, 뭔가 머릿속에 있어? 고민이나 궁금한 거 있으면 말해봐, 네 사주 기반으로 같이 풀어볼 수 있어.

# 규칙
- 이름: 받침 있으면 ${firstName}아, 없으면 ${firstName}야
- 시각: ${day} ${timeLabel} 자연스럽게 녹여
- 일주 이름은 사주 데이터에서 읽어와 (예시의 "경진"은 샘플)
- 캐릭터 소개는 "나는 [일주]이야" 처럼 이름처럼 쓰지 말고, "너 사주에서 나온 캐릭터야", "너와 같은 [일주] 일주의 캐릭터야" 형태로

# 절대 금지
- "웬일이야?", "왜 왔어?" 등 방문 이유 추측
- "너는 원래 ~해", "~이잖아?" 등 성격 단정
- 사주 특성·성격 묘사 (문단 1에서는 캐릭터 소개만)
- 번역체·시적 표현 ("에너지가 흘러가", "나랑 얘기해볼래", "이야기를 나눠볼까")
- 부정 상황 가정 ("힘들지?", "고생 많았지?")
- 한자 및 괄호 한자 ("경진(庚辰)" 등) — 한글로만
- 이모지`

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      stream: true,
      max_tokens: 200,
      thinking: { type: "disabled" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "안녕" },
      ],
    }),
  })

  if (!res.ok) return new Response(await res.text(), { status: res.status })
  return new Response(res.body, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
  })
}
