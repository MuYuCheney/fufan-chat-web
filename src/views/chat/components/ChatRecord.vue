<script setup lang="ts">
import { useUserStore } from "@/store/modules/user"
import systemPhoto from "@/assets/layouts/icons8-chatgpt-96.png"
import { EChatType } from "./Enum"

export interface IChatRecord {
  type: EChatType
  id: number
  content: string
  time: string
}
interface Props {
  data: IChatRecord
}

const userStore = useUserStore()
const props = defineProps<Props>()
</script>

<template>
  <div :class="{ 'chat-record': true, 'chat-question': props.data.type === EChatType.USER }">
    <el-avatar :size="24" :src="props.data.type === 'USER' ? userStore.photo : systemPhoto"
      >{{ data.type === "USER" ? userStore.username?.[0] : EChatType.SYSTEM }}
    </el-avatar>
    <div class="chat-content">
      <el-text type="info" class="time">{{ props.data.time }}</el-text>
      {{ props.data.content }}
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
