/**
 * 오행 레이더(오각형) 차트 — 5행 분포를 면적으로 시각화.
 * 각 값은 최댓값 기준으로 정규화해 형태가 잘 드러나게 한다.
 */
import { ELEMENTS, ELEMENT_COLORS, ELEMENT_LABEL, type ElementScores } from "@/lib/room-element"

export default function ElementRadar({
  percent,
  size = 200,
}: {
  percent: ElementScores
  size?: number
}) {
  const cx = size / 2
  const cy = size / 2
  const R = size * 0.34
  const max = Math.max(...ELEMENTS.map(e => percent[e]), 1)

  const pt = (i: number, r: number): [number, number] => {
    const ang = ((-90 + i * 72) * Math.PI) / 180
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
  }
  const toPath = (pts: [number, number][]) =>
    pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z"

  const rings = [0.33, 0.66, 1]
  const dataPts = ELEMENTS.map((e, i) => pt(i, R * (percent[e] / max)))

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 그리드 오각형 */}
      {rings.map((f, ri) => (
        <path
          key={ri}
          d={toPath(ELEMENTS.map((_, i) => pt(i, R * f)))}
          fill="none"
          stroke="#E0D4C0"
          strokeWidth={1}
        />
      ))}
      {/* 축선 */}
      {ELEMENTS.map((_, i) => {
        const [x, y] = pt(i, R)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E0D4C0" strokeWidth={1} />
      })}

      {/* 데이터 면 */}
      <path d={toPath(dataPts)} fill="#F8B73E33" stroke="#E89A2C" strokeWidth={1.5} strokeLinejoin="round" />

      {/* 꼭짓점 도트 + 라벨 */}
      {ELEMENTS.map((e, i) => {
        const [dx, dy] = dataPts[i]
        const [lx, ly] = pt(i, R + 16)
        return (
          <g key={e}>
            <circle cx={dx} cy={dy} r={3} fill={ELEMENT_COLORS[e]} stroke="white" strokeWidth={1} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fontWeight={700}
              fill="#5C4A3A"
            >
              {ELEMENT_LABEL[e]} {percent[e]}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}
