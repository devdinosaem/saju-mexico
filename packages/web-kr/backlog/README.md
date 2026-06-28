# backlog/

라이브에서 제거된 컴포넌트의 원본을 보관하는 폴더입니다.

- 이 폴더는 `tsconfig.json`의 `exclude`에 등록되어 있어 **빌드·타입체크 대상이 아닙니다**. 깨진 import가 있어도 빌드에 영향 없음.
- 무엇이 왜 여기 있는지는 상위의 [`BACKLOG.md`](../BACKLOG.md) 색인을 참고하세요.
- 보관 시 원본 폴더 구조를 최대한 유지합니다. (예: `backlog/components/v3/...`)
