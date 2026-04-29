import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              🎭 MemeMaker
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                首页
              </Link>
              <Link to="/editor" className="text-gray-700 hover:text-primary-600 transition-colors">
                制作表情包
              </Link>
              <Link to="/history" className="text-gray-700 hover:text-primary-600 transition-colors">
                我的作品
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700">{user.username}</span>
                </div>
                <Link to="/settings" className="btn-secondary text-sm">
                  设置
                </Link>
                <button onClick={logout} className="btn-primary text-sm">
                  退出
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="btn-secondary text-sm">
                  登录
                </Link>
                <Link to="/auth?tab=register" className="btn-primary text-sm">
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header