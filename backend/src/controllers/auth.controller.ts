import { Request, Response } from 'express'
import authService, { RegisterData, LoginData, AuthError } from '../services/auth.service'

/**
 * 用户注册控制器
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, password } = req.body

    // 验证请求数据
    if (!email || !username || !password) {
      res.status(400).json({
        success: false,
        error: 'Email, username and password are required'
      })
      return
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Invalid email format'
      })
      return
    }

    // 验证用户名长度
    if (username.length < 3 || username.length > 50) {
      res.status(400).json({
        success: false,
        error: 'Username must be between 3 and 50 characters'
      })
      return
    }

    // 验证密码长度
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters'
      })
      return
    }

    const registerData: RegisterData = { email, username, password }
    const result = await authService.register(registerData)

    res.status(201).json(result)
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message
      })
    } else {
      console.error('Register controller error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      })
    }
  }
}

/**
 * 用户登录控制器
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // 验证请求数据
    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: 'Email and password are required'
      })
      return
    }

    const loginData: LoginData = { email, password }
    const result = await authService.login(loginData)

    res.status(200).json(result)
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message
      })
    } else {
      console.error('Login controller error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      })
    }
  }
}

/**
 * 获取当前用户信息控制器
 */
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // 从认证中间件附加的用户信息中获取userId
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Not authenticated'
      })
      return
    }

    const user = await authService.getCurrentUser(req.user.userId)

    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message
      })
    } else {
      console.error('Get current user controller error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      })
    }
  }
}

export default {
  register,
  login,
  getCurrentUser
}