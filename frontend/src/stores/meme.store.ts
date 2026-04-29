// 编辑器状态管理（Zustand store 占位）
// 待后续集成 image.api.ts 实现真实状态管理

import { MemeEditorState } from '../types/meme'

export type MemeStore = MemeEditorState & {
  setOriginalImage: (file: File | null) => void
  setProcessedUrl: (url: string | null) => void
  setCaption: (caption: string) => void
  setIsProcessing: (processing: boolean) => void
}

// TODO: 使用 zustand 实现
// import { create } from 'zustand'
// export const useMemeStore = create<MemeStore>((set) => ({ ... }))
