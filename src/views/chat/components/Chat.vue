<script setup lang="ts">
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { Plus } from "@element-plus/icons-vue"
import { ref, nextTick } from "vue"
import QuillEditor from "@/components/RichTextEditor/index.vue"
import ChatRecord from "./ChatRecord.vue"

interface IHistoryItem {
  id: number
  name: string
}

interface IChatRecord {
  type: "SYSTEM" | "USER"
  id: number
  content: string
}

const router = useRouter()
const userStore = useUserStore()
const historys = ref<IHistoryItem[]>([{ id: 1, name: "新对话" }])
const chatRecords = ref<IChatRecord[]>([])
const chatRecordsRef = ref(null)

const inputValue = ref("")
let chatId = 0

// 滚动到底部
function onScrollBottom() {
  nextTick(() => {
    chatRecordsRef.value.scrollTop = chatRecordsRef.value.scrollHeight
  })
}

// 发送消息
function onSend(val: string) {
  chatRecords.value.push({
    type: "USER",
    id: ++chatId,
    content: val
  })
  onScrollBottom()
  setTimeout(() => {
    chatRecords.value.push({
      type: "SYSTEM",
      id: ++chatId,
      content: `有什么可以帮你的吗 ${val} 访问密码不正确或为空，请前往登录页输入正确的访问密码，或者在设置页填入你自己的 OpenAI API Key。`
    })
    onScrollBottom()
  }, 100)
}

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
          <el-button type="primary" plain :icon="Plus" class="create-chat-btn">新建对话</el-button>
          <el-text class="history-label">历史记录</el-text>
          <ul class="history-list">
            <li v-for="item in historys" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>
        <el-button @click="logout" class="logout-btn">退出登陆</el-button>
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main class="main">
          <div class="main-center">
            <div class="chat-records" ref="chatRecordsRef">
              <ChatRecord v-for="record in chatRecords" :key="record.id" :data="record" />
            </div>
            <QuillEditor class="quill-editor" :value="inputValue" :send="onSend" />
          </div>
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
  background-color: var(--el-bg-color);
  padding: 20px;
  display: flex;
  flex-direction: column;

  .layout-aside-main {
    flex: 1;
    overflow: auto;
    .create-chat-btn {
      width: $btn-width-percent-100;
      justify-content: flex-start;
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
        padding: 0 16px;
        // justify-content: center;
        height: 36px;
        background: var(--el-color-info-light-9);
        margin: 0;
        // color: var(--el-color-info);
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
  .logout-btn {
    width: $btn-width-percent-100;
  }
}
.main {
  // background: linear-gradient(180deg, #f5f4f6, #e6ebf7);
  height: 100%;
  // border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  .main-center {
    width: 998px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;

    .chat-records {
      flex: 1;
      /* padding: 8px; */
      overflow: auto;
      padding: 24px 0;
    }
  }

  .quill-editor {
    margin-top: auto;
  }
}
</style>
