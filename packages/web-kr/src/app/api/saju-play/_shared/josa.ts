// 한글 받침 판정으로 조사를 결정적으로 분기. josa(단어, 받침O일때, 받침X일때).
// 한글이 아니면(영문·숫자·기호) 안전하게 '받침O' 값을 반환.
export const josa = (w: string, withBatchim: string, noBatchim: string): string => {
  if (!w) return withBatchim
  const c = w.charCodeAt(w.length - 1) - 0xac00
  if (c < 0 || c > 11171) return withBatchim
  return c % 28 ? withBatchim : noBatchim
}

// 라우트별 첫 줄 훅 — 코드에서 결정적으로 조립(조사 안전). 모델은 본문만 쓰고 이 훅이 맨 앞에 붙는다.
export const hookSome = (them: string) => `${them}${josa(them, "과", "와")}의 케미, 두 기운부터 살펴보자.`
export const hookOnesided = (them: string) => `${them}${josa(them, "은", "는")} 어떤 마음의 사람인지, 사주로 들여다볼게.`
export const hookSinsal = () => `네 사주에 새겨진 타고난 기운부터 펼쳐볼게.`
export const hookSelf = () => `너라는 사람, 사주로 한 장씩 펼쳐볼게.`
export const hookNextmonth = () => `다음달 네 흐름, 미리 펼쳐볼게.`

// 모델 본문 앞에 훅을 붙인다. 본문이 비면 빈 문자열(클라가 폴백).
export const withHook = (hook: string, body: string) => (body ? `${hook}\n\n${body}` : "")
