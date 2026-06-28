/**
 * 일주 120유형 → preview-ilju.html 자동 생성
 *
 * 실행: node --experimental-strip-types scripts/generate-preview.ts
 * (pnpm generate:preview 로 호출됨)
 *
 * ilju-types.ts 가 SSOT이므로, 이 파일을 수정하면
 * 빌드 시 자동으로 HTML이 재생성된다.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ILJU_TYPES } from "../src/lib/ilju-types.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../preview-ilju.html");

const now = new Date().toLocaleString("ko-KR");

function badge(text: string, bg: string, color: string) {
  return `<span style="background:${bg};color:${color};padding:1px 4px;border-radius:3px;font-size:10px;margin:1px">${esc(text)}</span>`;
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const rows = ILJU_TYPES.map((t, i) => {
  const bg = i % 2 === 0 ? "#fff" : "#FDF6EE";
  const genderBadge =
    t.gender === "male"
      ? badge("남", "#dbeafe", "#2563eb")
      : badge("여", "#fce7f3", "#be185d");
  const strengths = t.strengths.map(s => badge(s, "#dcfce7", "#15803d")).join("");
  const weaknesses = t.weaknesses.map(w => badge(w, "#fee2e2", "#dc2626")).join("");

  const td = (content: string, extra = "") =>
    `<td style="padding:6px${extra}">${content}</td>`;

  return [
    `<tr style="border-bottom:1px solid #eee;background:${bg}">`,
    td(`<span style="color:#999;font-family:monospace">${i + 1}</span>`),
    td(`<span style="font-family:monospace;font-weight:bold">${esc(t.id)}</span>`),
    td(`<span style="font-family:monospace">${esc(t.hanja)}</span>`),
    td(genderBadge),
    td(`<span style="font-size:18px">${t.emoji}</span>`),
    td(`<strong>${esc(t.name)}</strong>`),
    td(`<span style="color:#666">${esc(t.tagline)}</span>`),
    td(strengths),
    td(weaknesses),
    td(`<em style="color:#666">"${esc(t.quote)}"</em>`),
    td(`<span style="color:#999">${esc(t.catchpoint)}</span>`),
    `</tr>`,
  ].join("");
}).join("\n");

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache">
<title>일주 120유형</title>
<style>
body { font-family: -apple-system, sans-serif; background: #FDF6EE; padding: 16px; margin: 0 }
table { border-collapse: collapse; width: 100%; font-size: 12px }
th { background: #2D2D2D; color: #fff; padding: 8px; text-align: left; position: sticky; top: 0; z-index: 1 }
td { vertical-align: top }
</style>
</head>
<body>
<h1 style="text-align:center;font-size:20px">일주 120유형 검수</h1>
<p style="text-align:center;color:#999;font-size:13px">총 ${ILJU_TYPES.length}개 · ${now}</p>
<div style="overflow-x:auto">
<table>
<thead>
<tr>
<th>#</th><th>ID</th><th>한자</th><th>성별</th><th>이모지</th>
<th style="min-width:120px">이름</th>
<th style="min-width:180px">태그라인</th>
<th style="min-width:140px">강점</th>
<th style="min-width:100px">약점</th>
<th style="min-width:180px">대사</th>
<th style="min-width:250px">캐치포인트</th>
</tr>
</thead>
<tbody>
${rows}
</tbody>
</table>
</div>
</body>
</html>`;

writeFileSync(OUT, html, "utf-8");
console.log(`✓ preview-ilju.html 생성 완료 (${ILJU_TYPES.length}개) — ${now}`);
