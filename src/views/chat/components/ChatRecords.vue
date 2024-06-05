<script setup lang="ts">
import { ref, nextTick } from "vue"
import QuillEditor from "@/components/RichTextEditor/index.vue"
import ChatRecord from "./ChatRecord.vue"
import type { TChatRecordItem } from "./ChatRecord.vue"
import { EChatType } from "./Enum"

const chatRecords = ref<TChatRecordItem[]>([])
const chatRecordsRef = ref<HTMLDivElement | null>(null)
const inputValue = ref<string>("")
let chatId: number = 0
let pasue: boolean = true
let answer: string = ""
let i = 0

// 滚动到底部
function onScrollBottom() {
  nextTick(() => {
    if (!chatRecordsRef.value) {
      return
    }
    chatRecordsRef.value.scrollTop = chatRecordsRef.value.scrollHeight
  })
}

// 模拟AI输出逐字返回
async function getContent(val: string, id: number): Promise<{ id: number; text: string } | undefined> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      pasue ? reject() : resolve({ id, text: val })
    }, 60)
  })
}

// 回答逐字渲染
async function onAnswer() {
  if (pasue) return
  const res = await getContent(answer[i], chatId)
  chatRecords.value.map(async (item) => {
    if (item[1].id === res?.id && res.text) {
      item[1].content += res.text
    }
  })
  onScrollBottom()
  if (!pasue && answer[i + 1]) {
    i += 1
    onAnswer()
  }
}

// 发送消息
function onSend(val: string) {
  if (!val.trim()) {
    return
  }
  pasue = true
  const id = ++chatId
  chatRecords.value.push([
    {
      type: EChatType.USER,
      id,
      time: new Date().getTime().toString(),
      content: val
    },
    {
      type: EChatType.SYSTEM,
      id,
      time: new Date().getTime().toString(),
      content: ""
    }
  ])
  onScrollBottom()
  i = 0
  answer = `有什么可以帮你的吗 ${val} 访问密码不正确或为空，请前往登录页输入正确的访问密码，或者在设置页填入你自己的 OpenAI API Key。`
  pasue = false
  onAnswer()
}
</script>

<template>
  <div class="main-center">
    <div class="chat-records" ref="chatRecordsRef">
      <ChatRecord v-for="(record, index) in chatRecords" :key="index" :data="record" />
    </div>
    <QuillEditor class="quill-editor" :value="inputValue" :send="onSend" />
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
