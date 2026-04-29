import Replicate from 'replicate'
import config from '../config/config'

export interface ReplicateAnimeResult {
  output: string[]
  status: string
  metrics: {
    predict_time: number
  }
}

export class ReplicateService {
  private replicate: Replicate

  constructor() {
    if (!config.replicateApiToken) {
      throw new Error('Replicate API token is missing. Please set REPLICATE_API_TOKEN environment variable.')
    }

    this.replicate = new Replicate({
      auth: config.replicateApiToken
    })
  }

  async convertToAnime(imageUrl: string): Promise<string> {
    try {
      const output = await this.replicate.run(
        'cjwbw/anything-v4.0:42a996d39a96aedc57b2e0aa8105dea39c9c89d9d266caf6bb4327a1c191b061',
        {
          input: {
            image: imageUrl,
            prompt: 'anime style, detailed face, high quality',
            negative_prompt: 'low quality, blurry, distorted',
            num_outputs: 1,
            guidance_scale: 7.5,
            num_inference_steps: 50
          }
        }
      ) as string[]

      if (!output || output.length === 0) {
        throw new Error('Replicate returned no output')
      }

      return output[0]
    } catch (error: any) {
      throw new Error(`Replicate API error: ${error.message}`)
    }
  }
}
