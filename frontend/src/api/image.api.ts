// API 调用层：图片处理相关
// 负责与后端 /api/images 端点通信

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export interface ImageProcessResult {
  originalUrl: string
  processedUrl: string
  processingTime: number
}

export const imageApi = {
  async uploadAndProcess(file: File, token: string): Promise<ImageProcessResult> {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`${API_BASE}/api/images/process`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }
}
