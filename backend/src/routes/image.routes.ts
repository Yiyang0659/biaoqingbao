import { Router } from 'express'
import multer from 'multer'
import { uploadImage } from '../controllers/image.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

// 配置multer内存存储
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB限制
    files: 1 // 单文件
  },
  fileFilter: (_req, file, cb) => {
    // 允许的MIME类型
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'))
    }
  }
})

// 图片上传路由（需要认证）
router.post('/upload', authenticate, upload.single('image'), uploadImage)

export default router