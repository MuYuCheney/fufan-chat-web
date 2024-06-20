<script lang="ts" setup>
import { onMounted } from "vue"
onMounted(() => {
  console.log(11)
})
</script>

<template>
  <div class="my-element" />
</template>

<style lang="scss" scoped>
/* 定义@keyframes规则 */
@keyframes myAnimation {
  $regex: "%";
  @for $i from 0 through 143 {
    #{calc($i/143)*100}#{$regex} {
      background-image: url("/src/assets/img/chat-loading/" + $i + ".png");
    }
  }
}

/* 应用动画到目标元素 */
.my-element {
  width: 100px;
  height: 100px;
  background-size: cover;
  animation: myAnimation 6s infinite; /* 设置动画名称、时长和循环方式 */
}
</style>
