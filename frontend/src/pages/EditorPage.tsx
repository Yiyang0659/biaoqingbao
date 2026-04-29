import { useState } from 'react'

const EditorPage = () => {
  const [image, setImage] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerateMeme = async () => {
    if (!image) {
      alert('请先上传图片')
      return
    }

    setIsProcessing(true)
    // 模拟处理过程
    setTimeout(() => {
      setIsProcessing(false)
      alert('表情包生成成功！')
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">表情包编辑器</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 左侧：上传和编辑区域 */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">上传图片</h2>
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {image ? (
                <div className="relative">
                  <img src={image} alt="Uploaded" className="max-h-64 mx-auto rounded" />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-4">📸</div>
                  <p className="text-gray-600 mb-4">拖拽图片到这里，或点击选择文件</p>
                  <label className="btn-primary cursor-pointer">
                    选择图片
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              添加文字
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input-field"
              placeholder="输入表情包文字..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文字样式
            </label>
            <div className="flex space-x-4">
              <button className="px-4 py-2 border rounded-lg">白色</button>
              <button className="px-4 py-2 border rounded-lg">黑色</button>
              <button className="px-4 py-2 border rounded-lg">大号</button>
              <button className="px-4 py-2 border rounded-lg">粗体</button>
            </div>
          </div>

          <button
            onClick={handleGenerateMeme}
            disabled={isProcessing || !image}
            className="w-full btn-primary py-3"
          >
            {isProcessing ? '生成中...' : '生成表情包'}
          </button>
        </div>

        {/* 右侧：预览区域 */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">预览</h2>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-6">
            {image ? (
              <div className="relative w-full h-full">
                <img src={image} alt="Preview" className="w-full h-full object-contain" />
                {text && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <div className="inline-block bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-xl font-bold">
                      {text}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-400">
                <div className="text-4xl mb-2">👀</div>
                <p>上传图片后预览将显示在这里</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="btn-secondary">保存到本地</button>
            <button className="btn-primary">分享到社交平台</button>
          </div>
        </div>
      </div>

      <div className="mt-8 card">
        <h2 className="text-xl font-semibold mb-4">使用提示</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>建议使用清晰的人像照片，效果更佳</li>
          <li>图片大小建议在5MB以内</li>
          <li>动漫化处理需要约10-30秒时间</li>
          <li>可以添加多行文字，使用回车键换行</li>
        </ul>
      </div>
    </div>
  )
}

export default EditorPage