const fs = require('fs');
const content = fs.readFileSync('C:/Users/20151.HANSAEM/projects/saju/packages/web-kr/celeb-data-with-birth.txt', 'utf-8');
const lines = content.split('\n');
const target = lines.find(l => l.includes('갑술-f'));
console.log('원본:', JSON.stringify(target));
console.log('');
const entryRe = /([^,:\[\]]+?)\s*\(([^)]+)\)(?:\[(\d{1,4}\.\d+\.\d+)\])?(\[ok\])?/g;
const rest = target.replace(/^[가-힣]{2}-[mfb]:\s*/, '');
let m;
while ((m = entryRe.exec(rest)) !== null) {
  console.log('name:', m[1].trim(), '| ok:', m[4]);
}
