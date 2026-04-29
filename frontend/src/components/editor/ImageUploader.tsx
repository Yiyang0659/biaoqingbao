// EditorPage 子组件：图片上传区域
// 占位组件，待 EditorPage 拆分时使用

interface ImageUploaderProps {
  onImageSelect: (file: File) => void
  isDisabled?: boolean
}

export const ImageUploader = ({ onImageSelect, isDisabled = false }: ImageUploaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onImageSelect(file)
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isDisabled}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer text-gray-500">
        点击或拖拽上传图片
      </label>
    </div>
  )
}
