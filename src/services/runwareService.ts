import { RunwareService, GenerateImageParams } from "@/utils/runware";

const API_KEY = "YOUR_API_KEY"; // This should be replaced with proper key management

export const generateAIAgentImage = async () => {
  const runware = new RunwareService(API_KEY);
  
  const params: GenerateImageParams = {
    positivePrompt: "Highly detailed female AI assistant, medical themed, futuristic headset with glowing blue elements, holographic medical icons floating beside her, clean white and silver color scheme, professional 3D render, ultra high quality, trending on artstation",
    model: "runware:100@1",
    numberResults: 1,
    outputFormat: "WEBP",
    CFGScale: 7,
    scheduler: "FlowMatchEulerDiscreteScheduler",
    strength: 0.8
  };

  try {
    const result = await runware.generateImage(params);
    return result.imageURL;
  } catch (error) {
    console.error("Error generating AI agent image:", error);
    // Fallback to the uploaded image if generation fails
    return "/lovable-uploads/4ad749ed-c18c-4674-bab0-68b98e32bca5.png";
  }
};