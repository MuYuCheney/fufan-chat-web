<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"

const activeIndex = ref<string>("")
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
    <el-menu collapse :default-active="activeIndex" router>
      <el-menu-item index="/chat">
        <el-icon><ChatLineRound /></el-icon>
        <template #title>对话</template>
      </el-menu-item>
      <el-menu-item index="/chatparams">
        <el-icon><SetUp /></el-icon>
        <template #title>对话参数</template>
      </el-menu-item>
    </el-menu>
    <!-- component slot -->
    <router-view />
  </el-container>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;

.app-chat-container {
  width: 100%;
  height: 100vh;
}
</style>
