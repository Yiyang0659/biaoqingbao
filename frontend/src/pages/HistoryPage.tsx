import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

interface MemeItem {
  id: string
  title: string
  createdAt: string
  imageUrl: string
  likes: number
}

const HistoryPage = () => {
  const { user } = useAuth()
  const [memes, setMemes] = useState<MemeItem[]>([
    {
      id: '1',
      title: '开心的我',
      createdAt: '2024-01-15',
      imageUrl: '',
      likes: 42
    },
    {
      id: '2',
      title: '周末表情包',
      createdAt: '2024-01-14',
      imageUrl: '',
      likes: 28
    },
    {
      id: '3',
      title: '工作日常',
      createdAt: '2024-01-13',
      imageUrl: '',
      likes: 56
    },
    {
      id: '4',
      title: '朋友聚会',
      createdAt: '2024-01-12',
      imageUrl: '',
      likes: 31
    }
  ])

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个表情包吗？')) {
      setMemes(memes.filter(meme => meme.id !== id))
    }
  }

  const handleDownload = (id: string) => {
    alert(`开始下载表情包 ${id}`)
  }

  const handleShare = (id: string) => {
    alert(`分享表情包 ${id}`)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="card max-w-md mx-auto">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">需要登录</h2>
          <p className="text-gray-600 mb-6">请登录后查看您的表情包历史记录</p>
          <a href="/auth" className="btn-primary">
            立即登录
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">我的作品</h1>
          <p className="text-gray-600">查看和管理您创建的所有表情包</p>
        </div>
        <div className="text-sm text-gray-500">
          共 {memes.length} 个表情包
        </div>
      </div>

      {memes.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">📭</div>
          <h2 className="text-2xl font-bold mb-2">还没有表情包</h2>
          <p className="text-gray-600 mb-6">开始制作您的第一个表情包吧！</p>
          <a href="/editor" className="btn-primary">
            开始制作
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <div key={meme.id} className="card hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                {meme.imageUrl ? (
                  <img src={meme.imageUrl} alt={meme.title} className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="text-gray-400">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p>表情包预览</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-1">{meme.title}</h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>创建于 {meme.createdAt}</span>
                  <span>❤️ {meme.likes} 喜欢</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(meme.id)}
                  className="flex-1 btn-secondary text-sm py-2"
                >
                  下载
                </button>
                <button
                  onClick={() => handleShare(meme.id)}
                  className="flex-1 btn-secondary text-sm py-2"
                >
                  分享
                </button>
                <button
                  onClick={() => handleDelete(meme.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 card">
        <h2 className="text-xl font-semibold mb-4">统计信息</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">{memes.length}</div>
            <div className="text-sm text-gray-600">总作品数</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {memes.reduce((sum, meme) => sum + meme.likes, 0)}
            </div>
            <div className="text-sm text-gray-600">总喜欢数</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...memes.map(m => m.likes), 0)}
            </div>
            <div className="text-sm text-gray-600">最高喜欢</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {memes.length > 0 ? memes[0].createdAt : '--'}
            </div>
            <div className="text-sm text-gray-600">最近作品</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage