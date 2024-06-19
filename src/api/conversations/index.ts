import { request } from "@/utils/service"
import type * as Conversations from "./types/conversations"

/** 新建会话接口 */
export function conversationsApi(data: Conversations.ConversationsRequestData) {
  return request<string>({
    url: "/api/conversations",
    method: "post",
    data
  })
}

/** 获取指定会话的消息列表接口 */
export function conversationsConversationsIdMessagesApi(conversations_id: string) {
  return request<Conversations.ConversationsConversationsIdMessagesResponseData[]>({
    url: `/api/conversations/${conversations_id}/messages`,
    method: "get"
  })
}
