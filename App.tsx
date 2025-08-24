import React, { useState, useCallback, useEffect } from 'react';
import { generatePromptsFromScript, generateImageFromPrompt } from './services/geminiService';
import type { StoryboardImage } from './types';
import ScriptInput from './components/ScriptInput';
import ImageDisplay from './components/ImageDisplay';
import ClapperboardIcon from './components/icons/ClapperboardIcon';

const loadingMessages = [
  "Warming up the virtual cameras...",
  "Analyzing script for visual cues...",
  "Sketching out the key scenes...",
  "Generating photorealistic shots...",
  "Applying cinematic lighting...",
  "Action! Bringing your story to life...",
];

const App: React.FC = () => {
  const [script, setScript] = useState<string>('');
  const [storyboard, setStoryboard] = useState<StoryboardImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>(loadingMessages[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setLoadingMessage(prevMessage => {
          const currentIndex = loadingMessages.indexOf(prevMessage);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2500);
      return () => clearInterval(intervalId);
    }
  }, [isLoading]);


  const handleGenerate = useCallback(async () => {
    if (!script.trim()) {
      setError('Please provide a script to generate a storyboard.');
      return;
    }
    if (!process.env.API_KEY) {
      setError('API key is not configured. Please set the API_KEY environment variable.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStoryboard([]);
    setLoadingMessage(loadingMessages[0]);

    try {
      const prompts = await generatePromptsFromScript(script);

      if (prompts.length === 0) {
        setError('Could not identify any scenes in the script. Try making it more descriptive.');
        setIsLoading(false);
        return;
      }
      
      const generatedImages: StoryboardImage[] = [];
      for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i];
        const base64Image = await generateImageFromPrompt(prompt);
        const newImage: StoryboardImage = {
          prompt,
          imageUrl: `data:image/jpeg;base64,${base64Image}`,
        };
        generatedImages.push(newImage);
        setStoryboard([...generatedImages]);
      }

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate images. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [script]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-4">
            <ClapperboardIcon className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
              Script to Storyboard AI
            </h1>
          </div>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Instantly transform your screenplay into a vivid storyboard. Paste your script and let our AI director do the rest.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:pr-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <ScriptInput
              script={script}
              setScript={setScript}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:pl-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <ImageDisplay
              storyboard={storyboard}
              isLoading={isLoading}
              loadingMessage={loadingMessage}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;