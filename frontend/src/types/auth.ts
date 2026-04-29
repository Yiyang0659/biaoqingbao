// TypeScript 类型定义：用户认证相关
// 从 hooks/useAuth.ts 提取，集中管理

export interface User {
  id: string
  username: string
  email: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}
