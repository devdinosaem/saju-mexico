const fs = require('fs');

// 1. kpop 결과 파싱
const kpopRaw = fs.readFileSync('kpop-clean.txt', 'utf-8');
const kpopEntries = [];
kpopRaw.trim().split('\n').forEach(line => {
  const parts = line.split(' | ');
  if (parts.length < 4) return;
  const gender = parts[0].trim() === '남' ? 'm' : 'f';
  const ilju = parts[1].trim();
  const name = parts[2].trim();
  const birth = parts[3].trim();
  const slot = ilju + '-' + gender;
  kpopEntries.push({ slot, name, birth });
});
console.log('K-pop 엔트리: ' + kpopEntries.length + '명');

// 2. celeb-data 로드
const celebData = fs.readFileSync('celeb-data.txt', 'utf-8');
const lines = celebData.trim().split('\n');
const parsed = {};
lines.forEach(line => {
  const ci = line.indexOf(':');
  parsed[line.substring(0, ci).trim()] = line.substring(ci + 1).trim();
});

// 3. 새 멤버 추가 (중복 방지)
let added = 0, skipped = 0;
kpopEntries.forEach(({ slot, name, birth }) => {
  const existing = parsed[slot] || '';
  // 이름에서 그룹명 제거해서 중복 체크
  const shortName = name.split(' ').pop();
  if (existing.includes(name) || existing.includes(shortName + '(가수)')) {
    skipped++;
    return;
  }
  const entry = name + '(가수)[' + birth + ']';
  parsed[slot] = existing ? existing + ', ' + entry : entry;
  added++;
});

console.log('추가: ' + added + '명, 스킵(중복): ' + skipped + '명');

// 4. 생년월일도 birth-map에 추가
const birthLines = kpopEntries.map(e => e.name + '|' + e.birth).join('\n');
fs.appendFileSync('birth-map-raw.txt', '\n' + birthLines);

// 5. 저장
const sorted = Object.keys(parsed).sort();
fs.writeFileSync('celeb-data.txt', sorted.map(s => s + ': ' + parsed[s]).join('\n'));

// 6. 총 인원
let total = 0;
sorted.forEach(s => {
  total += parsed[s].split(',').filter(c => c.trim().length > 0).length;
});
console.log('총 인원: ' + total + '명');
