import User from '../models/User.model'
import { generateToken } from '../config/jwt'

// 接口定义
export interface RegisterData {
  email: string
  username: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user: {
    id: string
    email: string
    username: string
    avatar_url?: string
    created_at: Date
  }
  token: string
}

export interface UserResponse {
  id: string
  email: string
  username: string
  avatar_url?: string
  created_at: Date
}

// 自定义错误类
export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message)
    this.name = 'AuthError'
  }
}

export class AuthService {
  /**
   * 用户注册
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // 检查邮箱是否已存在
      const existingUserByEmail = await User.findOne({
        where: { email: data.email }
      })
      if (existingUserByEmail) {
        throw new AuthError('Email already exists', 409)
      }

      // 检查用户名是否已存在
      const existingUserByUsername = await User.findOne({
        where: { username: data.username }
      })
      if (existingUserByUsername) {
        throw new AuthError('Username already exists', 409)
      }

      // 创建用户
      const user = await User.create({
        email: data.email,
        username: data.username,
        password_hash: data.password // 钩子会自动哈希
      })

      // 生成JWT token
      const token = generateToken({
        userId: user.id,
        email: user.email
      })

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar_url: user.avatar_url,
          created_at: user.created_at
        },
        token
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }
      console.error('Registration error:', error)
      throw new AuthError('Registration failed', 500)
    }
  }

  /**
   * 用户登录
   */
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      // 查找用户
      const user = await User.findOne({
        where: { email: data.email }
      })

      if (!user) {
        throw new AuthError('Invalid email or password', 401)
      }

      // 验证密码
      const isValidPassword = await user.comparePassword(data.password)
      if (!isValidPassword) {
        throw new AuthError('Invalid email or password', 401)
      }

      // 生成JWT token
      const token = generateToken({
        userId: user.id,
        email: user.email
      })

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar_url: user.avatar_url,
          created_at: user.created_at
        },
        token
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }
      console.error('Login error:', error)
      throw new AuthError('Login failed', 500)
    }
  }

  /**
   * 获取当前用户信息
   */
  async getCurrentUser(userId: string): Promise<UserResponse> {
    try {
      const user = await User.findByPk(userId)

      if (!user) {
        throw new AuthError('User not found', 404)
      }

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url,
        created_at: user.created_at
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }
      console.error('Get current user error:', error)
      throw new AuthError('Failed to get user information', 500)
    }
  }
}

export default new AuthService()