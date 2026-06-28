// generate-preview.js
// Usage: node generate-preview.js
// Reads celeb-data-with-birth.txt + rank-config.json → writes preview-celebs.html

const fs = require('fs');
const path = require('path');

const DATA_FILE  = path.join(__dirname, 'celeb-data-with-birth.txt');
const RANK_FILE  = path.join(__dirname, 'rank-config.json');
const OUT_FILE   = path.join(__dirname, 'preview-celebs.html');

// ── 카테고리 판별 ───────────────────────────────────────────────────────────
const SPORTS = new Set(['축구','농구','피겨','육상','골프','수영','야구','배구','권투','MMA','테니스','F1','쇼트트랙','e스포츠']);
const CHARS  = new Set(['뽀로로','카카오프렌즈','도라에몽','나루토','원피스','스폰지밥','짱구는못말려','포켓몬','산리오','디즈니']);
const ROYALS = new Set(['UAE 왕자','두바이 왕세자','두바이 통치자','카타르 국왕']);
const ICONS  = new Set(['독립운동가','충무공','행주대첩','예술가','예술가·과학자','율곡 선생','퇴계 선생',
                         '팝의 황제','로마 황제','프랑스 황제','마케도니아 왕','몽골 제국',
                         '다산 선생','와룡 선생','삼국지 군주','삼국지 장수','성녀','발명가','간호사']);

function getCategory(org) {
  if (org === '가수')                          return '가수';
  if (org === '배우' || org === '모델')        return '배우';
  if (org === '예능인' || org === '아나운서')  return '예능인';
  if (SPORTS.has(org))                         return '스포츠';
  if (org === '노벨상')                        return '노벨상';
  if (CHARS.has(org))                          return '캐릭터';
  if (org === '앗.....')                       return '......';
  if (ROYALS.has(org) || /^조선 제\d+대$/.test(org)) return '왕족';
  if (ICONS.has(org))                          return '위인';
  if (/대통령|총리|주석|여왕|통치자/.test(org) && !/창업자|CEO/.test(org)) return '정치인';
  return '기업인';
}

// ── 뱃지 스타일 ─────────────────────────────────────────────────────────────
const CAT_STYLE = {
  '가수':   { bg:'#fdf2f8', color:'#be185d', border:'#f472b6', emoji:'🎤' },
  '배우':   { bg:'#f0f9ff', color:'#0c4a6e', border:'#38bdf8', emoji:'🎬' },
  '예능인': { bg:'#ecfdf5', color:'#166534', border:'#4ade80', emoji:'😂' },
  '기업인': { bg:'#fef9c3', color:'#713f12', border:'#eab308', emoji:'🏢' },
  '스포츠': { bg:'#dbeafe', color:'#1e40af', border:'#3b82f6', emoji:'⚽' },
  '정치인': { bg:'#d1fae5', color:'#065f46', border:'#10b981', emoji:'🏛️' },
  '캐릭터': { bg:'#fce7f3', color:'#9d174d', border:'#ec4899', emoji:'🧸' },
  '왕족':   { bg:'#fef3c7', color:'#78350f', border:'#d97706', emoji:'👑' },
  '위인':   { bg:'#fff7ed', color:'#9a3412', border:'#f97316', emoji:'🌟' },
  '노벨상': { bg:'#ede9fe', color:'#5b21b6', border:'#8b5cf6', emoji:'🏆' },
  '......': { bg:'#fee2e2', color:'#991b1b', border:'#f87171', emoji:'⚠️' },
};

function badge(name, org, birth, commercial) {
  const cat = getCategory(org);
  const rank = getRank(name, cat);
  const s = CAT_STYLE[cat] || CAT_STYLE['기업인'];
  const birthStr = birth
    ? `<span style="color:#999;font-size:10px;margin-left:2px">${birth}</span>`
    : '';
  const commercialDot = commercial === 'ok'
    ? `<span title="수익 가능" style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#16a34a;margin-left:3px;vertical-align:middle"></span>`
    : '';
  return `<span class="person" data-cat="${cat}" data-rank="${rank}" data-commercial="${commercial}" style="background:${s.bg};color:${s.color};border:1px solid ${s.border};` +
    `padding:2px 6px;border-radius:4px;margin:1px;display:inline-block;font-weight:bold">` +
    `${s.emoji} ${name}(${org})${birthStr}${commercialDot}</span>`;
}

// ── 데이터 파싱 ─────────────────────────────────────────────────────────────
const lines = fs.readFileSync(DATA_FILE, 'utf-8').replace(/^﻿/, '').split('\n');
let totalPeople = 0;

// -b 행을 m/f 양쪽에 추가하기 위해 먼저 맵으로 수집
const rowMap = {};
const bEntries = []; // gender=b 임시 저장

for (const line of lines) {
  const pfxMatch = line.match(/^([가-힣]{2})-([mfb]):\s*(.+)/);
  if (!pfxMatch) continue;
  const ilju   = pfxMatch[1];
  const gender = pfxMatch[2];
  const rest   = pfxMatch[3];

  const people = [];
  const entryRe = /([^,:\[\]]+?)\s*\(([^)]+)\)(?:\[(\d{1,4}\.\d+\.\d+)\])?(\[ok\])?/g;
  let m;
  while ((m = entryRe.exec(rest)) !== null) {
    const name       = m[1].trim();
    const org        = m[2].trim();
    const birth      = m[3] || '';
    const commercial = m[4] === '[ok]' ? 'ok' : 'no';
    if (name) people.push({ name, org, birth, commercial });
  }
  if (people.length === 0) continue;

  if (gender === 'b') {
    bEntries.push({ ilju, people });
  } else {
    const key = `${ilju}-${gender}`;
    if (!rowMap[key]) rowMap[key] = { ilju, gender, people: [] };
    rowMap[key].people.push(...people);
  }
}

// -b 인물을 m/f 양쪽에 삽입
for (const { ilju, people } of bEntries) {
  for (const g of ['m', 'f']) {
    const key = `${ilju}-${g}`;
    if (!rowMap[key]) rowMap[key] = { ilju, gender: g, people: [] };
    rowMap[key].people.push(...people);
  }
}

const rows = Object.values(rowMap);
rows.forEach(r => totalPeople += r.people.length);

// ── 랭크 설정 ───────────────────────────────────────────────────────────────
const rankConfig = JSON.parse(fs.readFileSync(RANK_FILE, 'utf-8'));

const R0 = new Set(rankConfig.R0);
const R1 = new Set(rankConfig.R1);
const R2 = new Set(rankConfig.R2);
const R4 = new Set(rankConfig.R4);
const R5 = new Set(rankConfig.R5);

const CAT_RANK = {
  '왕족':'r1','위인':'r1','......':'r1',
  '노벨상':'r2',
  '가수':'r3','배우':'r3','예능인':'r3',
  '기업인':'r3','스포츠':'r3','정치인':'r3',
  '캐릭터':'r4',
};

function getRank(name, cat) {
  if (R0.has(name)) return 'r0';
  if (R1.has(name)) return 'r1';
  if (R2.has(name)) return 'r2';
  if (R4.has(name)) return 'r4';
  if (R5.has(name)) return 'r5';
  return CAT_RANK[cat] || 'r3';
}

// ── 카운트 집계 (생성 시점에 계산) ──────────────────────────────────────────
const rankCount  = { r0:0, r1:0, r2:0, r3:0, r4:0, r5:0 };
const catCount   = {};
let   okCount    = 0;
for (const row of rows) {
  for (const p of row.people) {
    const cat  = getCategory(p.org);
    const rank = getRank(p.name, cat);
    rankCount[rank] = (rankCount[rank] || 0) + 1;
    catCount[cat]   = (catCount[cat]   || 0) + 1;
    if (p.commercial === 'ok') okCount++;
  }
}

// ── HTML 생성 ───────────────────────────────────────────────────────────────
const now = new Date();
const dateStr = `${now.getFullYear()}. ${now.getMonth()+1}. ${now.getDate()}. `
  + (now.getHours() < 12 ? 'AM' : 'PM')
  + ` ${String(now.getHours()%12||12).padStart(1)}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

const catChips = Object.entries({
  '가수':'#fdf2f8','배우':'#f0f9ff','예능인':'#ecfdf5','기업인':'#fef9c3',
  '스포츠':'#dbeafe','정치인':'#d1fae5','캐릭터':'#fce7f3','왕족':'#fef3c7',
  '위인':'#fff7ed','노벨상':'#ede9fe'
}).map(([cat, bg]) => {
  const s = CAT_STYLE[cat];
  const cnt = catCount[cat] || 0;
  return `<span data-cat-chip="${cat}" style="background:${bg};color:${s.color};border:1px solid ${s.border};padding:3px 8px;border-radius:4px;font-size:12px;font-weight:bold;cursor:pointer;user-select:none">${s.emoji} ${cat} <span style="background:rgba(0,0,0,0.12);border-radius:9px;padding:1px 6px;font-size:11px;margin-left:2px">${cnt}</span></span>`;
}).join('');

const rankChipStyles = {
  r0: 'background:#2D2D2D;color:#fff;border:2px solid #2D2D2D',
  r1: 'background:#FEF3C7;color:#92400E;border:2px solid #F59E0B',
  r2: 'background:#EDE9FE;color:#4C1D95;border:2px solid #8B5CF6',
  r3: 'background:#F0F9FF;color:#0C4A6E;border:2px solid #38BDF8',
  r4: 'background:#F3F4F6;color:#374151;border:2px solid #9CA3AF',
  r5: 'background:#FEE2E2;color:#991B1B;border:2px solid #F87171',
};
const rankChips = ['r0','r1','r2','r3','r4','r5'].map(r => {
  const cnt = rankCount[r] || 0;
  return `<span data-rank-chip="${r}" style="${rankChipStyles[r]};padding:3px 10px;border-radius:4px;font-size:12px;font-weight:bold;cursor:pointer;user-select:none;transition:all .12s">${r.toUpperCase()} <span style="background:rgba(0,0,0,0.12);border-radius:9px;padding:1px 6px;font-size:11px">${cnt}</span></span>`;
}).join('');

// ── 분리 뷰 (m/f 각각) ──────────────────────────────────────────────────────
const tableRows = rows.map((row, i) => {
  const bg = i % 2 === 0 ? '#fff' : '#FDF6EE';
  const genderBadge = row.gender === 'f'
    ? `<span style="background:#fce7f3;color:#db2777;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold">여</span>`
    : `<span style="background:#dbeafe;color:#2563eb;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold">남</span>`;
  const badges = row.people.map(p => badge(p.name, p.org, p.birth, p.commercial)).join(' ');
  return `<tr data-gender="${row.gender}" data-ilju="${row.ilju}" style="border-bottom:1px solid #eee;background:${bg}">` +
    `<td style="padding:6px;font-family:monospace;color:#999">${i+1}</td>` +
    `<td style="padding:6px;font-family:monospace;font-weight:bold">${row.ilju}-${row.gender}</td>` +
    `<td style="padding:6px">${genderBadge}</td>` +
    `<td style="padding:6px;text-align:center;color:#15803d">${row.people.length}</td>` +
    `<td style="padding:6px">${badges}</td>` +
    `</tr>`;
}).join('');

// ── 합산 뷰 (일주별 m+f 병합) ────────────────────────────────────────────────
const mergeMap = {};
for (const row of rows) {
  if (!mergeMap[row.ilju]) mergeMap[row.ilju] = [];
  mergeMap[row.ilju].push(...row.people);
}
const mergedRows = Object.entries(mergeMap).map(([ilju, people], i) => {
  const bg = i % 2 === 0 ? '#fff' : '#FDF6EE';
  const both = `<span style="background:#f3f4f6;color:#374151;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold">남+여</span>`;
  const badges = people.map(p => badge(p.name, p.org, p.birth, p.commercial)).join(' ');
  return `<tr data-ilju="${ilju}" style="border-bottom:1px solid #eee;background:${bg}">` +
    `<td style="padding:6px;font-family:monospace;color:#999">${i+1}</td>` +
    `<td style="padding:6px;font-family:monospace;font-weight:bold">${ilju}</td>` +
    `<td style="padding:6px">${both}</td>` +
    `<td style="padding:6px;text-align:center;color:#15803d">${people.length}</td>` +
    `<td style="padding:6px">${badges}</td>` +
    `</tr>`;
}).join('');

// R0~R5 JS set literals
function setLiteral(names) {
  const chunks = [];
  for (let i = 0; i < names.length; i += 8) {
    chunks.push('  ' + names.slice(i, i+8).map(n => `'${n}'`).join(','));
  }
  return chunks.join(',\n');
}

const BG_CAT_JS = Object.entries(CAT_STYLE)
  .map(([cat, s]) => `'${s.bg}':'${cat}'`).join(',');

const html = `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><meta http-equiv="Cache-Control" content="no-cache"><title>일주별 유명인 매칭</title><style>body{font-family:-apple-system,sans-serif;background:#FDF6EE;padding:16px;margin:0}table{border-collapse:collapse;width:100%;font-size:13px}th{background:#2D2D2D;color:#fff;padding:8px;text-align:left;position:sticky;top:0}</style></head><body>
<h1 style="text-align:center;font-size:20px">일주별 유명인 매칭</h1>
<p style="text-align:center;color:#999;font-size:12px;margin-bottom:8px">${totalPeople}명 · ${dateStr} · <span style="color:#16a34a">●</span> 수익가능 ${okCount}명</p>
<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:8px">
  <span id="chip-ok"  style="background:#f0fdf4;color:#15803d;border:2px solid #86efac;padding:3px 12px;border-radius:4px;font-size:12px;font-weight:bold;cursor:pointer;user-select:none">💰 수익가능만 보기</span>
  <span id="chip-no"  style="background:#fef2f2;color:#991b1b;border:2px solid #fca5a5;padding:3px 12px;border-radius:4px;font-size:12px;font-weight:bold;cursor:pointer;user-select:none">🚫 수익불가만 보기</span>
  <span id="chip-merge" style="background:#f3f4f6;color:#374151;border:2px solid #9ca3af;padding:3px 12px;border-radius:4px;font-size:12px;font-weight:bold;cursor:pointer;user-select:none">⚧ 남+여 합산</span>
</div>
<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:8px">
  <input id="search-ilju" placeholder="일주 검색 (갑오, 경자…)" style="padding:3px 10px;border:2px solid #d1d5db;border-radius:4px;font-size:12px;outline:none;width:180px">
</div>
<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px">${catChips}</div>
<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:16px">${rankChips}</div>
<div style="overflow-x:auto"><table><thead><tr><th>#</th><th>일주</th><th>성별</th><th>수</th><th style="min-width:400px">유명인</th></tr></thead>
<tbody id="tbody-split">${tableRows}</tbody>
<tbody id="tbody-merged" style="display:none">${mergedRows}</tbody>
</table></div>

<script>
  const activeRanks = new Set();
  const activeCats  = new Set();
  let   commercialFilter = null;
  let   mergeMode  = false;
  let   iljuSearch = '';
  let   genderFilter = null;     // null=전체, 'm'=남자만, 'f'=여자만

  function activeTbody() {
    return document.getElementById(mergeMode ? 'tbody-merged' : 'tbody-split');
  }

  function applyFilter() {
    const split  = document.getElementById('tbody-split');
    const merged = document.getElementById('tbody-merged');
    split.style.display  = mergeMode ? 'none' : '';
    merged.style.display = mergeMode ? ''     : 'none';

    activeTbody().querySelectorAll('span.person').forEach(sp => {
      const rankOk = activeRanks.size === 0 || activeRanks.has(sp.dataset.rank);
      const catOk  = activeCats.size  === 0 || activeCats.has(sp.dataset.cat);
      const commOk = commercialFilter === null || sp.dataset.commercial === commercialFilter;
      sp.style.display = (rankOk && catOk && commOk) ? 'inline-block' : 'none';
    });

    activeTbody().querySelectorAll('tr').forEach(tr => {
      const iljuOk = !iljuSearch || (tr.dataset.ilju || '').includes(iljuSearch);
      if (!iljuOk) { tr.style.display = 'none'; return; }
      const visible = [...tr.querySelectorAll('span.person')].some(sp => sp.style.display !== 'none');
      tr.style.display = visible ? '' : 'none';
    });
  }

  // 합산 토글
  document.getElementById('chip-merge').addEventListener('click', function() {
    mergeMode = !mergeMode;
    this.style.background  = mergeMode ? '#374151' : '#f3f4f6';
    this.style.color       = mergeMode ? '#fff'    : '#374151';
    this.style.borderColor = mergeMode ? '#1f2937' : '#9ca3af';
    applyFilter();
  });

  // 일주 검색
  document.getElementById('search-ilju').addEventListener('input', function() {
    iljuSearch = this.value.trim();
    applyFilter();
  });

  // 수익 필터
  function setCommChip(activeId) {
    const okChip = document.getElementById('chip-ok');
    const noChip = document.getElementById('chip-no');
    okChip.style.background  = activeId === 'chip-ok' ? '#16a34a' : '#f0fdf4';
    okChip.style.color       = activeId === 'chip-ok' ? '#fff'    : '#15803d';
    okChip.style.borderColor = activeId === 'chip-ok' ? '#15803d' : '#86efac';
    noChip.style.background  = activeId === 'chip-no' ? '#dc2626' : '#fef2f2';
    noChip.style.color       = activeId === 'chip-no' ? '#fff'    : '#991b1b';
    noChip.style.borderColor = activeId === 'chip-no' ? '#b91c1c' : '#fca5a5';
  }
  document.getElementById('chip-ok').addEventListener('click', function() {
    if (commercialFilter === 'ok') { commercialFilter = null; setCommChip(null); }
    else                           { commercialFilter = 'ok'; setCommChip('chip-ok'); }
    applyFilter();
  });
  document.getElementById('chip-no').addEventListener('click', function() {
    if (commercialFilter === 'no') { commercialFilter = null; setCommChip(null); }
    else                           { commercialFilter = 'no'; setCommChip('chip-no'); }
    applyFilter();
  });

  document.querySelectorAll('[data-rank-chip]').forEach(chip => {
    chip.addEventListener('click', () => {
      const r = chip.dataset.rankChip;
      if (activeRanks.has(r)) { activeRanks.delete(r); chip.style.opacity='1'; chip.style.outline=''; }
      else                     { activeRanks.add(r);    chip.style.opacity='0.5'; chip.style.outline='3px solid #2D2D2D'; }
      applyFilter();
    });
  });

  document.querySelectorAll('[data-cat-chip]').forEach(chip => {
    chip.addEventListener('click', () => {
      const cat = chip.dataset.catChip;
      if (activeCats.has(cat)) { activeCats.delete(cat); chip.style.opacity='1'; chip.style.outline=''; }
      else                     { activeCats.add(cat);    chip.style.opacity='0.5'; chip.style.outline='3px solid #555'; }
      applyFilter();
    });
  });
</script>
</body></html>`;

fs.writeFileSync(OUT_FILE, html, 'utf-8');
console.log(`✓ ${OUT_FILE} 생성 완료 (${totalPeople}명, ${rows.length}행)`);
