import { type RouteRecordRaw } from "vue-router"

const Layouts = () => import("@/layouts/index.vue")

/**
 * chat业务路由
 * 页面必须设置 Name 属性
 */
export const chatRoutes: RouteRecordRaw[] = [
  // AI Chat
  {
    path: "/",
    component: Layouts,
    redirect: "/chat",
    children: [
      {
        path: "chat",
        component: () => import("@/views/chat/index.vue"),
        name: "Chat"
      }
    ]
  },
  {
    path: "/chatparams",
    component: Layouts,
    children: [
      {
        path: "chatparams",
        component: () => import("@/views/chat-params/index.vue"),
        name: "ChatParams"
      }
    ]
  }
]

export default chatRoutes
