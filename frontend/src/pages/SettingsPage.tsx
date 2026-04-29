import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const SettingsPage = () => {
  const { user, logout } = useAuth()
  const [settings, setSettings] = useState({
    username: user?.username || '',
    email: user?.email || '',
    notifications: true,
    autoSave: true,
    language: 'zh-CN',
    theme: 'light'
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSave = async () => {
    setIsSaving(true)
    // 模拟保存设置
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage('设置已保存')
      setTimeout(() => setSaveMessage(''), 3000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleExportData = () => {
    alert('开始导出数据...')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('确定要删除账户吗？此操作不可撤销，所有数据将被永久删除。')) {
      alert('账户删除请求已发送')
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="card max-w-md mx-auto">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">需要登录</h2>
          <p className="text-gray-600 mb-6">请登录后访问设置页面</p>
          <a href="/auth" className="btn-primary">
            立即登录
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">账户设置</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧：个人信息 */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">个人信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  用户名
                </label>
                <input
                  type="text"
                  name="username"
                  value={settings.username}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱地址
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-6">偏好设置</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">接收通知</label>
                  <p className="text-sm text-gray-500">接收新功能和活动通知</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">自动保存</label>
                  <p className="text-sm text-gray-500">编辑时自动保存进度</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="autoSave"
                    checked={settings.autoSave}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  语言
                </label>
                <select
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="en-US">English</option>
                  <option value="ja-JP">日本語</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  主题
                </label>
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="light">浅色</option>
                  <option value="dark">深色</option>
                  <option value="auto">跟随系统</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-6">数据管理</h2>
            <div className="space-y-4">
              <button
                onClick={handleExportData}
                className="w-full btn-secondary py-3"
              >
                导出我的数据
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                删除账户
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：操作区域 */}
        <div className="space-y-6">
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-600 font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{user.username}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full btn-primary py-3"
              >
                {isSaving ? '保存中...' : '保存设置'}
              </button>
              <button
                onClick={logout}
                className="w-full btn-secondary py-3"
              >
                退出登录
              </button>
            </div>

            {saveMessage && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm text-center">
                {saveMessage}
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">账户信息</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">注册时间</span>
                <span>2024-01-01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">会员状态</span>
                <span className="text-green-600">免费版</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">存储空间</span>
                <span>1.2GB / 5GB</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">帮助与支持</h3>
            <div className="space-y-2">
              <a href="#" className="block text-primary-600 hover:text-primary-700">
                使用教程
              </a>
              <a href="#" className="block text-primary-600 hover:text-primary-700">
                常见问题
              </a>
              <a href="#" className="block text-primary-600 hover:text-primary-700">
                联系客服
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage