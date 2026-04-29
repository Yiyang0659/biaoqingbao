// backend/src/config/jwt.ts
import jwt from 'jsonwebtoken'
import config from './config'

export interface JwtPayload {
  userId: string
  email: string
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwtSecret as jwt.Secret, {
    expiresIn: config.jwtExpiresIn
  } as jwt.SignOptions)
}

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.jwtSecret) as JwtPayload
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token')
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired')
    } else {
      throw new Error('Token verification failed')
    }
  }
}