import { request } from "@/utils/service"
import type * as Users from "./types/users"

/** 获取指定用户的会话列表接口 */
export function usersUserIdConversations(user_id: string) {
  return request<Users.UsersUserIdConversationsResponseData[]>({
    url: `/api/users/${user_id}/conversations`,
    method: "get"
  })
}
