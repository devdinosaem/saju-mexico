import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ── Supabase 스토어 ──

async function saveSupa(id: string, data: Record<string, unknown>) {
  const row = {
    id,
    name: data.name as string,
    gender: data.gender as string,
    birth_year: (data.birth as Record<string, number>).year,
    birth_month: (data.birth as Record<string, number>).month,
    birth_day: (data.birth as Record<string, number>).day,
    birth_hour: (data.birth as Record<string, number>).hour,
    birth_minute: (data.birth as Record<string, number>).minute,
    birth_city: (data.birth as Record<string, string>).city,
    unknown_time: data.unknownTime as boolean,
    pillars: data.pillars,
    five_elements: data.fiveElements,
    day_master: data.dayMaster,
    ten_gods: data.tenGods,
    twelve_phases: data.twelvePhases,
    strength: data.strength,
    yong_shin: data.yongShin,
    gi_shin: data.giShin,
    major_fortunes: data.majorFortunes,
    yearly_fortune: data.yearlyFortune,
    monthly_fortunes: data.monthlyFortunes,
    relations: data.relations,
    special_stars: data.specialStars,
    spirit_stars: data.spiritStars,
  };
  await getSupabaseAdmin()!.from("saju_results").insert(row);
}

async function getSupa(id: string): Promise<unknown | null> {
  const { data } = await getSupabaseAdmin()!
    .from("saju_results")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    gender: data.gender,
    birth: {
      year: data.birth_year,
      month: data.birth_month,
      day: data.birth_day,
      hour: data.birth_hour,
      minute: data.birth_minute,
      city: data.birth_city,
    },
    unknownTime: data.unknown_time,
    pillars: data.pillars,
    fiveElements: data.five_elements,
    dayMaster: { ...data.day_master, solLuna: data.day_master?.solLuna || data.day_master?.yinYang || "yang" },
    tenGods: data.ten_gods,
    twelvePhases: data.twelve_phases,
    strength: data.strength,
    yongShin: data.yong_shin,
    giShin: data.gi_shin,
    majorFortunes: data.major_fortunes,
    yearlyFortune: data.yearly_fortune,
    monthlyFortunes: data.monthly_fortunes,
    relations: data.relations,
    specialStars: data.special_stars,
    spiritStars: data.spirit_stars,
    paid: data.paid,
    report: data.report,
    createdAt: data.created_at,
  };
}

async function updateSupa(id: string, patch: Record<string, unknown>) {
  const updates: Record<string, unknown> = {};
  if (patch.report !== undefined) updates.report = patch.report;
  if (patch.paid !== undefined) updates.paid = patch.paid;
  if (patch.payment_id !== undefined) updates.payment_id = patch.payment_id;
  if (patch.payment_method !== undefined) updates.payment_method = patch.payment_method;
  if (patch.payment_amount !== undefined) updates.payment_amount = patch.payment_amount;
  if (patch.paid) updates.paid_at = new Date().toISOString();
  if (patch.report) updates.report_generated_at = new Date().toISOString();

  await getSupabaseAdmin()!.from("saju_results").update(updates).eq("id", id);
}

// ── 파일 스토어 (로컬 개발용 폴백) ──

const DATA_DIR = join(process.cwd(), ".data");
const SAJU_FILE = join(DATA_DIR, "saju-results.json");

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function readAll(): Record<string, unknown> {
  ensureDir();
  if (!existsSync(SAJU_FILE)) return {};
  try {
    return JSON.parse(readFileSync(SAJU_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, unknown>) {
  ensureDir();
  writeFileSync(SAJU_FILE, JSON.stringify(data), "utf-8");
}

function saveFile(id: string, data: unknown) {
  const all = readAll();
  all[id] = data;
  writeAll(all);
}

function getFile(id: string): unknown | null {
  return readAll()[id] ?? null;
}

function updateFile(id: string, patch: Record<string, unknown>) {
  const all = readAll();
  if (!all[id]) return null;
  all[id] = { ...(all[id] as Record<string, unknown>), ...patch };
  writeAll(all);
  return all[id];
}

// ── 통합 인터페이스 (Supabase 있으면 Supabase, 없으면 파일) ──

export async function saveSaju(id: string, data: unknown) {
  if (isSupabaseConfigured()) {
    await saveSupa(id, data as Record<string, unknown>);
  } else {
    saveFile(id, data);
  }
}

export async function getSaju(id: string): Promise<unknown | null> {
  if (isSupabaseConfigured()) {
    return getSupa(id);
  }
  return getFile(id);
}

export async function updateSaju(id: string, patch: Record<string, unknown>) {
  if (isSupabaseConfigured()) {
    await updateSupa(id, patch);
  } else {
    updateFile(id, patch);
  }
}
