import User from './User.model'
import Meme from './Meme.model'
import ApiLog from './ApiLog.model'

// 注意：关联关系已在各自的模型文件中定义
// User.hasMany(Meme, { foreignKey: 'user_id', as: 'memes' })
// Meme.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
// User.hasMany(ApiLog, { foreignKey: 'user_id', as: 'api_logs' })
// ApiLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

export { User, Meme, ApiLog }