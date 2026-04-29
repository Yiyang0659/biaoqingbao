// EditorPage 子组件：表情包预览区域
// 占位组件，待 EditorPage 拆分时使用

interface MemePreviewProps {
  imageUrl: string | null
  caption?: string
  isProcessing?: boolean
}

export const MemePreview = ({ imageUrl, caption, isProcessing = false }: MemePreviewProps) => {
  if (isProcessing) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <span className="text-gray-500">AI 处理中...</span>
      </div>
    )
  }

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <span className="text-gray-400">预览区域</span>
      </div>
    )
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <img src={imageUrl} alt="meme preview" className="w-full" />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">
          {caption}
        </div>
      )}
    </div>
  )
}
