# 컴포넌트 백로그 (Component Backlog)

라이브 코드(`src/`)에서는 제거했지만 나중에 다시 꺼내 쓸 수 있도록 보관하는 컴포넌트 색인입니다.

## 동작 방식

- **보관 위치**: `packages/web-kr/backlog/` (`tsconfig.json`의 `exclude`에 등록되어 빌드·타입체크에서 제외됨 → 라이브에 영향 0)
- **복원 방법**: 해당 파일을 `원래 위치`로 다시 옮기고 import를 연결하면 부활.
- **진짜 안전망**: 모든 제거는 git에 커밋됨. 색인이 유실돼도 `git log --grep="\[backlog\]"`로 추적 가능.

## 분류

| 상태 | 의미 |
| --- | --- |
| 📦 보관 | backlog 폴더에 파일 보존 — 언제든 복원 가능 |
| 🗑️ 완전삭제 | 보관 없이 제거 — git 히스토리에만 존재 |

---

## 보관 목록

| 컴포넌트 | 원래 위치 | backlog 경로 | 제거 커밋 | 왜 뺐나 / 언제 꺼낼까 |
| --- | --- | --- | --- | --- |
| 전남친운·전여친운 / 엄마운·아빠운 상품 카드 (shop 4종) | `src/app/v3/shop/page.tsx` | `backlog/components/v3/shop/ExAndParentFortuneCards.tsx` | `94fb0b6` | shop 페이지 간소화. 연결 참조도 함께 제거: charge 가격표 `전남친·전여친운` 행 삭제·`올해운·부모운`→`올해운` 축소, my 보유샘플 `전남친운` 삭제. 상품 라인업 부활 시 복원 |
| "오늘 뭐 먹었어?" 음식→오행 트래커 (FoodLogger) | `src/app/v3/calendar/_components/FoodLogger.tsx` | `backlog/components/v3/calendar/FoodLogger.tsx` (+ `FoodLogger.POLICY.md` 정책 명세) | `612f898` | 운기달력 탭 간소화. 음식 분류 규칙·과다/부족 반응·용신 목표선·주간리포트(구독게이트) 등 정의된 정책 전부 POLICY.md에 상세 기록. APP-UI-PLAN `### B. 오행 밸런스 트래커 상세`(UI 기획 포함)도 POLICY.md로 병합. 트래커 부활 시 복원 |
| 레거시 리포트 결제 흐름 (purchase→generating→result/report) | `src/app/{purchase,result,report,generating}/[id]/page.tsx` | `backlog/app/{purchase,result,report,generating}/[id]/page.tsx` | _(이 커밋)_ | v1/v2 ₩9,900 원화 풀리포트 흐름. v3 saju-play(명태 페이월)로 대체돼 인바운드 링크 0(고아). 결제·리포트 페이지 재설계 시 디자인 참고용으로 보존 |

---

## 완전삭제 로그

| 컴포넌트 | 원래 위치 | 제거 커밋 | 사유 |
| --- | --- | --- | --- |
| "내 오행 밸런스" 정적 막대 블록 (사주 오행 분포 pct) | `src/app/v3/calendar/page.tsx` | `1378db8` | 운기달력 간소화. 정적 목업 위젯(BALANCE 상수)이라 보관 불필요 → 아예 삭제. BALANCE 상수·DoodleSparkle·ElementBadgePill import 함께 정리 |
| 출석 스트릭 (AttendanceStreak) | `src/app/v3/calendar/_components/AttendanceStreak.tsx` | `d6825aa` | 운기달력 간소화. 출석 기능 완전 삭제(컴포넌트 파일째 제거) |
| 운기달력 탭 전체 (`/v3/calendar`) | `src/app/v3/calendar/` (page+MyIljuCard+StoryRow) | _(이 커밋)_ | 탭 자체 삭제. 5탭→4탭. BottomNav·TestPanel 링크 제거, APP-UI-PLAN 탭표/섹션 정리. 남은 기능은 이미 마이 이전/백로그/삭제 완료라 폴더는 미사용 잔여물뿐 → 완전 삭제 |
