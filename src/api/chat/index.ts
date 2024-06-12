import { request } from "@/utils/service"
import type * as Chat from "./types/chat"

/** 聊天对话接口 */
export function chatApi(data: Chat.ChatRequestData) {
  return request<Chat.ChatResponseData>({
    url: "http://192.168.110.131:8000/api/chat",
    method: "post",
    data
  })
}
