// import { request } from "@/utils/service"
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
  const bodyStr = JSON.stringify(data)
  // http://192.168.110.131:8000
  fetchEventSource("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: bodyStr,
    ...options
  })
}
