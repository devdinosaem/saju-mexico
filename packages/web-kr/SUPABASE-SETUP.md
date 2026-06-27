# 사주TI 백엔드 (Supabase) 셋업 — 트랙 B

localStorage mock → 실제 백엔드(Supabase + 카카오 로그인) 전환. 1차 소셜로그인은 **카카오만**.

## Phase 0 — 외부 설정 (사용자 직접)

### 1. Supabase 프로젝트
1. https://supabase.com → New project 생성 (리전: Northeast Asia (Seoul) 권장)
2. **Project Settings → API** 에서 복사 → `packages/web-kr/.env.local` 에 추가:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...   # 서버 전용
   ```

### 2. 스키마 적용
- Supabase 대시보드 **SQL Editor** 에 `supabase/migrations/0001_init.sql` 내용 붙여넣고 실행
  (또는 Supabase CLI: `supabase db push`)

### 3. 카카오 로그인
1. https://developers.kakao.com → 애플리케이션 추가
2. **앱 키 → REST API 키** 복사
3. **카카오 로그인 → 활성화 ON**, **Redirect URI** 에 다음 추가:
   ```
   https://<PROJECT-REF>.supabase.co/auth/v1/callback
   ```
4. **보안 → Client Secret** 발급(코드 발급 시 사용)
5. Supabase 대시보드 **Authentication → Providers → Kakao**:
   - Enable ON
   - REST API 키 → `Client ID`, Client Secret → `Client Secret`
6. Supabase **Authentication → URL Configuration → Site URL** 에 개발 주소(`http://localhost:3001`)와 배포 주소 추가

### 4. 확인
- `.env.local` 채운 뒤 **dev 서버 재시작** (env는 시작 시 로드)

---

## Phase 1 — 인프라 (완료, 코드)
- `@supabase/supabase-js`, `@supabase/ssr` 설치
- `src/lib/supabase/{client,server,types}.ts` 클라이언트/타입
- `supabase/migrations/0001_init.sql` 스키마 + RLS
  - profiles(일주 1개) / friendships(초대·수락) / rooms(방 JSON) / guestbook_entries
  - RLS: 방명록 **친구만 작성**, **내 글·내 벽 글 삭제**, 방은 **친구만 읽기**

## 다음 (Phase 2~4)
- **2 인증**: mockAuth → Supabase Auth(카카오). `/auth/callback` 라우트, 미들웨어 세션 갱신, UserContext 교체
- **3 데이터 실연동**: rooms 동기화, friendships 초대 플로우, guestbook 실저장·실전달
- **4 정리**: 샘플 친구·localStorage 친구모델 제거
