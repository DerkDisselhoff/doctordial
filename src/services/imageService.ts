import { RunwareService, GenerateImageParams } from "@/services/runwareService";

const runwareService = new RunwareService(process.env.RUNWARE_API_KEY || '');

export const generateFeatureImage = async (prompt: string) => {
  try {
    const params: GenerateImageParams = {
      positivePrompt: prompt,
      model: "runware:100@1",
      numberResults: 1,
      width: 1024,
      height: 1024,
    };

    const result = await runwareService.generateImage(params);
    return result.imageURL;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};