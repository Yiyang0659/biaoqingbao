import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          轻松制作<span className="text-primary-600">拟人化</span>表情包
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          上传照片，一键转换为动漫风格，添加文字，生成属于你的独特表情包
        </p>
        <Link to="/editor" className="btn-primary text-lg px-8 py-3">
          立即开始制作
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="text-xl font-semibold mb-2">上传照片</h3>
          <p className="text-gray-600">支持JPG、PNG格式，自动优化图片质量</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-2">动漫化处理</h3>
          <p className="text-gray-600">AI智能转换为动漫风格，保留人物特征</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">添加文字</h3>
          <p className="text-gray-600">自定义文字样式和位置，打造个性化表情包</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">热门模板</h2>
        <p className="text-gray-600 text-center mb-8">从热门模板开始，快速生成表情包</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-square bg-gray-200 rounded mb-3"></div>
              <p className="font-medium">模板 {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage