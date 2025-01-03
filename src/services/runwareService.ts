export interface GenerateImageParams {
  positivePrompt: string;
  model?: string;
  numberResults?: number;
  width?: number;
  height?: number;
}

export class RunwareService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(params: GenerateImageParams): Promise<{ imageURL: string }> {
    try {
      const response = await fetch('https://api.runware.ai/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            taskType: "authentication",
            apiKey: this.apiKey
          },
          {
            taskType: "imageInference",
            taskUUID: crypto.randomUUID(),
            positivePrompt: params.positivePrompt,
            width: params.width || 1024,
            height: params.height || 1024,
            model: params.model || "runware:100@1",
            numberResults: params.numberResults || 1
          }
        ])
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      const imageData = data.data.find((item: any) => item.taskType === "imageInference");
      
      if (!imageData || !imageData.imageURL) {
        throw new Error('No image URL in response');
      }

      return { imageURL: imageData.imageURL };
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
}