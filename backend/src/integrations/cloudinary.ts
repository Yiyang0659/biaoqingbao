import { v2 as cloudinary } from 'cloudinary'
import config from '../config/config'

export interface UploadResult {
  url: string
  public_id: string
  format: string
  bytes: number
  width: number
  height: number
}

export class CloudinaryService {
  constructor() {
    if (!config.cloudinaryUrl) {
      throw new Error('Cloudinary configuration is missing. Please set CLOUDINARY_URL environment variable.')
    }

    // 配置Cloudinary
    cloudinary.config(config.cloudinaryUrl)
  }

  async uploadImage(fileBuffer: Buffer, folder: string = 'memes'): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message}`))
          } else if (result) {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              format: result.format,
              bytes: result.bytes,
              width: result.width,
              height: result.height
            })
          } else {
            reject(new Error('Cloudinary upload returned no result'))
          }
        }
      )

      uploadStream.end(fileBuffer)
    })
  }

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary delete failed: ${error.message}`))
        } else if (result?.result === 'ok') {
          resolve()
        } else {
          reject(new Error('Cloudinary delete failed'))
        }
      })
    })
  }
}
