import React from 'react';
import type { StoryboardImage } from '../types';
import Spinner from './Spinner';
import FilmIcon from './icons/FilmIcon';

interface ImageDisplayProps {
  storyboard: StoryboardImage[];
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ storyboard, isLoading, loadingMessage, error }) => {
  const renderContent = () => {
    if (isLoading && storyboard.length === 0) {
      return (
        <div className="text-center transition-all duration-500">
          <Spinner />
          <p className="mt-4 text-slate-300 text-lg font-medium animate-pulse">{loadingMessage}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      );
    }
    
    // Show generated images even while loading more
    if (storyboard.length > 0) {
      return (
        <div className="w-full">
            {isLoading && (
                <div className="text-center mb-6">
                    <div className="inline-flex items-center text-slate-300">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="font-medium animate-pulse">{loadingMessage}</p>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storyboard.map((image, index) => (
                <div 
                    key={index} 
                    className="bg-slate-900 rounded-lg overflow-hidden shadow-lg group relative animate-fade-in-up border border-slate-800"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <img 
                        src={image.imageUrl} 
                        alt={image.prompt} 
                        className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/70 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm text-slate-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {image.prompt}
                        </p>
                    </div>
                </div>
            ))}
            </div>
        </div>
      );
    }

    return (
      <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full p-8">
        <FilmIcon className="w-24 h-24 mb-4 opacity-50" />
        <h3 className="text-2xl font-semibold text-slate-400">Your Storyboard Awaits</h3>
        <p>Generated images will appear here once you provide a script.</p>
      </div>
    );
  };
  
  return (
    <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-2xl h-full min-h-[500px] flex flex-col">
       <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">2. Generated Storyboard</h2>
       <div className="flex-grow flex items-center justify-center p-2 border-2 border-dashed border-slate-700 rounded-md overflow-y-auto">
        {renderContent()}
       </div>
    </div>
  );
};

export default ImageDisplay;