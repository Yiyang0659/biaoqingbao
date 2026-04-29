import { Request, Response, NextFunction } from 'express'
import config from '../config/config'

// Error handling middleware
const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err.message)
  console.error('Stack:', err.stack)

  // Determine status code: check if error has status property, otherwise default to 500
  const statusCode = (err as any).statusCode || (err as any).status || 500

  res.status(statusCode).json({
    success: false,
    error: config.nodeEnv === 'production'
      ? 'Internal server error'
      : err.message,
    stack: config.nodeEnv === 'development' ? err.stack : undefined
  })
}

export default errorMiddleware