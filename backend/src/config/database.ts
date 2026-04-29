// backend/src/config/database.ts
import { Sequelize } from 'sequelize'
import config from './config'

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  logging: config.nodeEnv === 'development' ? console.log : false,
  dialectOptions: {
    ssl: config.nodeEnv === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
})

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected successfully')

    // Sync models only when explicitly enabled
    const shouldSync = process.env.DB_SYNC === 'true'
    if (shouldSync && config.nodeEnv === 'development') {
      console.warn('⚠️  Database sync enabled with alter: true. This may modify schema.')
      await sequelize.sync({ alter: true })
      console.log('✅ Database synced')
    } else if (shouldSync && config.nodeEnv === 'production') {
      console.error('❌ DB_SYNC=true is not allowed in production. Use migrations instead.')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Database connection error:', error)
    process.exit(1)
  }
}

export default sequelize