// import { request } from "@/utils/service"
import { ElMessage } from "element-plus"
import type * as Chat from "./types/chat"
import { fetchEventSource } from "@microsoft/fetch-event-source"

/** 聊天对话接口 */
// export function chatApi(data: Chat.ChatRequestData) {
//   return request<Chat.ChatResponseData>({
//     url: "http://192.168.110.131:8000/api/chat",
//     method: "post",
//     data
//   })
// }

/** 聊天对话接口 */
export function chatApi(data: Chat.ChatRequestData, options?: Chat.ChatFetchEventOptions) {
  const ctrl = new AbortController()
  const bodyStr = JSON.stringify(data)
  // http://192.168.110.131:8000
  fetchEventSource("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: bodyStr,
    ...options,
    signal: ctrl.signal,
    onerror: async (err: any) => {
      options?.onerror?.(err)
      ElMessage.error("对话请求发生网络错误或涉及违规话题")
      ctrl.abort()
      throw err // 直接抛出错误，避免反复调用
    }
  })
}
