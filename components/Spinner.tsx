import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative h-20 w-20">
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-purple-500/20 border-l-purple-500/20 animate-spin"></div>
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-indigo-500 border-r-indigo-500/20 border-b-indigo-500/20 border-l-indigo-500 animate-spin [animation-direction:reverse] [animation-duration:1s]"></div>
      </div>
    </div>
  );
};

export default Spinner;