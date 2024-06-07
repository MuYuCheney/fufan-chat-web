import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useUserStore } from "./user"
import { chatApi } from "@/api/chat"
import { type ChatRequestData } from "@/api/chat/types/chat"

export const useChatStore = defineStore("chat", () => {
  const message_id = ref<string>("")

  const userStore = useUserStore()

  /** 对话 */
  const chat = async (params: ChatRequestData) => {
    const { data } = await chatApi({
      ...params,
      user_id: userStore.username,
      history_len: 5,
      history: [{ role: "user", content: "你好" }],
      stream: false,
      model_name: "chatglm3-6b",
      temperature: 0.8,
      max_tokens: 1024,
      prompt_name: "default"
    } as ChatRequestData)
    message_id.value = data.message_id
    return data
  }

  return { chat }
})

/** 在 setup 外使用 */
export function useChatStoreHook() {
  return useChatStore(store)
}
