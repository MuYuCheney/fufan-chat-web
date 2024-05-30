<script lang="ts" setup>
// import { useUserStore } from "@/store/modules/user"
import Chat from "./components/Chat.vue"

// const userStore = useUserStore()
// const isAdmin = userStore.roles.includes("admin")
</script>

<template>
  <component :is="Chat" />
</template>
