<script lang="ts" setup>
import { ref } from "vue"

const temperature = ref<number>(0.7)
const chatNum = ref<number>(3)
</script>

<template>
  <div class="chat-prams-container">
    <label>请选择对话模式</label>
    <el-select model-value="LLM">
      <el-option key="LLM" label="LLM对话" value="LLM" />
    </el-select>
    <label>请选择LLM模型</label>
    <el-select model-value="zhipu-api（Running）">
      <el-option key="zhipu-api（Running）" label="zhipu-api（Running）" value="zhipu-api（Running）" />
    </el-select>
    <label>请选择Prompt模版</label>
    <el-select model-value="default">
      <el-option key="default" label="default" value="default" />
    </el-select>
    <label>Temperature</label>
    <el-slider v-model="temperature" :min="0" :max="2.0" :step="0.1" :marks="{ 0: '0', 2.0: '2.0' }" />
    <label>历史对话轮数</label>
    <div>
      <el-input-number v-model="chatNum" :min="1" :max="10" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-prams-container {
  font-size: 14px;

  > label {
    display: inline-block;
    margin: 20px 0 8px;

    &::after {
      content: ":";
    }

    &:nth-of-type(1) {
      margin-top: 0;
    }
  }
}
</style>
