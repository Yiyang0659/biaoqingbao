import { CloudinaryService } from '../integrations/cloudinary'
import { ReplicateService } from '../integrations/replicate'
import ApiLog from '../models/ApiLog.model'

export interface ImageProcessingResult {
  originalUrl: string
  processedUrl: string
  processingTime: number
}

export class ImageService {
  private cloudinaryService: CloudinaryService
  private replicateService: ReplicateService

  constructor() {
    this.cloudinaryService = new CloudinaryService()
    this.replicateService = new ReplicateService()
  }

  async processImage(fileBuffer: Buffer, userId?: string): Promise<ImageProcessingResult> {
    const startTime = Date.now()

    try {
      // 1. Upload original image to Cloudinary
      const uploadResult = await this.cloudinaryService.uploadImage(fileBuffer)

      // 2. Convert to anime style using Replicate
      const processedUrl = await this.replicateService.convertToAnime(uploadResult.url)

      const processingTime = Date.now() - startTime

      // Log API call
      await ApiLog.create({
        user_id: userId,
        api_type: 'replicate',
        request_data: { imageUrl: uploadResult.url },
        response_data: { processedUrl },
        duration_ms: processingTime
      })

      return {
        originalUrl: uploadResult.url,
        processedUrl,
        processingTime
      }
    } catch (error: any) {
      const processingTime = Date.now() - startTime

      // Log failed API call
      await ApiLog.create({
        user_id: userId,
        api_type: 'replicate',
        request_data: { error: error.message },
        response_data: { success: false },
        duration_ms: processingTime
      })

      throw error
    }
  }
}