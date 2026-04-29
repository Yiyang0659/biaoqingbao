// TypeScript 类型定义：表情包相关

export interface Meme {
  id: string
  userId: string
  originalUrl: string
  processedUrl: string
  caption?: string
  createdAt: string
}

export interface MemeEditorState {
  originalImage: File | null
  processedUrl: string | null
  caption: string
  isProcessing: boolean
}
