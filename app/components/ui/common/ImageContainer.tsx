"use client";
import React from "react";
import Image from "next/image";

interface ImageContainerProps {
  src: string | undefined;
  alt: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ src, alt }) => {
  console.log("[SRC]:",src);
  return (
    <div className="mb-4 w-[336px] min-h-[223px] rounded-[20px]  relative">
      <Image
        className="rounded-xl"
        src={src ? src : ""}
        alt={alt}
        layout="fill" 
        objectFit="cover"
      />
    </div>
  );
};

export default ImageContainer;
