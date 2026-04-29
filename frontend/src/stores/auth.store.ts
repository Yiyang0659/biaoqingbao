// 认证状态管理（Zustand store 占位）
// 待后续集成 auth.api.ts 实现真实状态管理

import { User } from '../types/auth'

export interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

// TODO: 使用 zustand 实现
// import { create } from 'zustand'
// export const useAuthStore = create<AuthStore>((set) => ({ ... }))
