-- Saju México 초기 스키마

-- 사주 계산 결과 저장
create table if not exists saju_results (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  gender text not null check (gender in ('male', 'female')),
  birth_year int not null,
  birth_month int not null,
  birth_day int not null,
  birth_hour int not null,
  birth_minute int not null,
  birth_city text not null,
  unknown_time boolean default false,

  -- 사주 계산 데이터 (JSON)
  pillars jsonb not null,
  five_elements jsonb not null,
  day_master jsonb not null,
  ten_gods jsonb,
  twelve_phases jsonb,
  strength jsonb,
  yong_shin jsonb,
  gi_shin jsonb,
  major_fortunes jsonb,
  yearly_fortune jsonb,
  monthly_fortunes jsonb,
  relations jsonb,
  special_stars jsonb,
  spirit_stars jsonb,

  -- 결제/리포트
  paid boolean default false,
  payment_id text,
  payment_method text,
  payment_amount decimal(10,2),
  paid_at timestamptz,

  -- Claude API 리포트
  report jsonb,
  report_generated_at timestamptz,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 인덱스
create index if not exists idx_saju_results_created_at on saju_results(created_at desc);
create index if not exists idx_saju_results_paid on saju_results(paid) where paid = true;

-- updated_at 자동 갱신 트리거
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger saju_results_updated_at
  before update on saju_results
  for each row execute function update_updated_at();

-- RLS (Row Level Security)
alter table saju_results enable row level security;

-- 누구나 자기 결과 읽기 (UUID 기반, 인증 불필요)
create policy "Anyone can read by id"
  on saju_results for select
  using (true);

-- 서버에서만 생성/수정 (service_role 키 사용)
create policy "Service can insert"
  on saju_results for insert
  with check (true);

create policy "Service can update"
  on saju_results for update
  using (true);
