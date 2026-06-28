# 🗂️ 사주 보관함 (저장된 결과 리포트) 기획안 · v1 확정

> 작성일: 2026-06-29 · 대상: `/v3/my/archive`
> 상태: **0단계(기획) 확정** → 다음 1단계(저장 계층)

---

## 0. 컨셉

사용자가 **본 결과 리포트를 그대로 박제해 저장**하는 공간. 상품 재진입이 아니라,
"내가 그때 본 리포트"를 **랜딩·페이월 없이 최종 화면으로 바로** 다시 보는 기록 보관함.

대상 리포트 7종: **나 사용설명서(self) · 신살 도감(sinsal) · 다음달 운(nextmonth)**
/ **썸(some) · 짝사랑(onesided) · 친구(compat) · 커플(couple)**.

---

## 1. 확정 결정

| 항목 | 확정값 |
|---|---|
| 무엇을 저장 | **그날 계산된 데이터 통째 + AI 응답 원문** 스냅샷 (재계산·재호출 없이 동일 재현) |
| 저장 시점 | **리포트 완성 순간 자동** (페이월 해제 후 렌더 완료 시) |
| 중복 | **같은 type + 같은 subject(+nextmonth는 대상월)** → 최신으로 갱신 |
| 저장소 | **localStorage** (`consult-history` 방식) → 후속 Supabase 이관 |
| 재현 | 본문을 **순수 컴포넌트 `<XxxReport data aiText/>`로 분리** → 공용 뷰어가 type별 렌더 |
| 분류 | **나**(내 1인 리포트) = 별도 섹션 / **타인**(친구 1인 + 모든 관계) = 시간순 단일 리스트, 필터 없음 |
| 인물 표현 | 카드 **아바타 구성**으로 (1인=단일 / 관계=마주보기) + 이름 |

---

## 2. 데이터 모델

```ts
type ReportType = "self" | "sinsal" | "nextmonth" | "some" | "onesided" | "compat" | "couple"

type Subject = {
  who: "me" | "other"
  name: string          // "나" 또는 입력 이름
  birthKey: string      // 생년월일(+시) 정규화 해시 — me 판정·중복 판정
  friendId?: string     // useFriends 연동 시
  iljuKey?: string       // 카드 아바타용 (예: 경진-m)
}

type ReportRecord = {
  id: string
  type: ReportType
  createdAt: number
  subjects: Subject[]            // 1인=1, 관계=2+
  group: "me" | "others"        // 파생: subjects 1명 & who==="me" → "me", 그 외 → "others"
  title: string                  // "나 사용설명서" / "나 × 민지 · 썸"
  highlight: string              // "시그니처 · 흰호랑이" / "88%" / "맑음"
  snapshot: {
    v: number                    // 스키마 버전
    data: unknown                // buildSelf/buildSinsal/buildNextMonth/... 결과 통째
    aiText: string               // 그 당시 AI 응답 원문(없으면 폴백 줄글 저장)
  }
}
```

- **group 규칙**: `subjects.length===1 && subjects[0].who==="me"` → `"me"`, 아니면 `"others"`.
  → "나" 섹션엔 내 1인 리포트만. 친구 1인·모든 궁합은 "타인"으로.
- **me 판정**: 입력 생일을 정규화한 `birthKey`가 내 계정(`useUser().birthDate`)과 같으면 `who:"me"`.

---

## 3. 저장 흐름

1. 펀널에서 페이월 해제 → PaidBody 렌더 완료 시점에 `saveReport(record)` 1회.
2. `record.snapshot.data` = 그 화면이 쓰는 계산 결과 객체 그대로. `aiText` = 현재 AI 상태(done이면 원문, 아니면 폴백 줄글).
3. 같은 키(type+subjects(+ym)) 존재 시 갱신(덮어쓰기).

> ⚠️ AI 응답이 늦게 오면? 저장은 **AI done 이후** 또는 폴백 확정 후로. (idle/loading 중 저장 금지)

---

## 4. 재현 아키텍처 (핵심)

**본문(PaidBody)을 펀널에서 떼어내 순수 컴포넌트로:**

```
lib/saju-play/self/report.tsx → SelfReport({ data: SelfData, aiText: string })
```

- **펀널**(라이브): `<SelfReport data={buildSelf(...)} aiText={ai.text}/>`
- **뷰어**(저장본): `/v3/report/[id]` → 레코드 로드 → `switch(type)` → 같은 컴포넌트에 `snapshot.data`·`snapshot.aiText` 주입.
- → 결과 화면 **한 벌**, 진입로만 둘. 디자인 수정 시 양쪽 자동 일치.

**type별 본문 추출 단위 (7종 → ~6 작업):**
| 추출 단위 | 커버 |
|---|---|
| `self/report` | self |
| `sinsal/report` | sinsal |
| `nextmonth/report` | nextmonth |
| `crush/report` | some · onesided (공유 코어) |
| `compat/report` | compat (자체 페이지) |
| `couple/report` | couple (자체 페이지) |

> compat·couple은 현재 자체 페이지(목업 포함)라 `data` 형태가 제각각 → type별 스냅샷 어댑터 필요.

---

## 5. 보관함 UI

```
사주 보관함
──────────────────────────
나                              ← 별도 섹션(상단 고정)
  🟢 나 · 신살 도감        오늘
  🟢 나 · 다음달 운        1주 전

다른 사람                        ← 시간순 단일 리스트, 필터 없음
  👥 나 × 민지 · 썸 88%    어제
  🟢 철수 · 사용설명서     3일 전
  👥 나 × 엄마 · 궁합 91%  1주 전
```

- **카드 = 기록 row** (상품 카드 아님): 아바타 구성 + 제목 + 결과 하이라이트 + 저장 날짜 + type 칩.
  - 1인 → 단일 아바타 / 관계 → 나+상대 마주보기(모임은 N겹).
  - 탭 → `/v3/report/[id]` 직행.
- 디자인 톤: 친구/커플 결과화면과 동일(두들 Ico·BINGGRAE/GAEGU·핑크·구분선).
- 빈 상태: "아직 저장된 리포트가 없어요 — 분석을 보면 여기 쌓여요."
- 인물별 보기·검색은 **미도입**(개수 적을 것). 길어지면 시간 버킷(오늘/이번주/이전)만 후속 검토.

---

## 6. 단계별 로드맵

1. **저장 계층** — `lib/report-archive.ts`(타입+save/list/get/delete, localStorage) + `useReports()`.
2. **파일럿(self)** — `SelfReport` 본문 추출 → 펀널이 사용 + 완성 시 `saveReport`.
3. **뷰어 라우트** — `/v3/report/[id]` (self부터 렌더).
4. **보관함 UI 재설계** — 나 섹션 + 타인 시간순 기록 리스트, 카드 비주얼.
5. **롤아웃** — sinsal·nextmonth·crush(some/onesided)·compat·couple 본문 추출 + 저장 연결.
6. **정리** — 기존 목업 "📁 내 보관함" 통합/제거 · (후속) Supabase 이관.

---

## 7. 참고 코드 위치

- 저장 선례: `lib/consult-history.ts` (localStorage 패턴)
- 분석기 코어: `lib/saju-play/{self,sinsal,nextmonth}/core.tsx`, `lib/saju-play/crush/core.tsx`
- 자체 페이지: `app/v3/{compat,couple}/page.tsx`
- 유저/생일: `lib/UserContext.tsx`, `lib/mockAuth.ts` (`birthDate`)
- 친구: `hooks/useFriends.ts` · 일주/캐릭터: `lib/ilju-calc.ts`, `lib/ilju-svg-icons.tsx`
- 마이 진입점: `app/v3/my/page.tsx` · 현재 임시 보관함: `app/v3/my/archive/page.tsx`
