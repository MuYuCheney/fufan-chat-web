export interface ConversationsRequestData {
  user_id: string // 用户ID
  name: string // 会话名称
  chat_type: string // 会话类型
}

export interface ConversationsResponseData {
  id: string
}

export interface ConversationsConversationsIdMessagesResponseData {
  id: string // 消息ID
  conversation_id: string // 会话ID
  chat_type: string // 会话类型
  query: string // 用户输入
  response: string // AI回答
  meta_data?: object
  feedback_souce?: number
  feedback_reason?: string
  create_time: string
}
