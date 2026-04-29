import app from './app'
import config from './config/config'
import { connectDB } from './config/database'

// 连接数据库
connectDB().then(() => {
  console.log('✅ Database connected successfully')

  // 启动服务器
  const PORT = config.port
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
    console.log(`📁 Environment: ${config.nodeEnv}`)
  })
}).catch((error) => {
  console.error('❌ Failed to connect to database:', error)
  process.exit(1)
})