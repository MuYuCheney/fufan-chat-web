<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { Expand, Fold, Coin } from "@element-plus/icons-vue"
import RightDrawer from "./components/RightDrawer/index.vue"
import ChatParams from "./components/RightDrawer/ChatParams.vue"

const activeIndex = ref<string>("")
const collapse = ref<boolean>(true)
const route = useRoute()

onMounted(() => {
  setActiveIndex()
})

watch(
  () => route.path,
  () => {
    setActiveIndex()
  }
)

function setActiveIndex() {
  activeIndex.value = route.path
}
</script>

<template>
  <el-container class="app-chat-container">
    <el-menu :collapse="collapse" :default-active="activeIndex" router class="menu">
      <el-menu-item index="/chat">
        <el-icon><ChatLineRound /></el-icon>
        <template #title>对话</template>
      </el-menu-item>
      <!-- <el-menu-item index="/chatparams">
        <el-icon><SetUp /></el-icon>
        <template #title>对话参数</template>
      </el-menu-item> -->
      <el-menu-item index="/knowledge">
        <el-icon><Coin /></el-icon>
        <template #title>知识库</template>
      </el-menu-item>
      <el-divider class="divider" />
      <el-button :icon="collapse ? Expand : Fold" @click="collapse = !collapse" class="expand-btn" plain />
    </el-menu>
    <!-- component slot -->
    <RightDrawer>
      <ChatParams />
    </RightDrawer>
    <router-view />
  </el-container>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;

.app-chat-container {
  width: 100%;
  height: 100vh;

  .menu {
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .divider {
    margin: auto auto 12px auto;
  }

  .expand-btn {
    font-size: 20px;
    // margin: auto auto 12px auto;
    margin-bottom: 12px;
    border: none;
  }
}
</style>
