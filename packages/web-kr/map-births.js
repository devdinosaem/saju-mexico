const fs = require('fs');

// 1. 생년월일 맵 로드
const birthRaw = fs.readFileSync('birth-map-raw.txt', 'utf-8');
const birthMap = {};
birthRaw.trim().split('\n').forEach(line => {
  const [name, birth] = line.split('|');
  if (name && birth) {
    birthMap[name.trim()] = birth.trim();
  }
});
console.log('생년월일 DB: ' + Object.keys(birthMap).length + '명');

// 2. celeb-data 로드
const celebData = fs.readFileSync('celeb-data.txt', 'utf-8');
const lines = celebData.trim().split('\n');

let matched = 0, unmatched = 0;
const unmatchedList = [];

const newLines = lines.map(line => {
  const ci = line.indexOf(':');
  const slot = line.substring(0, ci).trim();
  const celebs = line.substring(ci + 1).trim();

  const updatedCelebs = celebs.split(',').map(c => {
    const celeb = c.trim();
    // 이름 추출 (태그 제거)
    const nameOnly = celeb.replace(/\([^)]+\)$/, '').trim();

    // 생년월일 찾기 — 여러 변형 시도
    let birth = birthMap[nameOnly];

    // "블랙핑크 제니" → "제니(블핑)" 등 변환 시도
    if (!birth) {
      // 그룹명 제거해서 검색
      const parts = nameOnly.split(' ');
      if (parts.length >= 2) {
        const shortName = parts[parts.length - 1];
        // 그룹+이름 조합으로 검색
        for (const [key, val] of Object.entries(birthMap)) {
          if (key.includes(shortName) && key.includes(parts[0].substring(0, 2))) {
            birth = val;
            break;
          }
        }
        // 그래도 없으면 이름만으로
        if (!birth) {
          for (const [key, val] of Object.entries(birthMap)) {
            if (key.endsWith(shortName) || key === shortName) {
              birth = val;
              break;
            }
          }
        }
      }
    }

    if (birth) {
      matched++;
      // 기존 태그에 생년월일 추가: "이름(태그)" → "이름(태그)[1995.3.15]"
      return celeb + '[' + birth + ']';
    } else {
      unmatched++;
      unmatchedList.push(nameOnly);
      return celeb;
    }
  }).join(', ');

  return slot + ': ' + updatedCelebs;
});

fs.writeFileSync('celeb-data-with-birth.txt', newLines.join('\n'));

console.log('매칭: ' + matched + '명');
console.log('미매칭: ' + unmatched + '명');
if (unmatchedList.length > 0) {
  console.log('\n미매칭 목록:');
  [...new Set(unmatchedList)].sort().forEach(n => console.log('  ' + n));
}
