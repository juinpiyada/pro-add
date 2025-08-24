
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function generatePromptsFromScript(script: string): Promise<string[]> {
  const model = 'gemini-2.5-flash';
  
  const systemInstruction = `You are a helpful assistant that processes video scripts to create image generation prompts. Analyze the following script and identify the key visual scenes. For each scene, create a concise, descriptive prompt suitable for an AI image generator. The output must be a JSON array of strings. Do not include any other text or explanation. Each prompt should be a single string in the array. Focus on visual details like characters, setting, actions, and mood. Generate a maximum of 8 prompts.`;
  
  const contents = `
    Here is the script:
    ---
    ${script}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: 'A concise, descriptive prompt for an AI image generator based on a scene from the script.'
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const prompts = JSON.parse(jsonText);
    if (!Array.isArray(prompts) || !prompts.every(p => typeof p === 'string')) {
      throw new Error('Invalid response format. Expected a JSON array of strings.');
    }
    return prompts;
  } catch (error) {
    console.error('Error generating prompts from script:', error);
    throw new Error('Failed to analyze the script. The AI model might be unavailable or the script format is unsupported.');
  }
}


export async function generateImageFromPrompt(prompt: string): Promise<string> {
  const model = 'imagen-3.0-generate-002';

  try {
    const response = await ai.models.generateImages({
      model,
      prompt: `${prompt}, cinematic, high detail, film still`, // Enhance prompt for better quality
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    } else {
      throw new Error('No image was generated for the prompt.');
    }
  } catch (error) {
    console.error(`Error generating image for prompt "${prompt}":`, error);
    throw new Error(`Failed to generate an image for the prompt: "${prompt}". The model might have content policy restrictions.`);
  }
}
