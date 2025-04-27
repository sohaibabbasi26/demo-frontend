"use client";

import React from "react";
import Image from "next/image";

interface CloseButtonProps {
  onClick: () => void;
  left?: string; 
  right?: string;
  top?: string; 
  bottom?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  left = "auto", 
  right = "auto",
  top = "auto",  
  bottom = "auto",
}) => {
  return (
    <div
      className="absolute z-20 border-2 border-black rounded-[30px] h-5 p-[4px] w-5 flex items-center justify-center"
      style={{
        left,
        right,
        top,
        bottom,
      }}
    >
      <button
        onClick={onClick}
        style={{
          background: "none",
          border: "none",
          padding: "0",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        <Image
          src="/svg/close-icon.svg"
          alt="Close"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

export default CloseButton;
