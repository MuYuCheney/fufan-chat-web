import { computed } from "vue"
import { useSettingsStore } from "@/store/modules/settings"
import { LayoutModeEnum } from "@/constants/app-key"

const settingsStore = useSettingsStore()
// 设置聊天layout
const isChat = computed(() => settingsStore.layoutMode === LayoutModeEnum.Chat)
const isLeft = computed(() => settingsStore.layoutMode === LayoutModeEnum.Left)
const isTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.Top)
const isLeftTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.LeftTop)

const setLayoutMode = (mode: LayoutModeEnum) => {
  settingsStore.layoutMode = mode
}

export function useLayoutMode() {
  return { isChat, isLeft, isTop, isLeftTop, setLayoutMode }
}
