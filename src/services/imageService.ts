import { RunwareService, GenerateImageParams } from "@/services/runwareService";
import { supabase } from "@/integrations/supabase/client";

const runwareService = new RunwareService("W2K6F8XHKC9jkj8fbCTgPi5BiTogKxIZ");

const getStoredImage = async (imageKey: string): Promise<string | null> => {
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

  return null;
};

const storeImage = async (imageUrl: string, imageKey: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileName = `${imageKey}.webp`;

    const { data, error } = await supabase
      .storage
      .from('feature_images')
      .upload(fileName, blob, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) {
      console.error('Error storing image:', error);
      return imageUrl;
    }

    const { data: urlData } = supabase
      .storage
      .from('feature_images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error storing image:', error);
    return imageUrl;
  }
};

export const generateFeatureImage = async (prompt: string) => {
  const imageKey = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .slice(0, 50);

  try {
    // First, check if we already have this image stored
    const storedImageUrl = await getStoredImage(imageKey);
    if (storedImageUrl) {
      return storedImageUrl;
    }

    // If not, generate a new one and store it
    const params: GenerateImageParams = {
      positivePrompt: prompt,
      model: "runware:100@1",
      numberResults: 1,
      width: 1024,
      height: 1024,
    };

    const result = await runwareService.generateImage(params);
    const permanentUrl = await storeImage(result.imageURL, imageKey);
    return permanentUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};