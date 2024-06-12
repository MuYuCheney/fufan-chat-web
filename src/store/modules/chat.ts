import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
// import { useUserStore } from "./user"
import { chatApi } from "@/api/chat"
import { type ChatRequestData } from "@/api/chat/types/chat"

export const useChatStore = defineStore("chat", () => {
  const history_len = ref<number>(3)
  const model_name = ref<string>("chatglm3-6b") // zhipu-api | chatglm3-6b
  const temperature = ref<number>(0.8)
  const prompt_name = ref<string>("llm_chat")

  // const userStore = useUserStore()

  /** 对话 */
  const chat = async (params: ChatRequestData) => {
    const data = await chatApi({
      ...params,
      user_id: "id_muyu", // userStore.username,
      history_len: history_len.value,
      stream: false,
      model_name: model_name.value,
      temperature: temperature.value,
      max_tokens: 1024,
      prompt_name: prompt_name.value
    } as ChatRequestData)
    try {
      if (typeof data === "string") {
        const str = data.replace("data: ", "")
        return JSON.parse(str)
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }

  return { chat, history_len, model_name, temperature, prompt_name }
})

/** 在 setup 外使用 */
export function useChatStoreHook() {
  return useChatStore(store)
}
