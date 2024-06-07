import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useUserStore } from "./user"
import { chatApi } from "@/api/chat"
import { type ChatRequestData } from "@/api/chat/types/chat"

export const useChatStore = defineStore("chat", () => {
  const history_len = ref<number>(5)
  const temperature = ref<number>(0.8)
  const prompt_name = ref<string>("default")

  const userStore = useUserStore()

  /** 对话 */
  const chat = async (params: ChatRequestData) => {
    const { data } = await chatApi({
      ...params,
      user_id: userStore.username,
      history_len: history_len.value,
      stream: false,
      model_name: "chatglm3-6b",
      temperature: temperature.value,
      max_tokens: 1024,
      prompt_name: prompt_name.value
    } as ChatRequestData)
    return data
  }

  return { chat, history_len, temperature, prompt_name }
})

/** 在 setup 外使用 */
export function useChatStoreHook() {
  return useChatStore(store)
}
