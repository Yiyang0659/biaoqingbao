// backend/src/app.ts
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import config from './config/config'
import errorMiddleware from './middleware/error.middleware'
import authRoutes from './routes/auth.routes'
import imageRoutes from './routes/image.routes'

const app = express()

// Middleware
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/images', imageRoutes)

// Error handling middleware
app.use(errorMiddleware)

export default app