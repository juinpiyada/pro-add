import React from 'react';

const ClapperboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M20.2 6 3.8 6.8A2 2 0 0 0 2 8.7V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-1.8-2Z"/>
    <path d="m2 6 13 2.5"/>
    <path d="m14 8.5 2-2.5"/>
    <path d="m6 13 2-2"/>
    <path d="m10 11 2-2"/>
    <path d="m14 9 2-2"/>
    <path d="m18 7 2-2"/>
  </svg>
);

export default ClapperboardIcon;