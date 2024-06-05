<script setup lang="ts">
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import ChatHistory from "./ChatHistory.vue"
import ChatRecords from "./ChatRecords.vue"

const router = useRouter()
const userStore = useUserStore()

// 退出登陆
function logout() {
  userStore.logout()
  router.push("/login")
}
</script>

<template>
  <div class="app-chat">
    <el-container class="layout-container">
      <el-aside width="268px" class="layout-aside">
        <ChatHistory :onSelectChatHistory="(id) => console.log(id)" />
        <el-button @click="logout" class="logout-btn">退出登陆</el-button>
      </el-aside>
      <el-container>
        <el-main class="layout-main">
          <ChatRecords />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;

.app-chat {
  width: 100%;
  height: 100%;
  .layout-container {
    height: 100%;

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
  }
}
</style>
