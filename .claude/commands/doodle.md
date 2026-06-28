유저가 제시한 단어/문구에 맞는 두들 스티커 SVG 컴포넌트를 생성한다.

## 절차

1. `packages/web-kr/DOODLE-STYLE-GUIDE.md`를 읽어서 스타일 규칙을 확인한다
2. `packages/web-kr/src/components/doodles.tsx`에서 기존 스티커 목록과 코드 패턴을 확인한다
3. 스타일 가이드의 규칙에 따라 새 SVG 컴포넌트를 작성한다:
   - 컬러: 가이드 팔레트 내에서만 선택
   - 아웃라인: #2D2D2D, strokeWidth 1~1.5
   - 얼굴: 카테고리별 가이드에 따라 선택적 적용
   - 형태: 기본 도형 조합, 유기적 곡선, path 노드 10개 이하
   - 네이밍: Doodle{PascalCase}
4. `doodles.tsx` 파일의 `ScatteredDoodles` 컴포넌트 바로 위에 새 컴포넌트를 추가한다 (기존 코드 수정 금지)
5. 추가 후 export 확인
6. `DOODLE-STYLE-GUIDE.md`의 "기존 스티커 목록" 테이블에 새 항목을 추가한다

## 미리보기 페이지 관리

- **두들 미리보기**: `preview/page.tsx` — 두들 스티커 전체 그리드
- **로고 미리보기**: `preview-logo/page.tsx` — 로고 심볼 시안
- **이 2개 페이지만 사용한다.** 별도 preview 페이지를 새로 만들지 않는다.
- 새 두들 추가 시 `preview/page.tsx`의 ALL_DOODLES 배열에 추가하고, import도 추가한다.

## ⚠️ preview 페이지에 섹션 추가 시 주의 (반복 에러 방지)

preview-logo/page.tsx 등에 새 시안을 추가할 때 **wrapper `<div>` 닫힘 위치** 때문에 500 에러가 반복됨.

**반드시 지킬 것:**
1. 새 섹션 추가 전에 `</div>` depth를 확인한다
2. 마지막 `</div>` (wrapper `max-w-[700px]` 닫기) 바로 **앞에** 새 섹션을 삽입한다
3. 추가 후 `npx tsc --noEmit`으로 구조 에러 확인한다 (jsx 에러는 무시, closing tag 에러만 확인)
4. 500 에러 발생 시: `taskkill //f //im node.exe` → `rm -rf .next` → 재시작

## 입력

$ARGUMENTS — 생성할 두들의 단어/문구 (예: "커피", "왕관", "무지개", "선글라스 낀 곰")

## 규칙

- 한 번에 여러 단어를 받으면 각각 별도 컴포넌트로 생성
- 기존 스티커와 중복되면 알리고 스킵
- 반드시 DOODLE-STYLE-GUIDE.md의 컬러/선/형태 규칙을 따를 것
- 생성 후 결과를 간단히 보여줄 것 (이름, fill 색상, 얼굴 유무)
