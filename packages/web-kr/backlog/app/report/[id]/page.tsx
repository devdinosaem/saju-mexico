"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import {
  DoodleStar, DoodleSparkle, DoodleHeart, DoodleMoon,
  DoodleCloud, DoodleSmiley, DoodleBow, DoodleCrystal,
  DoodleLeaf, DoodleFire, DoodleCat,
} from "@/components/doodles";
import { SajuTILogo } from "@/components/logo";
import { ILJU_TYPES } from "@/lib/ilju-types";

// ── 데모 리포트 섹션 (향후 API 생성 텍스트로 교체) ──
const DEMO_SECTIONS = [
  {
    title: "너의 본질",
    icon: "🪞",
    content: "사주 보니까 갑목(甲木) 일간이야. 큰 나무 같은 사람인 거지. 한번 뿌리를 내리면 어떤 폭풍에도 꺾이지 않는 강인함이 있어. 근데 동시에 하늘을 향해 끊임없이 뻗어나가려는 성장 본능도 있거든.\n\n주변 사람들이 너한테서 느끼는 첫인상은 '믿음직하다'는 거야. 실제로 책임감이 강하고 맡은 건 끝까지 해내는 타입이야. 근데 정작 본인은 내면에 숨겨진 불안과 완벽주의가 있어서, 겉으로 보이는 것만큼 편하지 않을 때가 있거든.\n\n강점은 확실해. 목표가 생기면 흔들리지 않고 직진하는 힘, 그리고 주변을 안심시키는 존재감. 약점이라면 가끔 너무 혼자 다 해결하려고 하는 거야. 가끔은 옆 사람한테 기대봐도 괜찮아.",
  },
  {
    title: "오행 분포",
    icon: "⚖️",
    content: "오행 분포를 보면 토(土)가 37.5%로 가장 많아. 안정감이 있고 사람들한테 신뢰를 주는 기반이 되는 거지. 목(木)이 25%로 그 다음인데, 성장 에너지가 충분히 있다는 뜻이야.\n\n근데 화(火)가 12.5%로 좀 부족한 편이거든. 화(火)는 열정이고 표현력이야. 가끔 '나 왜 이렇게 의욕이 없지?' 할 때가 있다면 이게 원인일 수 있어. 수(水)도 12.5%로 적은 편인데, 수(水)는 지혜와 유연함이라서 가끔 생각이 경직될 수 있어.\n\n실생활에서는 불 에너지를 보충해주면 좋아. 빨간색 소품을 쓰거나, 운동으로 열을 내거나, 사람들 앞에서 표현하는 연습을 하는 것도 방법이야.",
  },
  {
    title: "내면의 힘",
    icon: "💪",
    content: "신강(身強) 타입이야. 점수로 보면 +2 정도인데, 일간의 힘이 강한 편이라는 뜻이야. 쉽게 말하면 자기 주관이 뚜렷하고, 남의 의견에 쉽게 흔들리지 않는 타입이거든.\n\n이게 장점이 되면 리더십이 되고, 단점이 되면 고집이 돼. 회사에서나 인간관계에서 '이 사람은 밀어붙이는 힘이 있다'는 소리를 들을 거야. 근데 가끔 '왜 내 말을 안 듣지?'라고 느낀다면, 그게 신강의 이면이야.\n\n신강한 사람은 용신(用神)의 도움이 특히 중요해. 너의 용신은 수(水)인데, 유연함을 보충해주는 역할을 하거든.",
  },
  {
    title: "십신 분석",
    icon: "🎭",
    content: "십신(十神) 중에 편관(偏官)이 가장 강해. 편관이 강하다는 건 조직에서 인정받는 힘이 있다는 거야. 승진욕이 있고, 경쟁 상황에서 빛나는 타입이거든.\n\n정재(正財)도 적당히 있어서 안정적인 수입을 유지하는 능력이 있어. '한탕'보다는 꾸준히 쌓아가는 스타일이야. 식신(食神)이 좀 부족한데, 이건 창의적 표현이 약하다기보다 표현 방식이 내향적이라는 뜻에 가까워.\n\n전체적으로 보면 '실력으로 인정받는 타입'이야. 정치적으로 움직이기보다는 결과물로 말하는 스타일이거든.",
  },
  {
    title: "연애운과 인연",
    icon: "💕",
    content: "연애 스타일부터 말하면, 좋아하는 감정을 잘 안 드러내는 편이야. 속으로는 난리가 나는데 겉으로는 쿨한 척 하거든. 그래서 상대방이 '이 사람 나한테 관심 있는 건가?' 헷갈릴 수 있어.\n\n너한테 잘 맞는 사람은 감성적이면서도 본인 세계가 있는 타입이야. 너무 의존적인 사람보다는 각자의 영역이 있는 관계가 편할 거야.\n\n대운으로 보면 31~40세 사이에 정재(正財) 에너지가 들어오는데, 이 시기가 연애운이 가장 좋아. 안정적인 만남이 올 확률이 높거든. 지금 당장이 아니더라도 조급해하지 마. 때가 되면 자연스럽게 와.",
  },
  {
    title: "재물운",
    icon: "💰",
    content: "정재(正財)가 적당히 있어서 기본적으로 돈 관리는 잘하는 편이야. '아끼는 건 아닌데 쓸데없는 데는 안 쓰는' 타입이거든. 월급이든 사업이든 꾸준한 수입을 선호해.\n\n편재(偏財)는 약한 편이라 투기성 투자는 잘 안 맞아. 주식이나 코인보다는 적금, 부동산 같은 장기 투자가 너한테 맞는 스타일이야.\n\n가장 풍요로운 시기는 대운에서 정재가 들어오는 31~40세야. 이 시기에 재테크 기반을 잘 잡아두면 이후가 편해질 거야.",
  },
  {
    title: "직업운과 적성",
    icon: "💼",
    content: "편관(偏官)이 강해서 조직 안에서 올라가는 힘이 있어. 프리랜서보다는 구조가 있는 조직에서 더 빛나는 타입이야. 단, 자유도가 너무 없으면 답답해하거든. 조직 안에서 자율성이 보장되는 포지션이 이상적이야.\n\n적성으로 보면 관리직, 기획, 전략 쪽이 잘 맞아. 디테일보다 큰 그림을 보는 능력이 있거든. IT, 금융, 컨설팅 쪽도 괜찮아.\n\n직장 운이 좋아지는 시기는 편관 대운이 들어올 때인데, 지금이 딱 그 시기야. 이직이나 승진을 고민하고 있다면 지금 움직이는 게 좋아.",
  },
  {
    title: "건강운",
    icon: "🏥",
    content: "토(土)가 과한 편이라 소화기 쪽을 신경 쓰면 좋겠어. 위장, 비장 관련해서 스트레스 받으면 바로 반응이 올 수 있거든. '스트레스 받으면 밥이 안 넘어간다' 타입일 수 있어.\n\n화(火)가 부족하니까 심장, 혈액순환도 체크해봐. 겨울에 손발이 차갑다거나, 의욕이 떨어지는 시기가 있다면 화(火) 에너지 보충이 필요해.\n\n실용적으로는 따뜻한 음식 위주로 먹고, 유산소 운동을 꾸준히 하는 게 좋아. 사우나나 반신욕도 도움이 돼. 그리고 뭣보다 스트레스 관리가 건강의 핵심이야.",
  },
  {
    title: "대운 흐름",
    icon: "🌊",
    content: "대운(大運)은 10년 단위로 바뀌는 인생의 큰 계절이야.\n\n11~20세에는 식신(食神) 대운이었어. 감수성이 풍부하고 뭔가 배우는 데 몰두하던 시기였을 거야. 이때 경험한 것들이 지금의 기반이 된 거지.\n\n21~30세, 지금 너는 편관(偏官) 대운의 한가운데야. 도전과 시련이 많지만 그만큼 급성장하는 시기거든. 직장에서의 변동, 인간관계의 재편 — 다 이 대운의 영향이야. 힘들지만 이 시기를 잘 넘기면 진짜 단단해져.\n\n31~40세에 들어오는 대운은 정재(正財) 에너지야. 안정과 수확의 시기거든. 지금 열심히 하는 게 30대에 결실로 돌아올 거야. 40대 이후에는 또 다른 흐름이 오는데, 그때의 에너지도 너한테 나쁘지 않아.",
  },
  {
    title: "올해의 운세",
    icon: "📅",
    content: "2026년은 병오(丙午)년이야. 화(火) 에너지가 강한 해거든. 너한테는 부족한 화(火)를 보충해주는 해라서 전체적으로 나쁘지 않아.\n\n특히 3월, 9월이 좋은 달이야. 새로운 시작이나 중요한 결정을 하기에 적합한 시기거든. 반면 6월은 좀 조심해야 해. 충(沖)이 있어서 갈등이 생길 수 있어. 큰 싸움이나 계약은 피하는 게 좋아.\n\n올해 전체적인 조언을 하자면, 적극적으로 움직이되 6월만 좀 조심하면 돼. 화(火) 에너지를 활용해서 평소 못 했던 표현, 못 했던 도전을 해보는 것도 좋아.",
  },
  {
    title: "합충형파해",
    icon: "⚡",
    content: "사주 안에서 기둥끼리 부딪히거나 어울리는 관계가 있거든. 너의 경우 년주와 일주 사이에 충(沖)이 하나 있어. 이건 어릴 때 가정환경이 좀 흔들렸거나, 부모와의 관계에서 갈등이 있었을 수 있다는 뜻이야.\n\n근데 충(沖)이 꼭 나쁜 건 아니야. 변화의 에너지거든. 이 충 덕분에 안주하지 않고 계속 성장하는 힘이 있는 거야. 만약 충이 없었으면 오히려 변화 없이 편하게만 살았을 수도 있어.\n\n월주와 시주 사이에는 합(合)이 있어서 직장(월주)과 미래(시주)가 조화롭게 연결되는 구조야. 커리어에서의 성장이 노후까지 이어질 가능성이 높다는 좋은 신호야.",
  },
  {
    title: "용신 가이드",
    icon: "🎯",
    content: "너의 용신(用神)은 수(水)야. 용신은 '너를 살리는 오행'이라고 생각하면 돼. 사주에서 부족하거나 균형을 맞춰주는 에너지거든.\n\n실용적으로 활용하는 방법을 알려줄게.\n\n색상은 파란색, 검은색 계열이 좋아. 옷이나 소품에 활용해봐. 방위는 북쪽이 유리해. 집이나 사무실에서 북쪽을 활용하면 도움이 돼.\n\n음식은 해산물, 된장국, 미역국 같은 것들이 좋아. 짠맛 계열이 수(水) 에너지를 보충해줘. 운동은 수영이 제일 좋고, 명상이나 독서 같은 조용한 활동도 도움이 돼.\n\n반대로 피해야 할 건 토(土) 과잉이야. 과식이나 과도한 안정 추구는 오히려 역효과가 날 수 있거든.",
  },
  {
    title: "특수 신살 해석",
    icon: "✨",
    content: "너한테 천을귀인(天乙貴人)이 있어. 이건 위기 상황에서 도와주는 사람이 나타난다는 뜻이야. 실제로 힘든 순간에 예상치 못한 곳에서 도움이 왔던 경험이 있을 거야.\n\n역마살(驛馬殺)도 있거든. 이건 이동, 변화의 에너지야. 한곳에 오래 있으면 답답해지는 타입일 수 있어. 출장이 많은 직업이나, 해외와 관련된 일이 잘 맞을 수 있어.",
  },
  {
    title: "종합 메시지",
    icon: "💌",
    content: "여기까지 읽었으면 이제 너에 대해 꽤 알게 됐을 거야.\n\n너는 겉으로는 단단하고 믿음직하지만, 속으로는 끊임없이 성장하고 싶은 사람이야. 가끔 혼자 다 짊어지려고 하는 게 걱정이지만, 그게 또 너의 매력이기도 하거든.\n\n지금 너가 있는 자리가 맞아. 지금 하고 있는 것들이 30대에 결실로 돌아올 거야. 조급해하지 말고, 지금 이 시기를 잘 보내면 돼.\n\n사주는 정해진 운명이 아니야. 네가 어떤 에너지를 타고났는지 알려주는 지도 같은 거지. 지도를 보고 어디로 갈지는 네가 정하는 거야. 화이팅 🙌",
  },
];

const SECTION_DOODLES: Record<number, React.ReactNode> = {
  0: <><DoodleStar className="absolute top-4 right-6 animate-wiggle" /><DoodleSparkle className="absolute bottom-8 left-4 animate-float" /></>,
  1: <><DoodleLeaf className="absolute top-2 left-6 animate-float tilt-right" /><DoodleCrystal className="absolute bottom-4 right-4 animate-wiggle" /></>,
  2: <><DoodleFire className="absolute top-4 right-8 animate-float" /><DoodleSmiley className="absolute bottom-6 left-6 animate-wiggle" /></>,
  3: <><DoodleCat className="absolute top-4 left-6 animate-wiggle" /><DoodleSparkle className="absolute bottom-4 right-8 animate-float" /></>,
  4: <><DoodleHeart className="absolute top-2 left-10 animate-float" /><DoodleBow className="absolute bottom-4 right-6 animate-wiggle tilt-left" /></>,
  5: <><DoodleStar className="absolute top-4 right-6 animate-wiggle" style={{ animationDelay: "0.5s" }} /><DoodleSparkle className="absolute bottom-6 left-8 animate-float" /></>,
  6: <><DoodleMoon className="absolute top-4 right-4 animate-float" /><DoodleLeaf className="absolute bottom-4 left-6 animate-wiggle" /></>,
  7: <><DoodleSmiley className="absolute top-4 left-8 animate-wiggle" /><DoodleHeart className="absolute bottom-6 right-6 animate-float" /></>,
  8: <><DoodleCloud className="absolute top-2 left-4 animate-float" /><DoodleStar className="absolute bottom-4 right-8 animate-wiggle" style={{ animationDelay: "1s" }} /></>,
  9: <><DoodleFire className="absolute top-4 right-6 animate-float" /><DoodleSparkle className="absolute bottom-8 left-6 animate-wiggle" /></>,
  10: <><DoodleCrystal className="absolute top-4 left-6 animate-wiggle" /><DoodleMoon className="absolute bottom-4 right-4 animate-float" /></>,
  11: <><DoodleStar className="absolute top-2 right-8 animate-float" /><DoodleLeaf className="absolute bottom-6 left-8 animate-wiggle" /></>,
  12: <><DoodleSparkle className="absolute top-4 left-6 animate-float" /><DoodleBow className="absolute bottom-4 right-6 animate-wiggle" /></>,
  13: <><DoodleHeart className="absolute top-4 right-8 animate-float" /><DoodleSmiley className="absolute bottom-6 left-6 animate-wiggle" /><DoodleStar className="absolute top-12 left-4 animate-float" style={{ animationDelay: "0.5s" }} /></>,
};

export default function ReportPage() {
  const { id } = useParams();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const type = ILJU_TYPES.find(t => t.ilju === "경진" && t.gender === "male") || ILJU_TYPES[0];

  const scrollTo = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex flex-col items-center bg-cream min-h-screen">
      <div className="w-full max-w-[440px] mx-auto">

        {/* ═══ 헤더 ═══ */}
        <section className="px-6 pt-10 pb-4 text-center relative">
          <DoodleStar className="absolute top-6 left-4 animate-wiggle" />
          <DoodleSparkle className="absolute top-8 right-8 animate-float" />

          <SajuTILogo className="w-10 h-10 mx-auto mb-1" />
          <p className="text-pink text-xs tracking-[0.3em] mb-4">{"✦ SAJUPLAY 풀 리포트 ✦"}</p>

          {/* 미니 캐릭터 카드 */}
          <div className="bg-white rounded-2xl p-4 border-2 border-charcoal sticker-shadow inline-block mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{type.emoji}</span>
              <div className="text-left">
                <p className="font-display text-lg text-charcoal">{type.name}</p>
                <p className="text-xs text-text-muted">김민수 · 1995.03.15 · {type.hanja}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 목차 (가로 스크롤) ═══ */}
        <section className="px-6 pb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {DEMO_SECTIONS.map((sec, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="shrink-0 flex items-center gap-1 bg-white border-2 border-charcoal/20 rounded-full px-3 py-1.5 text-xs font-semibold text-charcoal hover:border-pink hover:text-pink transition-colors"
              >
                <span>{sec.icon}</span>
                <span>{sec.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ═══ 14개 섹션 ═══ */}
        {DEMO_SECTIONS.map((sec, i) => (
          <section
            key={i}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="px-6 py-6 relative"
          >
            {SECTION_DOODLES[i]}

            <div className="bg-white rounded-2xl p-5 border-2 border-charcoal sticker-shadow relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{sec.icon}</span>
                <h2 className="font-display text-lg text-charcoal">{sec.title}</h2>
                <span className="text-text-muted text-[10px] ml-auto font-mono">{String(i + 1).padStart(2, "0")}/14</span>
              </div>

              <div className="text-sm text-text-sub leading-relaxed whitespace-pre-line">
                {sec.content}
              </div>
            </div>
          </section>
        ))}

        {/* ═══ 하단 공유 ═══ */}
        <section className="px-6 py-10 relative">
          <DoodleHeart className="absolute top-4 right-10 animate-float" />
          <DoodleStar className="absolute bottom-8 left-6 animate-wiggle" />

          <div className="bg-white rounded-2xl p-6 border-2 border-charcoal sticker-shadow text-center">
            <p className="font-display text-lg text-charcoal mb-2">리포트가 도움이 됐다면</p>
            <p className="text-text-sub text-sm mb-5">친구한테도 알려줘 📲</p>

            <div className="flex justify-center gap-3">
              <button className="flex items-center gap-1.5 bg-[#FEE500] text-charcoal text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-charcoal sticker-shadow active:scale-95 transition-transform">
                📲 카카오톡
              </button>
              <button className="flex items-center gap-1.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-charcoal sticker-shadow active:scale-95 transition-transform">
                📷 인스타
              </button>
            </div>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </main>
  );
}
