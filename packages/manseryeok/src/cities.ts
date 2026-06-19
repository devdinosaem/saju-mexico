/**
 * 도시 데이터베이스 — 지역시(Local Solar Time) 보정용
 *
 * 보정 공식:
 *   기준 자오선 = UTC오프셋 × 15°
 *   보정값(분) = (도시경도 - 기준자오선) × 4
 *   지역시 = 표준시 + 보정값
 *
 * 예: 서울 (127°E, UTC+9)
 *   기준 = 9 × 15 = 135°E
 *   보정 = (127 - 135) × 4 = -32분
 *   17:00 KST → 16:28 지역시
 */

export interface CityData {
  name: string;
  nameLocal?: string;
  country: string;
  lat: number;
  lng: number;
  utcOffset: number; // 표준시 기준 (DST 미적용)
}

/**
 * 지역시 보정값 계산 (분 단위)
 */
export function getSolarTimeCorrection(lng: number, utcOffset: number): number {
  const referenceMeridian = utcOffset * 15;
  return (lng - referenceMeridian) * 4;
}

/**
 * 시간을 지역시로 보정
 * @returns [보정된 시, 보정된 분, 날짜 변경 (-1, 0, +1)]
 */
export function applyLocalSolarTime(
  hour: number,
  minute: number,
  lng: number,
  utcOffset: number,
): { hour: number; minute: number; dayShift: number } {
  const correction = getSolarTimeCorrection(lng, utcOffset);
  let totalMinutes = hour * 60 + minute + Math.round(correction);

  let dayShift = 0;
  if (totalMinutes < 0) {
    totalMinutes += 1440;
    dayShift = -1;
  } else if (totalMinutes >= 1440) {
    totalMinutes -= 1440;
    dayShift = 1;
  }

  return {
    hour: Math.floor(totalMinutes / 60),
    minute: totalMinutes % 60,
    dayShift,
  };
}

/**
 * 도시 이름으로 검색
 * 스페인어/영어/한국어/현지어 모두 지원, 부분 일치, 악센트 무시
 */
export function findCity(query: string): CityData | undefined {
  const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const q = normalize(query);

  // 별칭 매핑 (스페인어/약칭/현지 표기)
  const aliases: Record<string, string> = {
    'mexico': 'Ciudad de México', 'cdmx': 'Ciudad de México',
    'ciudad de mexico': 'Ciudad de México', 'df': 'Ciudad de México',
    'seul': 'Seoul', '서울': 'Seoul', 'corea': 'Seoul',
    'nueva york': 'New York', 'londres': 'London',
    'pekin': 'Beijing', 'tokio': 'Tokyo',
    'pekín': 'Beijing', 'berlín': 'Berlin',
    'paris': 'Paris', 'sao paulo': 'São Paulo',
    'singapur': 'Singapore', 'dubái': 'Dubai', 'dubai': 'Dubai',
    'bombay': 'Mumbai', 'nueva delhi': 'Delhi',
    'guadalajara': 'Guadalajara', 'monterrey': 'Monterrey',
    'cancun': 'Cancún', 'merida': 'Mérida',
    'queretaro': 'Querétaro', 'leon': 'León',
    'san luis potosi': 'San Luis Potosí',
    'tuxtla gutierrez': 'Tuxtla Gutiérrez',
    'ciudad juarez': 'Ciudad Juárez',
    'bogota': 'Bogotá', 'sídney': 'Sydney',
    'bangkoc': 'Bangkok', 'moscú': 'Moscow',
    '부산': 'Busan', '인천': 'Incheon', '대구': 'Daegu',
    '대전': 'Daejeon', '광주': 'Gwangju', '울산': 'Ulsan',
    '수원': 'Suwon', '세종': 'Sejong', '제주': 'Jeju',
    '춘천': 'Chuncheon', '청주': 'Cheongju', '전주': 'Jeonju',
    '창원': 'Changwon', '포항': 'Pohang', '용인': 'Yongin',
    '고양': 'Goyang', '성남': 'Seongnam',
  };

  const aliasMatch = aliases[q] || aliases[normalize(query)];
  if (aliasMatch) {
    return CITIES.find(c => c.name === aliasMatch);
  }

  return CITIES.find(c => {
    const name = normalize(c.name);
    const local = normalize(c.nameLocal || '');
    return name.includes(q) || local.includes(q) || q.includes(name);
  });
}

/**
 * 국가별 도시 목록
 */
export function getCitiesByCountry(country: string): CityData[] {
  return CITIES.filter(c => c.country === country);
}

// ──────────────────────────────────────
// 도시 데이터
// ──────────────────────────────────────

export const CITIES: CityData[] = [
  // ── 멕시코 (Mexico) ──
  // Central Time (UTC-6)
  { name: 'Ciudad de México', nameLocal: 'CDMX', country: 'MX', lat: 19.43, lng: -99.13, utcOffset: -6 },
  { name: 'Guadalajara', country: 'MX', lat: 20.67, lng: -103.35, utcOffset: -6 },
  { name: 'Monterrey', country: 'MX', lat: 25.67, lng: -100.31, utcOffset: -6 },
  { name: 'Puebla', country: 'MX', lat: 19.04, lng: -98.21, utcOffset: -6 },
  { name: 'León', country: 'MX', lat: 21.12, lng: -101.68, utcOffset: -6 },
  { name: 'Querétaro', country: 'MX', lat: 20.59, lng: -100.39, utcOffset: -6 },
  { name: 'San Luis Potosí', country: 'MX', lat: 22.15, lng: -100.98, utcOffset: -6 },
  { name: 'Aguascalientes', country: 'MX', lat: 21.88, lng: -102.29, utcOffset: -6 },
  { name: 'Toluca', country: 'MX', lat: 19.29, lng: -99.66, utcOffset: -6 },
  { name: 'Morelia', country: 'MX', lat: 19.70, lng: -101.19, utcOffset: -6 },
  { name: 'Mérida', country: 'MX', lat: 20.97, lng: -89.62, utcOffset: -6 },
  { name: 'Villahermosa', country: 'MX', lat: 17.99, lng: -92.93, utcOffset: -6 },
  { name: 'Tuxtla Gutiérrez', country: 'MX', lat: 16.75, lng: -93.12, utcOffset: -6 },
  { name: 'Oaxaca', country: 'MX', lat: 17.07, lng: -96.72, utcOffset: -6 },
  { name: 'Veracruz', country: 'MX', lat: 19.18, lng: -96.14, utcOffset: -6 },
  { name: 'Acapulco', country: 'MX', lat: 16.86, lng: -99.88, utcOffset: -6 },
  { name: 'Tampico', country: 'MX', lat: 22.23, lng: -97.86, utcOffset: -6 },
  { name: 'Saltillo', country: 'MX', lat: 25.42, lng: -100.99, utcOffset: -6 },
  { name: 'Cuernavaca', country: 'MX', lat: 18.92, lng: -99.23, utcOffset: -6 },
  { name: 'Pachuca', country: 'MX', lat: 20.12, lng: -98.73, utcOffset: -6 },
  { name: 'Celaya', country: 'MX', lat: 20.52, lng: -100.82, utcOffset: -6 },
  { name: 'Irapuato', country: 'MX', lat: 20.68, lng: -101.35, utcOffset: -6 },
  { name: 'Chihuahua', country: 'MX', lat: 28.63, lng: -106.09, utcOffset: -6 },
  { name: 'Ciudad Juárez', country: 'MX', lat: 31.69, lng: -106.42, utcOffset: -6 },
  { name: 'Durango', country: 'MX', lat: 24.02, lng: -104.67, utcOffset: -6 },
  { name: 'Zacatecas', country: 'MX', lat: 22.77, lng: -102.58, utcOffset: -6 },
  { name: 'Colima', country: 'MX', lat: 19.24, lng: -103.73, utcOffset: -6 },
  { name: 'Campeche', country: 'MX', lat: 19.84, lng: -90.53, utcOffset: -6 },
  { name: 'Tlaxcala', country: 'MX', lat: 19.32, lng: -98.24, utcOffset: -6 },
  // Pacific Time (UTC-7)
  { name: 'Hermosillo', country: 'MX', lat: 29.07, lng: -110.97, utcOffset: -7 },
  { name: 'Culiacán', country: 'MX', lat: 24.81, lng: -107.39, utcOffset: -7 },
  { name: 'Mazatlán', country: 'MX', lat: 23.22, lng: -106.42, utcOffset: -7 },
  { name: 'Los Mochis', country: 'MX', lat: 25.79, lng: -108.99, utcOffset: -7 },
  { name: 'Tepic', country: 'MX', lat: 21.51, lng: -104.89, utcOffset: -7 },
  { name: 'La Paz', nameLocal: 'La Paz BCS', country: 'MX', lat: 24.14, lng: -110.31, utcOffset: -7 },
  { name: 'Los Cabos', country: 'MX', lat: 22.89, lng: -109.92, utcOffset: -7 },
  // Northwest (UTC-8)
  { name: 'Tijuana', country: 'MX', lat: 32.51, lng: -117.02, utcOffset: -8 },
  { name: 'Mexicali', country: 'MX', lat: 32.62, lng: -115.45, utcOffset: -8 },
  { name: 'Ensenada', country: 'MX', lat: 31.87, lng: -116.60, utcOffset: -8 },
  // Southeast (UTC-5)
  { name: 'Cancún', country: 'MX', lat: 21.16, lng: -86.85, utcOffset: -5 },
  { name: 'Playa del Carmen', country: 'MX', lat: 20.63, lng: -87.08, utcOffset: -5 },
  { name: 'Chetumal', country: 'MX', lat: 18.50, lng: -88.30, utcOffset: -5 },
  { name: 'Tulum', country: 'MX', lat: 20.21, lng: -87.46, utcOffset: -5 },

  // ── 한국 (Korea) ── UTC+9
  { name: 'Seoul', nameLocal: '서울특별시', country: 'KR', lat: 37.57, lng: 126.98, utcOffset: 9 },
  { name: 'Busan', nameLocal: '부산광역시', country: 'KR', lat: 35.18, lng: 129.08, utcOffset: 9 },
  { name: 'Incheon', nameLocal: '인천광역시', country: 'KR', lat: 37.46, lng: 126.71, utcOffset: 9 },
  { name: 'Daegu', nameLocal: '대구광역시', country: 'KR', lat: 35.87, lng: 128.60, utcOffset: 9 },
  { name: 'Daejeon', nameLocal: '대전광역시', country: 'KR', lat: 36.35, lng: 127.38, utcOffset: 9 },
  { name: 'Gwangju', nameLocal: '광주광역시', country: 'KR', lat: 35.16, lng: 126.85, utcOffset: 9 },
  { name: 'Ulsan', nameLocal: '울산광역시', country: 'KR', lat: 35.54, lng: 129.31, utcOffset: 9 },
  { name: 'Suwon', nameLocal: '수원시', country: 'KR', lat: 37.26, lng: 127.03, utcOffset: 9 },
  { name: 'Sejong', nameLocal: '세종특별자치시', country: 'KR', lat: 36.48, lng: 127.00, utcOffset: 9 },
  { name: 'Jeju', nameLocal: '제주특별자치도', country: 'KR', lat: 33.50, lng: 126.53, utcOffset: 9 },
  { name: 'Chuncheon', nameLocal: '춘천시', country: 'KR', lat: 37.87, lng: 127.73, utcOffset: 9 },
  { name: 'Cheongju', nameLocal: '청주시', country: 'KR', lat: 36.64, lng: 127.49, utcOffset: 9 },
  { name: 'Jeonju', nameLocal: '전주시', country: 'KR', lat: 35.82, lng: 127.15, utcOffset: 9 },
  { name: 'Changwon', nameLocal: '창원시', country: 'KR', lat: 35.23, lng: 128.68, utcOffset: 9 },
  { name: 'Pohang', nameLocal: '포항시', country: 'KR', lat: 36.02, lng: 129.37, utcOffset: 9 },
  { name: 'Yongin', nameLocal: '용인시', country: 'KR', lat: 37.24, lng: 127.18, utcOffset: 9 },
  { name: 'Goyang', nameLocal: '고양시', country: 'KR', lat: 37.66, lng: 126.83, utcOffset: 9 },
  { name: 'Seongnam', nameLocal: '성남시', country: 'KR', lat: 37.44, lng: 127.14, utcOffset: 9 },

  // ── 주요 국제 도시 ──
  { name: 'New York', country: 'US', lat: 40.71, lng: -74.01, utcOffset: -5 },
  { name: 'Los Angeles', country: 'US', lat: 34.05, lng: -118.24, utcOffset: -8 },
  { name: 'Chicago', country: 'US', lat: 41.88, lng: -87.63, utcOffset: -6 },
  { name: 'Houston', country: 'US', lat: 29.76, lng: -95.37, utcOffset: -6 },
  { name: 'Tokyo', nameLocal: '東京', country: 'JP', lat: 35.68, lng: 139.69, utcOffset: 9 },
  { name: 'Beijing', nameLocal: '北京', country: 'CN', lat: 39.90, lng: 116.40, utcOffset: 8 },
  { name: 'Shanghai', nameLocal: '上海', country: 'CN', lat: 31.23, lng: 121.47, utcOffset: 8 },
  { name: 'London', country: 'GB', lat: 51.51, lng: -0.13, utcOffset: 0 },
  { name: 'Paris', country: 'FR', lat: 48.86, lng: 2.35, utcOffset: 1 },
  { name: 'Berlin', country: 'DE', lat: 52.52, lng: 13.40, utcOffset: 1 },
  { name: 'Madrid', country: 'ES', lat: 40.42, lng: -3.70, utcOffset: 1 },
  { name: 'São Paulo', country: 'BR', lat: -23.55, lng: -46.63, utcOffset: -3 },
  { name: 'Buenos Aires', country: 'AR', lat: -34.60, lng: -58.38, utcOffset: -3 },
  { name: 'Bogotá', country: 'CO', lat: 4.71, lng: -74.07, utcOffset: -5 },
  { name: 'Lima', country: 'PE', lat: -12.05, lng: -77.04, utcOffset: -5 },
  { name: 'Santiago', country: 'CL', lat: -33.45, lng: -70.67, utcOffset: -4 },
  { name: 'Sydney', country: 'AU', lat: -33.87, lng: 151.21, utcOffset: 10 },
  { name: 'Bangkok', country: 'TH', lat: 13.76, lng: 100.50, utcOffset: 7 },
  { name: 'Singapore', country: 'SG', lat: 1.35, lng: 103.82, utcOffset: 8 },
  { name: 'Dubai', country: 'AE', lat: 25.20, lng: 55.27, utcOffset: 4 },
  { name: 'Mumbai', country: 'IN', lat: 19.08, lng: 72.88, utcOffset: 5.5 },
  { name: 'Delhi', country: 'IN', lat: 28.61, lng: 77.21, utcOffset: 5.5 },
];
