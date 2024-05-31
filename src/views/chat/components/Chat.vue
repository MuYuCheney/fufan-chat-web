<script setup lang="ts">
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { ChatSquare } from "@element-plus/icons-vue"
import { ref } from "vue"

interface IHistoryItem {
  id: number
  name: string
}

const router = useRouter()
const userStore = useUserStore()
const historys = ref<IHistoryItem[]>([{ id: 1, name: "新对话" }])

function logout() {
  userStore.logout()
  router.push("/login")
}
</script>

<template>
  <div class="app-chat">
    <el-container class="layout-container">
      <el-aside width="268px" class="layout-aside">
        <div class="layout-aside-main">
          <el-button type="primary" plain :icon="ChatSquare" class="create-chat-btn">新建对话</el-button>
          <el-text class="history-label">历史记录</el-text>
          <ul class="history-list">
            <li v-for="item in historys" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
        <el-button @click="logout" class="logout-btn">退出登陆</el-button>
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main>
          <main class="main">chat</main>
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
}
.layout-container {
  height: 100%;
}
.layout-aside {
  padding: 20px 0 20px 20px;
  display: flex;
  flex-direction: column;

  .layout-aside-main {
    flex: 1;
    overflow: auto;
    .create-chat-btn {
      width: $btn-width-percent-100;
    }

    .history-label {
      margin: 16px 0 0;
      display: inline-block;
    }

    .history-list {
      padding-inline-start: 0;
      > li {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        background: var(--el-color-primary-light-9);
        margin: 8px;
        color: var(--el-color-primary);
      }
    }
  }
}
.main {
  background-color: #fff;
  height: 100%;
  border-radius: 8px;
  padding: 16px;
}
.logout-btn {
  width: $btn-width-percent-100;
}
</style>
