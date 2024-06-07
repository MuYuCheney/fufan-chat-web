<script setup lang="ts">
import { useUserStore } from "@/store/modules/user"
import systemPhoto from "@/assets/layouts/icons8-chatgpt-96.png"
import { EChatType } from "./Enum"

export interface IChatRecord {
  role: EChatType
  id: number
  content: string
  time: string
}

export type TChatRecordItem = [IChatRecord, IChatRecord]

interface Props {
  data: TChatRecordItem
}

const userStore = useUserStore()
const props = defineProps<Props>()
</script>

<template>
  <div :class="{ 'chat-record': true, 'chat-question': props.data[0].role === EChatType.USER }">
    <el-avatar :size="24" :src="props.data[0].role === EChatType.USER ? userStore.photo : systemPhoto"
      >{{ data[0].role === EChatType.USER ? userStore.username?.[0] : EChatType.SYSTEM }}
    </el-avatar>
    <div class="chat-content">
      <el-text type="info" class="time">{{ props.data[0].time }}</el-text>
      {{ props.data[0].content }}
    </div>
  </div>
  <div :class="{ 'chat-record': true, 'chat-question': props.data[1].role === EChatType.USER }">
    <el-avatar :size="24" :src="props.data[1].role === EChatType.USER ? userStore.photo : systemPhoto"
      >{{ data[1].role === EChatType.USER ? userStore.username?.[0] : EChatType.SYSTEM }}
    </el-avatar>
    <div class="chat-content">
      <el-text type="info" class="time">{{ props.data[1].time }}</el-text>
      {{ props.data[1].content }}
    </div>
  </div>
</template>

<style scoped>
.chat-record {
  display: flex;
  gap: 8px;
  margin-top: 24px;

  .chat-content {
    background-color: var(--el-bg-color);
    border-radius: 4px;
    padding: 12px 16px;
    position: relative;
    width: fit-content;
    max-width: 70%;
    word-break: break-all;
    font-size: 14px;

    .time {
      white-space: nowrap;
      position: absolute;
      top: -16px;
      left: 0;
      font-size: 12px;
      display: none;
    }

    &:hover .time {
      display: block;
    }
  }
}
.chat-question {
  flex-direction: row-reverse;
  .chat-content {
    .time {
      right: 0;
      left: auto;
    }
  }
}
</style>
