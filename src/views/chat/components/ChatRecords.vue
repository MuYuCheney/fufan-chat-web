<script setup lang="ts">
import { ref, nextTick, defineExpose } from "vue" // onMounted, onBeforeUnmount
import QuillEditor from "@/components/RichTextEditor/index.vue"
// import {useChatStore} from "@/store/modules/chat"
// import {type ChatRequestData} from "@/api/chat/types/chat"
import ChatRecord from "./ChatRecord.vue"
import type { TChatRecordItem } from "./ChatRecord.vue"
import { EChatType } from "./Enum"
import { fetchEventSource } from "@microsoft/fetch-event-source"

interface IDefineExposeProps {
  onChangeChat(id: string): void
}

// const chatStore = useChatStore()
const chatRecordsMap: Map<string, TChatRecordItem[]> = new Map()

const chatRecords = ref<TChatRecordItem[]>([])
const chatRecordsRef = ref<HTMLDivElement | null>(null)
const inputValue = ref<string>("")
let chatHistoryId = ""

// 滚动到底部
function onScrollBottom() {
  nextTick(() => {
    if (!chatRecordsRef.value) {
      return
    }
    chatRecordsRef.value.scrollTop = chatRecordsRef.value.scrollHeight
  })
}

// 发送消息
async function onSend1(val: string) {
  if (!val.trim()) {
    return
  }
  // pasue = true
  chatRecords.value.push([
    {
      role: EChatType.USER,
      message_id: "",
      time: new Date().getTime().toString(),
      content: val
    },
    {
      role: EChatType.SYSTEM,
      message_id: "",
      time: new Date().getTime().toString(),
      content: ""
    }
  ])
  onScrollBottom()
  const bodyStr = JSON.stringify({
    query: val,
    conversation_id: "conv456",
    conversation_name: "学习对话",
    user_id: "admin",
    history_len: 3,
    stream: true,
    // model_name: "chatglm3-6b",
    model_name: "zhipu-api",
    temperature: 0.8,
    max_tokens: 1024,
    prompt_name: "llm_chat"
  })
  fetchEventSource("http://192.168.110.131:8000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: bodyStr,
    onmessage: async (data) => {
      console.log(data.data)
      const res = JSON.parse(data.data)
      chatRecords.value.map(async (item) => {
        if (res && (item[1].message_id === res?.message_id || item[1].message_id === "") && res.text) {
          item[1].content += res.text
          item[0].message_id = res.message_id
          item[1].message_id = res.message_id
        }
      })
      onScrollBottom()
    }
  })
}

// 切换聊天&缓存之前的聊天
function onChangeChat(id: string) {
  chatHistoryId && chatRecordsMap.set(chatHistoryId, chatRecords.value)
  chatHistoryId = id
  chatRecords.value = chatRecordsMap.get(id) || []
  inputValue.value = ""
  onScrollBottom()
}

// 将内部方法暴露给外部
defineExpose<IDefineExposeProps>({
  onChangeChat
})
</script>

<template>
  <div class="main-center">
    <div class="chat-records" ref="chatRecordsRef">
      <ChatRecord v-for="(record, index) in chatRecords" :key="index" :data="record" />
    </div>
    <QuillEditor class="quill-editor" :value="inputValue" :send="onSend1" />
  </div>
</template>

<style lang="scss" scoped>
.main-center {
  width: 998px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  .chat-records {
    flex: 1;
    /* padding: 8px; */
    overflow: auto;
    padding: 24px 0;
  }

  .quill-editor {
    margin-top: auto;
  }
}
</style>
