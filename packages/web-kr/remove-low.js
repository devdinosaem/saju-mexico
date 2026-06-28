const fs = require('fs');
let data = fs.readFileSync('celeb-data.txt', 'utf-8');

const toRemove = [
  'AOA 윤아', '강승연', '구구단 강미나', '김동희', '나나', '나오미 캠벨',
  '나탈리아 다이어', '남규리', '노르마니', '다코타 존슨', '달샤벳 수빈',
  '딕시 디아멜리오', '러블리즈 이미주', '류혜영', '매디슨 비어', '모모랜드 다현',
  '문소리', '박규영', '박서함', '스테이씨 시은', '심혜진', '아만다 사이프레드',
  '안소희', '엄앵란', '이나가키 아이', '이미숙', '이상아', '이시원', '이일화',
  '전혜빈', '조윤희', '채영인', '카라 스테파니', '클로이 모레츠',
  '프로미스나인 이채영', '프로미스나인 장규리', '황신혜',
];

let removed = 0;
const lines = data.split('\n');
const newLines = lines.map(line => {
  const ci = line.indexOf(':');
  if (ci < 0) return line;
  const slot = line.substring(0, ci).trim();
  const celebs = line.substring(ci + 1).trim().split(',').map(c => c.trim());

  const filtered = celebs.filter(c => {
    const nameOnly = c.replace(/\([^)]+\)/g, '').replace(/\[[^\]]+\]/g, '').trim();
    if (toRemove.includes(nameOnly)) {
      removed++;
      return false;
    }
    return true;
  });

  return slot + ': ' + filtered.join(', ');
});

fs.writeFileSync('celeb-data.txt', newLines.join('\n'));
console.log('삭제: ' + removed + '명');

let total = 0;
newLines.forEach(line => {
  const ci = line.indexOf(':');
  if (ci < 0) return;
  const celebs = line.substring(ci + 1).trim();
  if (celebs.length > 0) total += celebs.split(',').filter(c => c.trim().length > 0).length;
});
console.log('남은 총: ' + total + '명');
