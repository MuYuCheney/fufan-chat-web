import { request } from "@/utils/service"
import type * as Chat from "./types/chat"

/** 聊天对话接口 */
export function chatApi(data: Chat.ChatRequestData) {
  return request<Chat.ChatResponseData>({
    url: "http://localhost:6006/api/chat",
    method: "post",
    data
  })
}
