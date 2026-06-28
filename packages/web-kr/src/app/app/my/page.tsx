import CharacterHero  from "../_components/my/CharacterHero"
import CollectionRow  from "../_components/my/CollectionRow"
import FriendBubbles  from "../_components/my/FriendBubbles"

export default function MyPage() {
  return (
    <div className="flex flex-col gap-4 py-3">
      {/* 캐릭터 히어로 + 말풍선 */}
      <CharacterHero />

      {/* 보관함 */}
      <CollectionRow />

      {/* 지인 */}
      <FriendBubbles />

      {/* 광고 배너 placeholder */}
      <div className="rounded-xl bg-charcoal/5 border border-charcoal/10 h-14 flex items-center justify-center">
        <span className="text-xs text-text-muted">광고</span>
      </div>
    </div>
  )
}
