import { Router } from 'express'
import authController from '../controllers/auth.controller'
import authenticate from '../middleware/auth.middleware'

const router = Router()

/**
 * @route   POST /api/auth/register
 * @desc    用户注册
 * @access  Public
 */
router.post('/register', authController.register)

/**
 * @route   POST /api/auth/login
 * @desc    用户登录
 * @access  Public
 */
router.post('/login', authController.login)

/**
 * @route   GET /api/auth/me
 * @desc    获取当前用户信息
 * @access  Private (需要认证)
 */
router.get('/me', authenticate, authController.getCurrentUser)

export default router