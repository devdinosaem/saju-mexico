import { NextRequest, NextResponse } from "next/server";
import citiesData from "@/lib/world-cities.json";

// [name, country, lat, lng, timezone]
type CityRow = [string, string, number, number, string];
const cities = citiesData as CityRow[];

// 멕시코 도시 미리 필터링 (포커스 시 기본 표시용)
const mexicanCities = cities
  .filter((r) => r[1] === "MX")
  .map((r) => ({ name: r[0], country: r[1], lat: r[2], lng: r[3], tz: r[4] }));

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  // 빈 쿼리: 멕시코 주요 도시 반환
  if (!q || q.length < 1) {
    return NextResponse.json(mexicanCities.slice(0, 30));
  }

  // 1글자: 멕시코 도시만 검색
  if (q.length === 1) {
    const nq = normalize(q);
    const results = mexicanCities.filter((c) => normalize(c.name).startsWith(nq)).slice(0, 20);
    return NextResponse.json(results);
  }

  // 2글자+: 전세계 검색 (멕시코 우선)
  const nq = normalize(q);
  const mxResults: typeof mexicanCities = [];
  const otherResults: typeof mexicanCities = [];

  for (const row of cities) {
    if (mxResults.length + otherResults.length >= 20) break;
    if (normalize(row[0]).includes(nq)) {
      const city = { name: row[0], country: row[1], lat: row[2], lng: row[3], tz: row[4] };
      if (row[1] === "MX") mxResults.push(city);
      else otherResults.push(city);
    }
  }

  return NextResponse.json([...mxResults, ...otherResults].slice(0, 20));
}
