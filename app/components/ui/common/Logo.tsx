import Image from 'next/image';
import React from 'react';

interface LogoProps {
  width?:number;
  height?:number;
}

const Logo: React.FC<LogoProps> = ({width, height}) => {
  return (
    <div className="text-white text-3xl font-bold flex items-center">
      <Image
        aria-hidden
        src="/svg/logo.svg"
        alt="Logo"
        width={width || 300} 
        height={height || 300} 
      />
    </div>
  );
};

export default Logo;
