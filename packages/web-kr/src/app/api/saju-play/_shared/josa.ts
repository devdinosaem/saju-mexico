// 한글 받침 판정으로 조사를 결정적으로 분기. josa(단어, 받침O일때, 받침X일때).
// 한글이 아니면(영문·숫자·기호) 안전하게 '받침O' 값을 반환.
export const josa = (w: string, withBatchim: string, noBatchim: string): string => {
  if (!w) return withBatchim
  const c = w.charCodeAt(w.length - 1) - 0xac00
  if (c < 0 || c > 11171) return withBatchim
  return c % 28 ? withBatchim : noBatchim
}

// 이름 친근형: 한글 받침 이름엔 "이"를 붙임(한샘→한샘이), 받침 없으면 그대로(지호), 한글 아니면 그대로(Alex).
// → 친근형은 항상 모음으로 끝나므로 뒤 조사는 모음형(와/는/가) 고정.
export const friendlyName = (w: string): string => {
  if (!w) return w
  const c = w.charCodeAt(w.length - 1) - 0xac00
  return c >= 0 && c <= 11171 && c % 28 ? `${w}이` : w
}

// 라우트별 첫 줄 훅 — 코드에서 결정적으로 조립. 모델은 본문만 쓰고 이 훅이 맨 앞에 붙는다.
// 이름 있으면 친근형(한샘이와의/지호와의), 없으면 이름 없는 폴백.
export const hookSome = (them: string) =>
  them ? `${friendlyName(them)}와의 케미, 두 기운부터 살펴보자.` : `두 사람 케미부터 살펴보자.`
export const hookOnesided = (them: string) =>
  them ? `${friendlyName(them)}는 어떤 마음의 사람인지, 사주로 들여다볼게.` : `그 사람은 어떤 마음의 사람인지, 사주로 들여다볼게.`
export const hookSinsal = () => `네 사주에 새겨진 타고난 기운부터 펼쳐볼게.`
export const hookSelf = () => `너라는 사람, 사주로 한 장씩 펼쳐볼게.`
export const hookNextmonth = () => `다음달 네 흐름, 미리 펼쳐볼게.`

// 모델 본문 앞에 훅을 붙인다. 본문이 비면 빈 문자열(클라가 폴백).
export const withHook = (hook: string, body: string) => (body ? `${hook}\n\n${body}` : "")
