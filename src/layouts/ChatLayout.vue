<script setup lang="ts"></script>

<template>
  <el-container class="app-chat-container">
    <el-menu collapse default-active="1">
      <el-menu-item index="1">
        <el-icon><ChatLineRound /></el-icon>
        <template #chat>对话</template>
      </el-menu-item>
      <el-menu-item index="2" disabled>
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
