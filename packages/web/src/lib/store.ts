import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

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

export function saveSaju(id: string, data: unknown) {
  const all = readAll();
  all[id] = data;
  writeAll(all);
}

export function getSaju(id: string): unknown | null {
  const all = readAll();
  return all[id] ?? null;
}

export function updateSaju(id: string, patch: Record<string, unknown>) {
  const all = readAll();
  if (!all[id]) return null;
  all[id] = { ...(all[id] as Record<string, unknown>), ...patch };
  writeAll(all);
  return all[id];
}
