# SAJUPLAY 디자인 시스템

> **SSOT(단일 소스)**: 토큰은 [`src/app/globals.css`](src/app/globals.css), TS 미러는 [`src/lib/ds.ts`](src/lib/ds.ts), 공용 컴포넌트는 [`src/components/ds.tsx`](src/components/ds.tsx).
> **라이브 쇼케이스**: 앱에서 [`/design`](http://localhost:3001/design) 열기 — 모든 토큰·컴포넌트를 눈으로 확인/공유.

화면 코드는 **리터럴 hex·하드 섀도우를 직접 쓰지 않는다.** 토큰 또는 `.ds-*` 유틸/`ds.tsx` 컴포넌트를 쓴다.

---

## 1. 원칙 (6)

1. **흰색 대신 파스텔** — 카드는 순백(`#FFFFFF`)이 아니라 따뜻한 아이보리(`--surface-card`). 강조 박스는 의미색 파스텔.
2. **소프트 섀도우만** — `0 Npx 0px #2D2D2D` 같은 블러 없는 하드 오프셋 섀도우 ❌. `border-2 border-charcoal` 두꺼운 차콜 외곽선 ❌. → `--shadow-*`(블러+낮은 불투명도) + `--line-soft` 경계.
3. **두들 O, 이모지 최소** — 아이콘은 두들 SVG(`<Ico as={Doodle..} />`). 시스템 이모지(👑🔥💎…)는 지양.
4. **폰트 역할 고정** — 제목/감성/기능 3역할을 일관되게 (아래 §3).
5. **일주 프로필 아바타 유지** — 그라데이션 링 + 오행 배경 + 두들 얼굴 조합은 우리 자산. 그대로 계승.
6. **그라디언트는 시그니처** — 위계 최상위 블록·AI 요약에만 핵심 그라디언트(`GRADIENT`). 디폴트 핑크, 오행 필요 시 목/화/토/금/수. 남발 금지 (아래 §2 핵심 그라디언트).

> **리디자인 ≠ 색만 갈아끼우기.** 각 화면은 **컴포넌트 중복·과한 depth·중복 정보**를 같이 진단해 통합/평탄화한다. (동일 패턴 → 공용 컴포넌트, 불필요한 중첩 카드 → depth 한 단계 제거 등 공격적 개선 허용)

---

## 2. 색 토큰

### 서피스 (배경)
| 토큰 | 값 | 용도 |
|---|---|---|
| `--surface-page` | `#FDF6EE` | 페이지 바탕(크림) |
| `--surface-card` | `#FFFCF6` | **기본 카드** (순백 아님) |
| `--surface-raised` | `#FFFFFF` | 카드 위 한 단계 더 뜬 작은 요소 한정 |
| `--surface-sunken` | `#F6EEE2` | 트랙·인셋·프로그레스 바탕 |

### 프라이머리
| 토큰 | 값 | 용도 |
|---|---|---|
| `--pink` | `#E84B6A` | 메인 포인트·CTA |
| `--pink-soft` | `#FFEDF2` | 파스텔 핑크 표면 |

### 의미색 5종 — 각 `bg`(표면) / `line`(경계) / `ink`(텍스트·아이콘)
| 이름 | 용도 | bg / line / ink |
|---|---|---|
| `love` | 연애·하이라이트 | `#FFEDF2` / `#FBC4D4` / `#E84B6A` |
| `info` | 정보·전환점 | `#EAF2FF` / `#BBD5FB` / `#3B7DD8` |
| `warn` | 주의·재물·번아웃 | `#FFF3E2` / `#FAD9A8` / `#C9821F` |
| `ok` | 긍정·건강 | `#E8F7EE` / `#B7E6C6` / `#2F9E5B` |
| `special` | 특별·전생·신비 | `#F1ECFE` / `#D7CAFB` / `#7C5CD6` |

오행색(`목화토금수`)은 `lib/saju-play/flavor.ts`의 `ELEM_BG/ELEM_COLOR` 유지.

### 핵심 그라디언트 — `GRADIENT` (위계 강조·AI 요약 시그니처)
> **SSOT**: [`src/lib/ds.ts`](src/lib/ds.ts) 의 `GRADIENT` (CSS 토큰 `--grad-*`). **그라디언트는 아무 데나 쓰지 않는다** — 위계상 가장 중요한 블록과 **AI 요약/풀이**를 가리키는 *시그니처 컬러*다. 그 외 일반 카드·박스는 파스텔(§서피스·의미색)을 쓴다.

**테마**: 디폴트 **`pink`**, 오행 커스텀이 필요할 때만 **`목/화/토/금/수`**. 오행 문자로 고를 땐 `gradOf(elemChar)`(오행 아니면 자동 핑크).

**한 테마 = 4종 토큰**
| 토큰 | 쓰임 | 예 |
|---|---|---|
| `surface` | 옅은 160deg **배경** (텍스트 위 가독성 ↑) | Hero·AI 요약 카드·상담 말풍선 배경 |
| `bold` | 진한 135deg **강조** (흰 텍스트) | 핵심 CTA, 대표 수치 배지(`GradBadge`) |
| `accent` | 단색 포인트 | 아이콘·테두리·강조 텍스트 |
| `glow` | 은은한 외곽 발광 | Hero 그림자에 살짝 |

| 테마 | surface (160deg) | bold (135deg) | accent |
|---|---|---|---|
| `pink`(디폴트) | `#FFF6FA → #FFFDF5` | `#FF8FB0 → #E84B6A` | `#E84B6A` |
| `목` | `#E9FBF1 → #FFF7EC` | `#6EE7B7 → #10B981` | `#34D399` |
| `화` | `#FFEFEC → #F6EFFA` | `#FDA4AF → #F43F5E` | `#FB7185` |
| `토` | `#FFF6DF → #EFFAF1` | `#FCD34D → #F59E0B` | `#F59E0B` |
| `금` | `#ECF3FB → #FFF8EC` | `#AEBFD0 → #64748B` | `#7C93AC` |
| `수` | `#E8F2FE → #FFF6EC` | `#93C5FD → #3B82F6` | `#3B82F6` |

- `surface`는 top(옅은 오행 틴트)→bot(따뜻한 아이보리)로 떨어지는 저채도 그라디언트 — 본문 가독성 우선. `bold`는 흰 텍스트 대비를 위해 끝색을 진하게.
- **적용 컴포넌트**: `<Hero theme>` (배경 surface + glow), `<GradBadge theme>` (bold). 상담탭 말풍선([`consult/page.tsx`](src/app/v3/consult/page.tsx))도 `gradOf(elemKey).surface`로 여기서 파생 — 별도 색 정의 없음.
- 새 오행/테마 추가 시 이 6종과 **동일한 밝기·채도 레벨**로 맞출 것.

### 라인 / 섀도우 / 라운드
- 경계: `--line-soft`(기본) · `--line-medium`(구분선)
- 섀도우: `--shadow-sm`(카드) · `--shadow-md`(떠있는 카드/히어로) · `--shadow-lg`(시트·모달) · `--shadow-pop`(핑크 CTA)
- 라운드: `--r-sm 12` · `--r-md 16` · `--r-lg 20`(카드) · `--r-xl 24`(히어로)

---

## 3. 폰트 — 역할 3종 (기준 일관)

| 역할 | 폰트 | 토큰 / 유틸 | 쓰는 곳 |
|---|---|---|---|
| **제목·강조·브랜드** | BinggraeTaom | `FONT.title` / `.font-title` | 섹션 제목, 카드 타이틀, 큰 숫자/브랜드 |
| **감성 카피·말맛·인용** | Cafe24Dongdong | `FONT.flavor` / `.font-flavor` | 설명문, 다정한 한 줄, `"인용"` |
| **기능·데이터·긴 본문** | Pretendard(기본) | 지정 불필요 | 라벨, 표/수치, 길게 읽는 본문 |

> 기존엔 감성 폰트(Cafe24)를 거의 모든 본문에 남발 → 가독성/위계 흐림. **긴 본문·데이터는 Pretendard**, 감성 한 줄에만 Cafe24.

본문 최소 14px. 스케일: nano 11 · micro 12 · caption 13 · body 14 · h3 15 · h2 17 · h1 20 · display 24.

---

## 4. 컴포넌트 ([`components/ds.tsx`](src/components/ds.tsx))

| 컴포넌트 | 용도 |
|---|---|
| `<Ico as={Doodle} size>` | 두들 아이콘(넘침 방지 고정 박스) |
| `<Card raised flat>` | 표준 파스텔 카드 |
| `<InfoBox accent icon title>` | 의미색 강조 박스(앱 곳곳 "색 박스" 통합) |
| `<SectionTitle icon basis>` | 섹션 헤더(+출처 배지) |
| `<ChapterDivider n title>` | 번호 챕터 구분선 |
| `<Hero icon title basis theme>` | 위계 최상위·AI 요약 히어로 (핵심 그라디언트 `theme`, 디폴트 pink) |
| `<GradBadge theme>` | bold 그라디언트 강조 칩/배지 (흰 텍스트·대표 수치·핵심 CTA) |
| `<Prose text>` | `**굵게**` 지원 문단 본문 |
| `<Basis>` | 데이터 출처 배지 |

도메인(사주) 전용 — `Avatar`/`EmptySlot`/`ElemBar`/`SplitBar`는 [`lib/saju-play/ui.tsx`](src/lib/saju-play/ui.tsx).

---

## 5. 마이그레이션 상태

각 Phase는 **리스타일 + 컴포넌트 통합/depth 평탄화**를 함께 한다.

- [x] Phase 0 — 토큰 + 키트(+그라디언트) + 문서 + `/design` 쇼케이스
- [ ] Phase 1 — 최종리포트(`self/report.tsx`) — **v1↔v2 비교 토글 제공**, 자체 재정의 컴포넌트 제거·중복 섹션 통합
- [ ] Phase 2 — 상세 펀널(self/sinsal/nextmonth/some/onesided) — 표지/페이월/로딩 공용화
- [ ] Phase 3 — shop 탭 + 하단 네비(글리프→두들)

**안티패턴 청산 대상**: `boxShadow: "... 0px #2D2D2D"`, `border-2 border-charcoal`, 인라인 hex, 시스템 이모지 (현재 ~91곳).
