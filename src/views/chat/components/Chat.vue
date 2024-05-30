<script setup lang="ts">
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"

const router = useRouter()
const userStore = useUserStore()

function logout() {
  userStore.logout()
  router.push("/login")
}
</script>

<template>
  <div class="app-chat">
    <el-container class="layout-container">
      <el-aside width="268px" class="layout-aside">
        <el-input placeholder="新建对话" />
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
.app-chat {
  width: 100%;
  height: 100%;
}
.layout-container {
  height: 100%;
}
.layout-aside {
  padding: 20px 0 20px 20px;
}
.main {
  background-color: #fff;
  height: 100%;
  border-radius: 8px;
  padding: 16px;
}
.logout-btn {
  width: 248px;
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
