import { Request, Response } from 'express'
import { ImageService } from '../services/image.service'

const imageService = new ImageService()

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No image file provided'
      })
      return
    }

    const userId = req.user?.userId
    const result = await imageService.processImage(req.file.buffer, userId)

    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}