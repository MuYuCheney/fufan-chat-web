<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import ChatHistory from "./ChatHistory.vue"
import ChatRecords from "./ChatRecords.vue"

const router = useRouter()
const userStore = useUserStore()
const chatRecordsRef = ref(null)

// 退出登陆
function logout() {
  userStore.logout()
  router.push("/login")
}

// 选中历史对话聊天
function onSelectChatHistory(id: number) {
  chatRecordsRef.value && (chatRecordsRef.value as any).onChangeChat(id)
}
</script>

<template>
  <el-aside width="268px" class="layout-aside">
    <ChatHistory :onSelectChatHistory="onSelectChatHistory" />
    <el-button @click="logout" class="logout-btn">退出登陆</el-button>
  </el-aside>
  <el-container>
    <el-main class="layout-main">
      <ChatRecords ref="chatRecordsRef" />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;
.layout-aside {
  background-color: var(--el-bg-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  .logout-btn {
    width: $btn-width-percent-100;
  }
}

.layout-main {
  // background: linear-gradient(180deg, #f5f4f6, #e6ebf7);
  height: 100%;
  // border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
</style>
