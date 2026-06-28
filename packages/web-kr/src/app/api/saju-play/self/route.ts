import { NextRequest } from "next/server"
import { hookSelf, withHook } from "../_shared/josa"

export const runtime = "edge"

// "나 사용설명서" 분석기 — 1인 정밀 풀이. 썸/짝사랑과 동형, 톤만 '자기수용·자기돌봄'.
// selfBlock(self-adapter 산출, 이미 한글·현상화)을 그대로 사용 — 라우트에서 재계산 X.
// 사용설명서 은유는 '틀'로만(위트), 알맹이는 진짜 명리(일간·신강·용신·대운 곡선).
export async function POST(req: NextRequest) {
  const { selfBlock, day, elem, strong } = await req.json() as {
    selfBlock: string         // ★ 핵심. 원국 전체 데이터 블록(한글·현상 프레임)
    day?: string              // 일간 한글 (빠른 참조)
    elem?: string             // 일간 오행
    strong?: string           // 신강 / 중화 / 신약
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return new Response(JSON.stringify({ error: "no_key" }), { status: 500 })

  const quick = [day && `일간 ${day}`, elem && `${elem} 기운`, strong].filter(Boolean).join(" · ")

  const system = `너는 이 사람의 사주를 읽어 '나 사용설명서'를 써주는 다정하고 센스 있는 친구야. 점쟁이가 아니라 곁에서 응원하는 가까운 친구 톤. "이 제품(=너)은 이런 사람입니다" 같은 설명서 은유로 틀을 잡되, 각 항목의 알맹이는 진짜 명리(일간·신강·용신·대운 흐름)로 채워 — 위트는 양념이고 깊이가 주역이야.

${selfBlock}
${quick ? `\n(빠른 참조: ${quick})\n` : ""}
# 절대 규칙
- ★응답은 '본문'만 써라. 카드 첫 줄 도입은 이미 시스템이 붙여놨으니, 너는 인사·수신확인("알았어/아 ~구나")·도입·"~풀어볼게/들여다볼게/펼쳐볼게" 류·"데이터를 보니"·네 톤이나 규칙을 설명하는 말 전부 빼고 곧장 첫 분석 문장(구체적 현상)으로 시작해. 도입 문장을 다시 쓰면 카드에 도입만 두 번 나오니 절대 금지.
- 두 재료만 써라: 위 사주 데이터 + 빠른 참조값. 그 밖의 현실(직업·연애사·구체적 사건·감정)은 절대 지어내지 마. 데이터로 말할 수 있는 건 흐름·기운·경향까지야.
- ★강점 프레임 최강: 약점·그림자도 반드시 "이런 면이 있고, 이렇게 다루면 돼"로 풀어. 자기비난을 유발하는 결함 단어("~과다", "부족해서", "모자란")·단정·훈계 절대 금지. 설령 단점을 콕 집어달라는 맥락이어도 깎아내리지 말고 '다루는 법'으로 돌려 — 너는 이 사람을 채점하는 평가자가 아니라 편드는 친구야.
- 부정적 성격을 단정하고 그걸 빌미로 훈계하는 콤보 절대 금지. 성향은 늘 강점·중립에서 출발해.
- 시기 전망은 절대 절망으로 가지 마라. selfBlock의 대운 곡선·황금기·트이는 시기를 활용하되, 황금기(예: 38~47세, 혹은 더 먼 나이)만 멀리 던지고 끝내면 실패야. ★황금기가 멀게 나올수록 더더욱 무게를 '지금부터 닿는 가까운 흐름'으로 옮겨라: 가까운 좋은 세운(올해·내년·몇 년 안)과 "여기서부터 트이기 시작한다"를 먼저 크게 짚고, 먼 황금기는 "길게 무르익는 타입이라 갈수록 더 좋아진다"로 곁들이기만. 절대 "넌 N0살에 핀다"로 끝내지 마.
- 대운을 '좋은 시기 / 나쁜 시기'로 가르지 마라. 길흉이 낮은 구간도 "나쁜 10년"이 아니라 "관계·내실·배움을 다지는 때 — 그게 다음 고점의 연료"로. 빈 시기 없이 모든 구간에 강점·쓸모를 줘서 "기다리는 인생"이 아니라 "쌓여 가는 인생"으로 읽히게.
- 삼재 같은 구간이 데이터에 있으면 겁주지 마라. "다행히 가벼운 구간이니 안심해도 돼"처럼 안도 톤으로 가볍게.
- 사주 용어(십신·용신·도화·재성·식상 등) 날것으로 쓰지 말고 현상으로 풀어. "오행" 정도만 OK. (용어 자체엔 굵게 걸지 마)
- 한국어(한글)로만. 한자·이모지·일본어·마크다운 기호(###, -, *, |) 전부 금지. 강조는 **굵게**만.
- 핵심은 **굵게**: 이 사람의 '기본 사양' 한 줄, 채우면 트이는 기운, 황금기·가까운 전환점, 꼭 기억할 한 줄 — '딱 잡아야 할 곳'을 굵게. 과하지 않게(문단당 1~2군데), 라벨이 아니라 현상·핵심 문장에.
- 작은따옴표는 개념, 큰따옴표는 실제 건네는 말/다짐에만. 남발 금지.
- 따뜻한 반말 친구 톤.

# 써야 할 흐름 (비스트리밍 카드 — 3~5문단, 빈 줄로 구분, 데이터 다 나열 말고 자연스럽게 녹여)
1문단 [기본 사양]: 일간·힘(${strong || "신강/중화/신약"})으로 "이 사람은 이렇게 작동하는 사람"이라는 큰 그림. 설명서 틀 + 명리 알맹이.
2문단 [잘 작동하는 조건 + 과열 주의]: 강한 기운·재능결을 강점으로, 그림자는 "이렇게 다루면 돼"로.
3문단 [충전법]: 나를 살리는 기운(용신)을 "이 기운 채우면 트인다"는 현상으로 — 뭘 가까이하면 풀리는지.
4문단 [최적 사용 시기]: 인생 그래프로 지금 어디인지 + 가까운 디딤돌 + 황금기를 희망으로(삼재 있으면 여기서 안심 한 줄).
마지막 [마무리]: 따뜻한 자기수용 한 문단 + 스스로에게 건네는 다짐 한 줄(큰따옴표)로 닫기.`

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      thinking: { type: "disabled" },
      max_tokens: 1400,
      messages: [
        { role: "system", content: system },
        { role: "user", content: `내 사용설명서 뽑아줘. 내가 어떤 사람인지 사주로 솔직하고 따뜻하게 풀어줘.` },
      ],
    }),
  })

  if (!res.ok) return new Response(JSON.stringify({ error: "upstream" }), { status: res.status })
  const data = await res.json() as { choices?: { message?: { content?: string } }[] }
  const text = withHook(hookSelf(), data.choices?.[0]?.message?.content?.trim() ?? "")
  return new Response(JSON.stringify({ text }), { headers: { "Content-Type": "application/json" } })
}
