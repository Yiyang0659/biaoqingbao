// EditorPage 子组件：文字输入和样式控制
// 占位组件，待 EditorPage 拆分时使用

interface TextOverlayProps {
  value: string
  onChange: (text: string) => void
}

export const TextOverlay = ({ value, onChange }: TextOverlayProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">添加文字</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="在这里输入搞笑文字..."
        rows={3}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
    </div>
  )
}
