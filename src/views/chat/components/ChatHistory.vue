<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue"
import { Plus, Edit, Delete } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
// import { useUserStore } from "@/store/modules/user"
// import { EChatType } from "./Enum"

interface IHistoryItem {
  id: number
  name: string
}

interface Props {
  onSelectChatHistory?(id: number): void
}

// const userStore = useUserStore()
const props = defineProps<Props>()
const historyListUlRef = ref<HTMLDivElement | null>(null)
const historys = ref<IHistoryItem[]>([{ id: 1, name: "新对话" }])
const hoverId = ref<number>()
const selectId = ref<number>()
const editChatInfo = reactive<IHistoryItem>({
  id: 0,
  name: ""
})
const dialogVisible = ref<boolean>(false)

// 点击聊天历史
function onClickChatHistory(id: number) {
  if (id === selectId.value) return
  selectId.value = id
  props.onSelectChatHistory?.(id)
}

// 滚动到顶部
function onScrollTop() {
  nextTick(() => {
    if (!historyListUlRef.value) {
      return
    }
    historyListUlRef.value.scrollTop = 0
  })
}

// 新建对话
function onCreateNewChat() {
  const newChatId = new Date().getTime() + historys.value.length + 1
  historys.value.unshift({
    id: newChatId,
    name: "新对话"
  })
  onClickChatHistory(newChatId)
  onScrollTop()
}

// 删除历史对话
function onDeleteChatHistory(id: number) {
  historys.value = historys.value.filter((item) => item.id !== id)
  ElMessage({
    type: "success",
    message: "删除成功"
  })
  // 若当前选中被删除则默认选中第一项并回到顶部
  if (id === selectId.value && historys.value.length) {
    onClickChatHistory(historys.value[0].id)
    onScrollTop()
  }
}

// 删除确认
function onConfirmDeleteChatHistroy(id: number) {
  if (historys.value.length === 1) {
    ElMessage({
      type: "warning",
      message: "最后一条记录不可被删除"
    })
    return
  }
  ElMessageBox.confirm("删除后不可恢复，确认删除该对话吗？", "确认删除", { type: "warning" }).then(() => {
    onDeleteChatHistory(id)
  })
}

// 打开编辑弹框
function onOpenEditChatTitleDialog(chatInfo: IHistoryItem) {
  editChatInfo.id = chatInfo.id
  editChatInfo.name = chatInfo.name
  dialogVisible.value = true
}

// 关闭编辑弹框
function onCloseEditChatTitleDialog() {
  editChatInfo.id = 0
  editChatInfo.name = ""
  dialogVisible.value = false
}

// 修改聊天标题
function onSaveChatTitle() {
  historys.value.map((item) => {
    if (item.id === editChatInfo.id) {
      item.name = editChatInfo.name
    }
  })
  ElMessage({
    type: "success",
    message: "修改成功"
  })
  onCloseEditChatTitleDialog()
}

// 挂载后做选中操作
onMounted(() => {
  historys.value[0] && onClickChatHistory(historys.value[0].id)
})
</script>

<template>
  <div class="layout-aside-main">
    <el-button :icon="Plus" class="create-chat-btn" @click="onCreateNewChat">新建对话</el-button>
    <el-text class="history-label">历史记录</el-text>
    <ul class="history-list" ref="historyListUlRef">
      <li
        v-for="item in historys"
        :key="item.id"
        @mouseenter="hoverId = item.id"
        @mouseleave="hoverId = undefined"
        @click="() => onClickChatHistory(item.id)"
        :class="{ active: selectId === item.id }"
      >
        <span class="chat-title">{{ item.name }}</span>
        <span class="operate" v-show="hoverId === item.id" @click="(e) => e.stopPropagation()">
          <el-button type="primary" link :icon="Edit" @click="() => onOpenEditChatTitleDialog(item)" />
          <el-button
            type="primary"
            link
            :icon="Delete"
            class="delete-btn"
            :auto-insert-space="false"
            @click="() => onConfirmDeleteChatHistroy(item.id)"
          />
        </span>
      </li>
    </ul>
    <el-dialog v-model="dialogVisible" title="编辑" width="30%" :before-close="onCloseEditChatTitleDialog">
      <el-input v-model="editChatInfo.name" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCloseEditChatTitleDialog">取消</el-button>
          <el-button type="primary" @click="onSaveChatTitle">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
$btn-width-percent-100: 100%;

.layout-aside-main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .create-chat-btn {
    width: $btn-width-percent-100;
    justify-content: flex-start;
  }

  .history-label {
    margin: 16px 0 0;
    display: inline-block;
    width: 100%;
  }

  .history-list {
    padding-inline-start: 0;
    flex: 1;
    overflow: auto;
    > li {
      display: flex;
      align-items: center;
      padding: 0 16px;
      /* justify-content: center; */
      height: 36px;
      background-color: var(--el-fill-color-lighter);
      margin: 8px 0 0;
      /* color: var(--el-color-info); */
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: var(--el-color-primary-light-8);
      }

      &:nth-of-type(1) {
        margin-top: 0;
      }

      .chat-title {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .operate {
        margin-left: auto;

        .delete-btn {
          margin-left: 4px;
          vertical-align: -0.18em;
          color: var(--el-color-danger);
        }
      }
    }

    .active {
      background-color: var(--el-color-primary-light-8);
    }
  }
}
</style>
