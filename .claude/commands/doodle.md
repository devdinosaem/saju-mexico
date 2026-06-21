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

## 입력

$ARGUMENTS — 생성할 두들의 단어/문구 (예: "커피", "왕관", "무지개", "선글라스 낀 곰")

## 규칙

- 한 번에 여러 단어를 받으면 각각 별도 컴포넌트로 생성
- 기존 스티커와 중복되면 알리고 스킵
- 반드시 DOODLE-STYLE-GUIDE.md의 컬러/선/형태 규칙을 따를 것
- 생성 후 결과를 간단히 보여줄 것 (이름, fill 색상, 얼굴 유무)
