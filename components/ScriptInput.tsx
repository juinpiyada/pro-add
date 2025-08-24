import React from 'react';
import MagicWandIcon from './icons/MagicWandIcon';

interface ScriptInputProps {
  script: string;
  setScript: (script: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ScriptInput: React.FC<ScriptInputProps> = ({ script, setScript, onGenerate, isLoading }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-6 shadow-2xl h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">1. Your Script</h2>
      <div className="flex-grow flex flex-col">
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste your video script here...

Example:
SCENE START
INT. COFFEE SHOP - DAY

Sunlight streams through the window. ANNA (20s) sips her latte, lost in thought. A vintage camera sits on the table in front of her.
          "
          className="w-full flex-grow bg-slate-950 border border-slate-700 rounded-md p-4 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition duration-200 resize-none"
          rows={15}
          disabled={isLoading}
        />
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-6 w-full group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-purple-500/50 disabled:scale-100 disabled:bg-slate-600 disabled:shadow-none disabled:cursor-not-allowed"
      >
        <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded-full bg-purple-500/40 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative flex items-center justify-center">
            {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
            </>
            ) : (
            <>
                <MagicWandIcon className="mr-2 h-5 w-5" />
                Generate Storyboard
            </>
            )}
        </span>
      </button>
    </div>
  );
};

export default ScriptInput;