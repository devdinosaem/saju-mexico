import type { FiveElement } from 'manseryeok';
import type { TenGod, StrengthLevel } from 'saju-engine';

export type Gender = 'male' | 'female';

export interface ReportInput {
  userName: string;
  gender: Gender;
  birth: {
    date: string;       // YYYY-MM-DD
    time: string;       // HH:MM
    city: string;
    timezone: string;
  };
  fourPillars: {
    year: PillarInfo;
    month: PillarInfo;
    day: PillarInfo;
    hour: PillarInfo;
  };
  fiveElements: Record<FiveElement, number>;
  dayMaster: {
    stem: string;
    element: FiveElement;
    elementSpanish: string;
    yinYang: string;
    korean: string;
  };
  tenGods: {
    entries: TenGodInfo[];
    percentages: Record<TenGod, number>;
  };
  twelvePhases: {
    year: PhaseInfo;
    month: PhaseInfo;
    day: PhaseInfo;
    hour: PhaseInfo;
  };
  spiritStars: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  specialStars: string[];
  strength: {
    level: StrengthLevel;
    levelKorean: string;
    levelSpanish: string;
    score: number;
    deukryeong: boolean;
    friendCount: number;
    foeCount: number;
  };
  yongShin: {
    element: FiveElement;
    elementKorean: string;
    elementSpanish: string;
    category: string;
  };
  giShin: {
    element: FiveElement;
    elementKorean: string;
  };
  majorFortunes: {
    direction: string;
    startAge: number;
    fortunes: FortuneInfo[];
  };
  yearlyFortune: {
    year: number;
    age: number;
    ganZhi: string;
    stemTenGod: string;
    branchTenGod: string;
    phase: string;
  };
  monthlyFortunes: MonthlyFortuneInfo[];
  relations: string[];
}

export interface PillarInfo {
  stem: string;
  branch: string;
  korean: string;
  stemElement: string;
  branchElement: string;
  tenGod: string;
}

export interface TenGodInfo {
  position: string;
  char: string;
  tenGod: TenGod;
  korean: string;
  spanish: string;
}

export interface PhaseInfo {
  phase: string;
  korean: string;
  spanish: string;
}

export interface FortuneInfo {
  age: number;
  ganZhi: string;
  stemTenGod: string;
  branchTenGod: string;
  phase: string;
}

export interface MonthlyFortuneInfo {
  month: number;
  ganZhi: string;
  stemTenGod: string;
  phase: string;
}

export interface ReportSection {
  title: string;
  content: string;
}

export interface SajuReport {
  sections: ReportSection[];
  usage: {
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheCreationTokens: number;
  };
}

export interface ReportGeneratorOptions {
  apiKey?: string;
  model?: string;
  maxRetries?: number;
}
