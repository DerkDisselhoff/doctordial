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

// Initialize the RunwareService with the API key
const runwareService = new RunwareService("W2K6F8XHKC9jkj8fbCTgPi5BiTogKxIZ");

export const generateAIAgentImage = async (): Promise<string> => {
  const imageKey = 'ai-agent-hero';
  const supabase = (await import('@/integrations/supabase/client')).supabase;

  try {
    // Check if we already have the hero image stored
    const { data } = await supabase
      .storage
      .from('feature_images')
      .list('', {
        search: imageKey
      });

    if (data && data.length > 0) {
      const { data: urlData } = supabase
        .storage
        .from('feature_images')
        .getPublicUrl(data[0].name);
      return urlData.publicUrl;
    }

    // If not, generate and store a new one
    const result = await runwareService.generateImage({
      positivePrompt: "Professional medical AI assistant, holographic interface, high-tech medical environment, clean and modern design, dark theme with mint accents, consistent style",
      width: 1024,
      height: 1024,
    });

    // Store the new image
    const response = await fetch(result.imageURL);
    const blob = await response.blob();
    const fileName = `${imageKey}.webp`;

    const { error: uploadError } = await supabase
      .storage
      .from('feature_images')
      .upload(fileName, blob, {
        contentType: 'image/webp',
        upsert: true
      });

    if (uploadError) {
      console.error('Error storing image:', uploadError);
      return result.imageURL;
    }

    const { data: urlData } = supabase
      .storage
      .from('feature_images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error generating AI agent image:', error);
    // Return the fallback image if generation fails
    return "/lovable-uploads/62d4662e-ae36-4ab0-89a6-4d95c0a5f245.png";
  }
};