// 共享 TypeScript 类型定义
// 在此处添加跨模块共享的类型

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}
