import { Request, Response, NextFunction } from 'express'
import { verifyToken, JwtPayload } from '../config/jwt'

// 扩展Express Request接口
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

/**
 * 认证中间件
 * 验证Bearer token并将用户信息附加到req.user
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 从Authorization头获取token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'No token provided or invalid token format'
      })
      return
    }

    const token = authHeader.substring(7) // 移除"Bearer "前缀

    // 验证token
    const decoded = verifyToken(token)

    // 将用户信息附加到请求对象
    req.user = decoded

    next()
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid token') {
        res.status(401).json({
          success: false,
          error: 'Invalid token'
        })
      } else if (error.message === 'Token expired') {
        res.status(401).json({
          success: false,
          error: 'Token expired'
        })
      } else {
        res.status(401).json({
          success: false,
          error: 'Authentication failed'
        })
      }
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      })
    }
  }
}

export default authenticate