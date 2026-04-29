import dotenv from 'dotenv'

dotenv.config()

// 配置接口定义
export interface Config {
  port: number
  nodeEnv: string
  databaseUrl: string
  jwtSecret: string
  jwtExpiresIn: string
  cloudinaryUrl?: string
  replicateApiToken?: string
  openaiApiKey?: string
  corsOrigin: string
}

// 验证并获取环境变量
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key]

  if (value === undefined || value === '') {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Environment variable ${key} is required but not set`)
  }

  return value
}

// 构建配置对象
const config: Config = {
  port: parseInt(getEnv('PORT', '5000'), 10),
  nodeEnv: getEnv('NODE_ENV', 'development'),
  databaseUrl: getEnv('DATABASE_URL'),
  jwtSecret: getEnv('JWT_SECRET'),
  jwtExpiresIn: getEnv('JWT_EXPIRES_IN', '7d'),
  cloudinaryUrl: process.env.CLOUDINARY_URL,
  replicateApiToken: process.env.REPLICATE_API_TOKEN,
  openaiApiKey: process.env.OPENAI_API_KEY,
  corsOrigin: getEnv('CORS_ORIGIN', 'http://localhost:3000'),
}

// 验证配置
const validateConfig = (config: Config): void => {
  if (config.port < 1 || config.port > 65535) {
    throw new Error(`Invalid port number: ${config.port}`)
  }

  if (!['development', 'production', 'test'].includes(config.nodeEnv)) {
    throw new Error(`Invalid NODE_ENV: ${config.nodeEnv}. Must be one of: development, production, test`)
  }

  if (!config.databaseUrl.startsWith('postgresql://')) {
    throw new Error(`Invalid DATABASE_URL: must start with postgresql://`)
  }

  if (config.jwtSecret.length < 32 && config.nodeEnv === 'production') {
    console.warn('⚠️  Warning: JWT_SECRET is less than 32 characters. Consider using a longer secret in production.')
  }
}

// 执行验证
validateConfig(config)

export default config